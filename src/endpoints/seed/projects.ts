// src/endpoints/seed/projects.ts
import type { RequiredDataFromCollectionSlug, File, Payload } from 'payload'
import { readdir, readFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { fetchFileByPath } from './index'
import vm from 'vm'

type ProjectConfig = {
  title: string
  description: string
  images: Array<{ filename: string; title: string }>
}

type ProjectSeedData = {
  title: string
  slug: string
  description: string
  images: Array<{ title: string; image: File }>
  featuredImage: File
  featured: boolean
  publishedAt: string
  _status: 'published' | 'draft'
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const seedProjects = async (payload: Payload): Promise<void> => {
  payload.logger.info('— Seeding projects...')

  const projectsDir = path.resolve(__dirname)
  const projectFolders = (await readdir(projectsDir, { withFileTypes: true }))
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

  const projectData: (ProjectSeedData | null)[] = await Promise.all(
    projectFolders.map(async (folderName) => {
      const projectPath = path.join(projectsDir, folderName)
      const configPath = path.join(projectPath, 'project-config.ts')

      let title: string
      let description: string
      let imageConfigs: Array<{ filename: string; title: string }> = []

      // Load project config
      try {
        const configContent = await readFile(configPath, 'utf-8')
        payload.logger.info(`Read config file for ${folderName} at ${configPath}`)

        const cleanedContent = configContent
          .replace(/export\s+const\s+projectConfig\s*=\s*/, '')
          .replace(/;\s*$/, '')
          .trim()

        const sandbox: { projectConfig?: ProjectConfig } = {}
        const script = new vm.Script(`projectConfig = ${cleanedContent}`)
        const context = vm.createContext(sandbox)
        script.runInContext(context)

        const config: ProjectConfig =
          sandbox.projectConfig ??
          (() => {
            throw new Error('projectConfig is undefined')
          })()
        if (!config.title || !config.description || !config.images) {
          throw new Error('Invalid config format—missing required fields')
        }

        title = config.title
        description = config.description
        imageConfigs = config.images
        payload.logger.info(`Loaded config for ${folderName}: ${title}`)
      } catch (err) {
        payload.logger.error(
          `Failed to load or parse project-config.ts for ${folderName} at ${configPath}: ${err}`,
        )
        return null // Skip projects without a valid config
      }

      // Fetch images in the order specified by projectConfig.images
      const imageFiles = await Promise.all(
        imageConfigs.map(async ({ filename, title }) => {
          const relativePath = path.join(folderName, filename)
          try {
            const file = await fetchFileByPath(relativePath)
            payload.logger.info(`Loaded ${relativePath}, size: ${file.size} bytes`)
            return { fileName: filename, file, title }
          } catch (err) {
            payload.logger.error(`Failed to load image ${relativePath}: ${err}`)
            return null
          }
        }),
      )

      // Filter out any failed image loads
      const validImageFiles = imageFiles.filter(
        (item): item is { fileName: string; file: File; title: string } => item !== null,
      )

      if (validImageFiles.length === 0) {
        payload.logger.warn(`No valid images loaded for project ${folderName}, skipping...`)
        return null
      }

      const images: Array<{ title: string; image: File }> = validImageFiles.map(
        ({ title, file }) => ({
          title,
          image: file,
        }),
      )

      const nonEmptyImages = images as [
        { title: string; image: File },
        ...Array<{ title: string; image: File }>,
      ]

      const finalImage = nonEmptyImages.find((img) => img.title.includes('Finální realizace'))
      const featuredImage = finalImage ? finalImage.image : nonEmptyImages[0].image

      return {
        title,
        slug: folderName.toLowerCase(),
        description,
        images,
        featuredImage,
        featured: false,
        publishedAt: new Date().toISOString(),
        _status: 'published' as const,
      }
    }),
  )

  const validProjectData = projectData.filter((data): data is ProjectSeedData => data !== null)
  validProjectData.slice(0, Math.min(6, validProjectData.length)).forEach((project) => {
    project.featured = true
  })

  payload.logger.info(`Total projects to seed: ${validProjectData.length}`)

  for (const project of validProjectData) {
    payload.logger.info(`Creating project: ${project.title}`)

    const maxRetries = 3
    let attempt = 0
    let success = false

    while (attempt < maxRetries && !success) {
      try {
        const projectDataForPayload: RequiredDataFromCollectionSlug<'projects'> = {
          title: project.title,
          slug: project.slug,
          description: project.description,
          images: project.images.map((img) => ({
            title: img.title,
            image: 0 as number, // Initialize as 0, will be media ID (number)
            caption: null,
            id: null,
          })),
          featuredImage: null as number | null, // Initialize as null, will be media ID (number)
          featured: project.featured,
          publishedAt: project.publishedAt,
          _status: project._status,
        }

        const uploadedImages = await Promise.all(
          project.images.map(async (img, index) => {
            const uniqueFilename = `${project.slug}-${index}-${img.image.name}`
            const mediaDoc = await payload.create({
              collection: 'media',
              data: { alt: img.title },
              file: {
                ...img.image,
                name: uniqueFilename,
              },
            })
            payload.logger.info(
              `Uploaded image for ${project.title}: ${img.title}, ID: ${mediaDoc.id}, Filename: ${uniqueFilename}`,
            )
            return { title: img.title, image: mediaDoc.id as number, caption: null, id: null }
          }),
        )
        projectDataForPayload.images = uploadedImages

        let featuredImageFile: File | null = null
        if (uploadedImages.length > 0) {
          const nonEmptyImages = uploadedImages as [
            (typeof uploadedImages)[number],
            ...(typeof uploadedImages)[number][],
          ]
          const finalImage = nonEmptyImages.find((img) => img.title.includes('Finální realizace'))
          const featuredImageData = finalImage || nonEmptyImages[0]
          projectDataForPayload.featuredImage = featuredImageData.image
          featuredImageFile =
            project.images.find((img) => img.title === featuredImageData.title)?.image ?? null
          payload.logger.info(
            `Set featured image for ${project.title}, ID: ${projectDataForPayload.featuredImage}`,
          )
        } else {
          throw new Error(`No images uploaded for ${project.title} - cannot set featuredImage`)
        }

        payload.logger.info(
          `Project data for ${project.title}: ${JSON.stringify(projectDataForPayload, null, 2)}`,
        )

        await payload.create({
          collection: 'projects',
          data: projectDataForPayload,
          file: featuredImageFile
            ? {
                ...featuredImageFile,
                name: `${project.slug}-featured-${featuredImageFile.name}`,
              }
            : undefined,
        })

        payload.logger.info(`Successfully seeded project: ${project.title}`)
        success = true
      } catch (err) {
        attempt++
        if (attempt === maxRetries) {
          payload.logger.error(
            `Failed to seed project ${project.title} after ${maxRetries} attempts: ${err}`,
          )
          throw err
        }
        payload.logger.warn(`Attempt ${attempt} failed for ${project.title}, retrying...`)
        await new Promise((resolve) => setTimeout(resolve, 1000)) // 1s delay between retries
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 1000)) // 1s delay between projects
  }

  payload.logger.info('Projects seeded successfully!')
}
