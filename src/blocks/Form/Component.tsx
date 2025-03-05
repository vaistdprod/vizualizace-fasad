'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { MagicCard } from '@/components/ui/magic-card'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: SerializedEditorState
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
  } = props

  // Using unknown as an intermediate step to avoid type errors
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
    (data: Record<string, unknown>) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/custom-form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)
            setError({
              message: res.error?.message || 'Interní chyba serveru',
              status: res.status?.toString(),
            })
            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect
            if (url) router.push(url)
          }
        } catch (_err) {
          setIsLoading(false)
          setError({
            message: 'Něco se pokazilo. Zkuste to prosím později.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    <div className="container lg:max-w-[48rem]">
      {enableIntro && introContent && !hasSubmitted && (
        <RichText className="mb-8 lg:mb-12" data={introContent} enableGutter={false} />
      )}
      <MagicCard
        className="p-4 lg:p-6 bg-card rounded-[0.8rem] overflow-hidden shadow-xs"
        gradientColor="hsl(var(--muted))"
        gradientFrom="hsl(var(--primary))"
        gradientTo="hsl(var(--secondary))"
        gradientOpacity={0.5}
      >
        <FormProvider {...formMethods}>
          {!isLoading && hasSubmitted && confirmationType === 'message' && (
            <RichText data={confirmationMessage} />
          )}
          {isLoading && !hasSubmitted && <p>Načítání, prosím čekejte...</p>}
          {error && (
            <p className="text-sm text-destructive">{`${error.status || '500'}: ${error.message || ''}`}</p>
          )}
          {!hasSubmitted && (
            <form id={formID} onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="space-y-4 mb-4 last:mb-0">
                {formFromProps &&
                  formFromProps.fields &&
                  formFromProps.fields.map((field: FormFieldBlock, index) => {
                    // Using type assertion here because each field component has its own specific type
                    // that extends FormFieldBlock with additional properties
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
                        <div className="mb-6 last:mb-0 w-full" key={index}>
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
              </div>

              <Button
                form={formID}
                type="submit"
                variant="default"
                disabled={isLoading}
                className="w-full"
              >
                {submitButtonLabel || 'Odeslat'}
              </Button>
            </form>
          )}
        </FormProvider>
      </MagicCard>
    </div>
  )
}
