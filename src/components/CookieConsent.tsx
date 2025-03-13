// src/components/CookieConsent.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import Cookies from 'js-cookie'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { initGTM, updateGTMConsent } from '@/lib/gtm'

const COOKIE_CONSENT_KEY = 'cookie-consent'

interface CookieConsent {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  preferences: boolean
}

const defaultConsent: CookieConsent = {
  necessary: true, // Always required
  analytics: false,
  marketing: false,
  preferences: false,
}

export function CookieConsent() {
  const [open, setOpen] = useState(false)
  const [consent, setConsent] = useState<CookieConsent>(defaultConsent)
  const isGTMLoaded = useRef(false) // Track if GTM script has loaded

  useEffect(() => {
    const savedConsent = Cookies.get(COOKIE_CONSENT_KEY)
    if (!savedConsent) {
      setOpen(true)
    } else {
      const parsedConsent = JSON.parse(savedConsent)
      setConsent(parsedConsent)
      if (parsedConsent.analytics) {
        initGTM({
          analytics_storage: 'granted',
          ad_storage: parsedConsent.marketing ? 'granted' : 'denied',
          ad_user_data: parsedConsent.marketing ? 'granted' : 'denied',
          ad_personalization: parsedConsent.marketing ? 'granted' : 'denied',
        })
        isGTMLoaded.current = true // Mark GTM as loaded after initialization
      }
    }
  }, [])

  const handleSave = (preferences: CookieConsent) => {
    Cookies.set(COOKIE_CONSENT_KEY, JSON.stringify(preferences), { expires: 365 })
    setConsent(preferences)
    setOpen(false)

    // Only update GTM consent if analytics is enabled and GTM has loaded
    if (preferences.analytics && isGTMLoaded.current) {
      updateGTMConsent({
        analytics_storage: preferences.analytics ? 'granted' : 'denied',
        ad_storage: preferences.marketing ? 'granted' : 'denied',
        ad_user_data: preferences.marketing ? 'granted' : 'denied',
        ad_personalization: preferences.marketing ? 'granted' : 'denied',
      })
    }

    if (preferences.analytics) {
      initGTM({
        analytics_storage: 'granted',
        ad_storage: preferences.marketing ? 'granted' : 'denied',
        ad_user_data: preferences.marketing ? 'granted' : 'denied',
        ad_personalization: preferences.marketing ? 'granted' : 'denied',
      })
      isGTMLoaded.current = true // Update loaded state
    } else {
      isGTMLoaded.current = false // Reset if analytics is turned off
    }
  }

  const handleAcceptAll = () => {
    const allConsent = {
      ...defaultConsent,
      analytics: true,
      marketing: true,
      preferences: true,
    }
    handleSave(allConsent)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nastavení cookies</DialogTitle>
          <DialogDescription>
            Používáme cookies pro zlepšení vašeho prohlížení a analýzu návštěvnosti. Prosím, vyberte
            své preference níže.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Nezbytné cookies</h4>
              <p className="text-sm text-muted-foreground">Nutné pro správné fungování webu</p>
            </div>
            <Switch checked disabled />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Analytické cookies</h4>
              <p className="text-sm text-muted-foreground">
                Pomáhají nám porozumět, jak návštěvníci používají náš web
              </p>
            </div>
            <Switch
              checked={consent.analytics}
              onCheckedChange={(checked) => setConsent((prev) => ({ ...prev, analytics: checked }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Marketingové cookies</h4>
              <p className="text-sm text-muted-foreground">
                Používané pro zobrazení personalizované reklamy
              </p>
            </div>
            <Switch
              checked={consent.marketing}
              onCheckedChange={(checked) => setConsent((prev) => ({ ...prev, marketing: checked }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Preferenční cookies</h4>
              <p className="text-sm text-muted-foreground">
                Pamatují si vaše nastavení a preference
              </p>
            </div>
            <Switch
              checked={consent.preferences}
              onCheckedChange={(checked) =>
                setConsent((prev) => ({ ...prev, preferences: checked }))
              }
            />
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => handleSave({ ...defaultConsent })}>
            Pouze nezbytné
          </Button>
          <Button variant="outline" onClick={() => handleSave(consent)}>
            Uložit preference
          </Button>
          <Button onClick={handleAcceptAll}>Přijmout vše</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
