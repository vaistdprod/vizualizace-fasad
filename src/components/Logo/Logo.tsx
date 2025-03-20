import clsx from 'clsx'
import React from 'react'
import './index.scss' // Add this

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    <img
      alt="TDProd Logo"
      width={907}
      height={688}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[9.375rem] w-full h-auto logo', className)}
      src="https://www.tdprod.cz/assets/imgs/logo-dark.svg"
    />
  )
}
