// src/blocks/Form/Component.tsx
'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { fadeInUp, defaultViewport } from '@/utilities/animations'
import { fields } from './fields'
import { File } from './File' // Import File directly
import { getClientSideURL } from '@/utilities/getURL'
import { MagicCard } from '@/components/ui/magic-card'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean | null
  form: FormType
  introContent?: SerializedEditorState
}

export const FormBlock: React.FC<{ id?: string } & FormBlockType> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
    id,
  } = props

  if (!formID) {
    throw new Error('Form ID is missing')
  }

  const formMethods = useForm({
    defaultValues: formFromProps.fields as unknown as Record<string, unknown>,
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    async (data: Record<string, unknown>) => {
      setIsLoading(true)
      setError(undefined)

      const formData = new FormData()
      formData.append('form', formID)

      Object.entries(data).forEach(([name, value]) => {
        if (value instanceof FileList) {
          Array.from(value).forEach((file) => formData.append('attachment', file))
        } else if (value !== undefined && value !== null) {
          formData.append(name, String(value))
        }
      })

      let response // Declare response here so it’s in scope for catch
      try {
        response = await fetch(`${getClientSideURL()}/api/custom-form-submissions`, {
          method: 'POST',
          body: formData,
        })

        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.error || 'Submission failed')
        }

        setIsLoading(false)
        setHasSubmitted(true)

        if (confirmationType === 'redirect' && redirect?.url) {
          router.push(redirect.url)
        }
      } catch (err) {
        setIsLoading(false)
        setError({
          message: err instanceof Error ? err.message : 'Something went wrong',
          status: response?.status?.toString() || '500', // Now response is accessible
        })
      }
    },
    [formID, confirmationType, redirect, router],
  )

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={fadeInUp}
      className="mx-auto max-w-3xl px-4 md:px-6"
      id={`block-${id}`}
    >
      <MagicCard className="h-full" id="kontaktni-formular">
        <div className="rounded-xl bg-card/30 p-8">
          {enableIntro && introContent && !hasSubmitted && (
            <RichText className="mb-6" data={introContent} enableGutter={false} />
          )}
          <FormProvider {...formMethods}>
            {!isLoading && hasSubmitted && confirmationType === 'message' && (
              <RichText data={confirmationMessage} className="space-y-4" />
            )}
            {isLoading && !hasSubmitted && (
              <p className="text-center text-muted-foreground">Načítání, prosím čekejte...</p>
            )}
            {error && (
              <p className="text-sm text-destructive text-center mb-4">
                {`${error.status || '500'}: ${error.message || ''}`}
              </p>
            )}
            {!hasSubmitted && (
              <form id={formID} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {formFromProps &&
                  formFromProps.fields &&
                  formFromProps.fields.map((field: FormFieldBlock, index) => {
                    const Field = fields[field.blockType as keyof typeof fields] as React.FC<
                      FormFieldBlock & {
                        form: FormType
                        control: typeof control
                        errors: typeof errors
                        register: typeof register
                        [key: string]: unknown
                      }
                    >
                    if (Field) {
                      return (
                        <div key={index}>
                          <Field
                            form={formFromProps}
                            {...field}
                            control={control}
                            errors={errors}
                            register={register}
                          />
                        </div>
                      )
                    }
                    return null
                  })}
                <File
                  blockType="file" // We'll fix this in File/index.tsx
                  name="attachment"
                  label="Přiložit fotografie domu (max. 5 souborů, 5 MB na soubor)"
                  register={register}
                  errors={errors}
                  required={false}
                />
                <Button
                  form={formID}
                  type="submit"
                  variant="default"
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {submitButtonLabel || 'Odeslat zprávu'}
                </Button>
              </form>
            )}
          </FormProvider>
        </div>
      </MagicCard>
    </motion.div>
  )
}
