import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CookieConsent {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  preferences: boolean
  timestamp: number
}

interface CookieConsentStore {
  consent: CookieConsent | null
  isOpen: boolean
  setConsent: (consent: CookieConsent) => void
  setOpen: (open: boolean) => void
  resetConsent: () => void
}

const CONSENT_EXPIRY_DAYS = 90

export const useCookieConsent = create<CookieConsentStore>()(
  persist(
    (set) => ({
      consent: null,
      isOpen: false,
      setConsent: (consent) => set({ consent, isOpen: false }),
      setOpen: (open) => set({ isOpen: open }),
      resetConsent: () => set({ consent: null, isOpen: true }),
    }),
    {
      name: 'cookie-consent',
      partialize: (state) => ({ consent: state.consent }),
      onRehydrateStorage: () => (state) => {
        // Check if consent has expired
        if (state?.consent) {
          const expiryTime = state.consent.timestamp + CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000
          if (Date.now() > expiryTime) {
            state.resetConsent()
          }
        }
      },
    },
  ),
)
