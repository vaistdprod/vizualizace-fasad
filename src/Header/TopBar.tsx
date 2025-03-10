'use client'

import { Mail, Phone } from 'lucide-react'

interface TopBarProps {
  phone: string
  email: string
}

export function TopBar({ phone, email }: TopBarProps) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-2">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-sm">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Phone className="h-4 w-4" />
            <span>{phone}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Mail className="h-4 w-4" />
            <span>{email}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
