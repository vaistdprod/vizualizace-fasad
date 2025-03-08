// This script compiles and runs the fix-homepage-slug.ts script
import { exec } from 'child_process'

// First compile the TypeScript file
console.log('Compiling fix-homepage-slug.ts...')
exec(
  'npx tsc src/scripts/fix-homepage-slug.ts --esModuleInterop --resolveJsonModule --outDir dist/scripts',
  (error, stdout, stderr) => {
    if (error) {
      console.error(`Error compiling script: ${error.message}`)
      return
    }

    if (stderr) {
      console.error(`Compilation stderr: ${stderr}`)
    }

    console.log('Compilation successful. Running fix script...')

    // Then run the compiled JavaScript file
    exec('node dist/scripts/fix-homepage-slug.js', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error running script: ${error.message}`)
        return
      }

      console.log(stdout)

      if (stderr) {
        console.error(`Script stderr: ${stderr}`)
      }

      console.log('Homepage fix script completed.')
    })
  },
)
