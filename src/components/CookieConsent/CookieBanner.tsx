'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Cookie } from 'lucide-react'
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
import { useCookieConsent, type CookieConsent, CONSENT_EXPIRY_DAYS } from '@/hooks/useCookieConsent'
import { updateGTMConsent, pushEvent } from '@/lib/gtm'

const defaultConsent: Omit<CookieConsent, 'timestamp'> = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false,
}

export function CookieBanner() {
  const { consent, isOpen, setConsent, setOpen, resetConsent } = useCookieConsent()
  const [tempConsent, setTempConsent] = useState(defaultConsent)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (!isHydrated) return

    if (!consent) {
      setOpen(true)
      pushEvent('cookie_banner_shown')
    } else {
      const expiryTime = consent.timestamp + CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000
      if (Date.now() > expiryTime) {
        resetConsent()
      }
    }
  }, [consent, setOpen, resetConsent, isHydrated])

  useEffect(() => {
    if (isOpen && consent) {
      setTempConsent({ ...defaultConsent, ...consent })
    }
  }, [isOpen, consent])

  const handleSave = (preferences: Omit<CookieConsent, 'timestamp'>) => {
    const newConsent = {
      ...preferences,
      timestamp: Date.now(),
    }
    setConsent(newConsent)
    setOpen(false)
    updateGTMConsent({
      analytics_storage: preferences.analytics ? 'granted' : 'denied',
      ad_storage: preferences.marketing ? 'granted' : 'denied',
      ad_user_data: preferences.marketing ? 'granted' : 'denied',
      ad_personalization: preferences.marketing ? 'granted' : 'denied',
    })
  }

  const handleAcceptAll = () => {
    handleSave({
      ...defaultConsent,
      analytics: true,
      marketing: true,
      preferences: true,
    })
  }

  // Custom handler to prevent closing on overlay click
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Ignore closing unless explicitly triggered by a button
      return
    }
    setOpen(open)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Cookie className="h-5 w-5" />
                Nastavení souborů cookie
              </DialogTitle>
              <DialogDescription>
                Používáme soubory cookie, abychom vám poskytli nejlepší možný zážitek z našich
                webových stránek. Některé jsou nezbytné pro fungování webu, zatímco jiné nám
                pomáhají web vylepšovat a personalizovat obsah. Vaše preference budou uložena na 90
                dní.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-medium">Nezbytné cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Tyto soubory cookie jsou nezbytné pro fungování webových stránek a nelze je
                      vypnout.
                    </p>
                  </div>
                  <Switch checked disabled aria-label="Nezbytné cookies" />
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-medium">Analytické cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Pomáhají nám pochopit, jak používáte naše stránky, a zlepšovat jejich funkce.
                    </p>
                  </div>
                  <Switch
                    checked={tempConsent.analytics}
                    onCheckedChange={(checked) =>
                      setTempConsent((prev) => ({ ...prev, analytics: checked }))
                    }
                    aria-label="Analytické cookies"
                  />
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-medium">Marketingové cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Používají se k sledování návštěvníků napříč webovými stránkami za účelem
                      zobrazení relevantní reklamy.
                    </p>
                  </div>
                  <Switch
                    checked={tempConsent.marketing}
                    onCheckedChange={(checked) =>
                      setTempConsent((prev) => ({ ...prev, marketing: checked }))
                    }
                    aria-label="Marketingové cookies"
                  />
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-medium">Preferenční cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Umožňují webu zapamatovat si informace, které mění způsob, jakým se web chová
                      nebo vypadá.
                    </p>
                  </div>
                  <Switch
                    checked={tempConsent.preferences}
                    onCheckedChange={(checked) =>
                      setTempConsent((prev) => ({ ...prev, preferences: checked }))
                    }
                    aria-label="Preferenční cookies"
                  />
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>
                  Pro více informací o tom, jak používáme cookies a jak zpracováváme vaše osobní
                  údaje nás kontaktujte na e-mailu{' '}
                  <a
                    href="mailto:info@vizualizacefasad.cz"
                    className="underline hover:text-foreground"
                  >
                    info@vizualizacefasad.cz
                  </a>
                </p>
              </div>
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => handleSave(defaultConsent)}
                className="sm:flex-1"
              >
                Pouze nezbytné
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSave(tempConsent)}
                className="sm:flex-1"
              >
                Uložit preference
              </Button>
              <Button onClick={handleAcceptAll} className="sm:flex-1">
                Přijmout vše
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
