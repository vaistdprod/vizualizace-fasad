'use client'

import { Mail, Phone } from 'lucide-react'

interface TopBarProps {
  phone: string
  email: string
}

export function TopBar({ phone, email }: TopBarProps) {
  return (
    <div className="bg-[hsl(var(--topbar-bg))] py-2.5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-sm">
          <a
            href={`tel:${phone}`}
            className="flex items-center gap-2.5 text-[hsl(var(--topbar-text))] hover:text-[hsl(var(--topbar-hover))] transition-colors"
          >
            <Phone className="h-4 w-4 flex-shrink-0" />
            <span className="leading-none">{phone}</span>
          </a>
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-2.5 text-[hsl(var(--topbar-text))] hover:text-[hsl(var(--topbar-hover))] transition-colors"
          >
            <Mail className="h-4 w-4 flex-shrink-0" />
            <span className="leading-none">{email}</span>
          </a>
        </div>
      </div>
    </div>
  )
}
