import type { FormFieldBlock } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import React, { useRef, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Error } from '../Error'
import { Width } from '../Width'
import { Upload } from 'lucide-react'

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
  maxSize = 5 * 1024 * 1024, // 5 MB
  maxFiles = 5,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileCount, setFileCount] = useState(0)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileCount(e.target.files.length)
    } else {
      setFileCount(0) // Reset if no files are selected
    }
  }

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
      <div
        className="relative flex items-center justify-center h-24 w-full rounded-md border border-dashed border-primary/50 bg-background hover:border-primary transition-[border] cursor-pointer group"
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
          <Upload className="h-6 w-6" />
          <span className="text-sm font-medium">
            {fileCount > 0
              ? `${fileCount} ${fileCount === 1 ? 'soubor vybrán' : fileCount < 5 ? 'soubory vybrány' : 'souborů vybráno'}`
              : 'Klikněte pro nahrání souborů'}
          </span>
        </div>
        <Input
          id={name}
          type="file"
          className="hidden"
          {...register('attachment', {
            // Note: The 'required' prop is intentionally ignored for validation to make the file field always optional,
            // even if marked as required in the CMS. This is a deliberate design choice to allow form submission without a file.
            validate: {
              size: (files: FileList) =>
                !files || // Allow no files
                files.length === 0 || // Allow empty file list
                Array.from(files).every((file) => file.size <= maxSize) ||
                `${label}: Každý soubor musí mít méně než ${maxSize / (1024 * 1024)} MB`,
              count: (files: FileList) =>
                !files || // Allow no files
                files.length === 0 || // Allow empty file list
                files.length <= maxFiles ||
                `${label}: Povoleno maximálně ${maxFiles} souborů`,
            },
          })}
          accept={accept}
          multiple={multiple}
          onChange={(e) => {
            handleFileChange(e) // Update file count
            register('attachment').onChange(e) // Ensure react-hook-form tracks changes
          }}
          ref={(e) => {
            const { ref } = register('attachment')
            ref(e) // Connect react-hook-form ref
            fileInputRef.current = e // Connect our own ref
          }}
        />
      </div>
      {errors[name]?.message && <Error message={errors[name]?.message as string} />}
    </Width>
  )
}
