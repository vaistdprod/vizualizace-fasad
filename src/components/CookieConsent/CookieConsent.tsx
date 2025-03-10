'use client'

import { CookieBanner } from '@/components/CookieBanner'
import { PreferencesButton } from './PreferencesButton'

export function CookieConsent() {
  return (
    <>
      <CookieBanner />
      <PreferencesButton />
    </>
  )
}
