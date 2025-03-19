import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { Error } from '../Error'
import { Width } from '../Width'

export const Number: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
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
        defaultValue={defaultValue}
        id={name}
        type="tel" // Changed from "number" to "tel"
        {...register(name, {
          required: required ? `${label} je povinné` : false,
          pattern: {
            value: /^\+?\d{9,}$/, // Basic phone number validation (optional + and at least 9 digits)
            message: `Zadejte platné telefonní číslo (např. 123 456 789)`,
          },
        })}
      />
      {errors[name] && <Error />}
    </Width>
  )
}
