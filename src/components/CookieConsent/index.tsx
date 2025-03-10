'use client'

import { CookieBanner } from './CookieBanner'
import { PreferencesButton } from './PreferencesButton'

export function CookieConsent() {
  return (
    <>
      <CookieBanner />
      <PreferencesButton />
    </>
  )
}
