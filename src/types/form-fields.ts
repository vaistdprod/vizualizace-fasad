// src/types/form-fields.ts
import type { FormFieldBlock as BaseFormFieldBlock } from '@payloadcms/plugin-form-builder/types'

export interface FileFieldBlock {
  blockType: 'file'
  name: string
  label?: string
  required?: boolean
  width?: string
  id?: string
  blockName?: string
}

export type CustomFormFieldBlock = BaseFormFieldBlock | FileFieldBlock

declare module '@payloadcms/plugin-form-builder/types' {
  export interface FormFields {
    fields: CustomFormFieldBlock[]
  }
}
