'use client'

import { Cookie } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCookieConsent } from '@/hooks/useCookieConsent'

export function PreferencesButton() {
  const { setOpen } = useCookieConsent()

  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed bottom-4 left-4 h-11 w-11 rounded-full"
      onClick={() => setOpen(true)}
      aria-label="Spravovat nastavení cookies"
    >
      <Cookie className="h-5 w-5" />
    </Button>
  )
}
