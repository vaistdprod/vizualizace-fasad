'use client'

import React, { Fragment, useCallback, useState } from 'react'
import { toast } from '@payloadcms/ui'

import './index.scss'

const SuccessMessage: React.FC = () => (
  <div>
    Databáze naplněna! Nyní můžete{' '}
    <a target="_blank" href="/">
      navštívit váš web
    </a>
  </div>
)

export const SeedButton: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [seeded, setSeeded] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      if (seeded) {
        toast.info('Databáze již byla naplněna.')
        return
      }
      if (loading) {
        toast.info('Plnění databáze již probíhá.')
        return
      }
      if (error) {
        toast.error(`Došlo k chybě, obnovte stránku a zkuste to znovu.`)
        return
      }

      setLoading(true)

      try {
        toast.promise(
          new Promise((resolve, reject) => {
            fetch('/next/seed', { method: 'POST', credentials: 'include' })
              .then((res) => {
                if (res.ok) {
                  resolve(true)
                  setSeeded(true)
                } else {
                  reject(new Error('Při plnění databáze došlo k chybě.'))
                }
              })
              .catch((error) => {
                reject(error)
              })
          }),
          {
            loading: 'Plním databázi daty...',
            success: <SuccessMessage />,
            error: 'Při plnění databáze došlo k chybě.',
          },
        )
      } catch (err) {
        const error = err instanceof Error ? err.message : String(err)
        setError(error)
      }
    },
    [loading, seeded, error],
  )

  let message = ''
  if (loading) message = ' (plním...)'
  if (seeded) message = ' (hotovo!)'
  if (error) message = ` (chyba: ${error})`

  return (
    <Fragment>
      <button className="seedButton" onClick={handleClick}>
        Naplnit databázi
      </button>
      {message}
    </Fragment>
  )
}
