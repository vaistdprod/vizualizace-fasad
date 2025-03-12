import * as React from 'react'

interface ErrorProps {
  message?: string // Optional message prop
}

export const Error: React.FC<ErrorProps> = ({ message }) => {
  return message ? (
    <div className="mt-2 text-red-500 text-sm">{message}</div>
  ) : (
    <div className="mt-2 text-red-500 text-sm">Toto pole je povinné</div> // Fallback if no message
  )
}
