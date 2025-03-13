// src/blocks/Form/File/index.tsx
import type { FormFieldBlock } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Error } from '../Error'
import { Width } from '../Width'

// Adjusted props type: Remove blockType from FormFieldBlock intersection and add it optionally
type FileField = Omit<FormFieldBlock, 'blockType'> & {
  name: string
  label: string
  required?: boolean
  width?: string
  blockType?: 'file' // Optional, specific to our custom field
}

export const File: React.FC<
  FileField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
    accept?: string
    multiple?: boolean
    maxSize?: number
    maxFiles?: number
  }
> = ({
  name,
  label,
  required,
  errors,
  register,
  width,
  accept = 'image/png,image/heic,image/jpeg,image/webp',
  multiple = true,
  maxSize = 5 * 1024 * 1024,
  maxFiles = 5,
}) => {
  return (
    <Width width={width}>
      <Label htmlFor={name}>
        {label}
        {required && (
          <span className="required">
            * <span className="sr-only">(povinné)</span>
          </span>
        )}
      </Label>
      <Input
        id={name}
        type="file"
        {...register(name, {
          required,
          validate: {
            size: (files: FileList | undefined) =>
              !files ||
              files.length === 0 ||
              Array.from(files).every((file) => file.size <= maxSize) ||
              `Každý soubor nesmí překročit ${maxSize / (1024 * 1024)} MB`,
            count: (files: FileList | undefined) =>
              !files || files.length <= maxFiles || `Maximálně ${maxFiles} souborů povoleno`,
          },
        })}
        accept={accept}
        multiple={multiple}
      />
      {errors[name]?.message && <Error message={errors[name]?.message as string} />}
    </Width>
  )
}
