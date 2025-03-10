'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { useCookieConsent, type CookieConsent } from '@/hooks/useCookieConsent'
import { GA_ID } from '@/lib/ga'

const defaultConsent: Omit<CookieConsent, 'timestamp'> = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false,
}

export function CookieBanner() {
  const { consent, isOpen, setConsent, setOpen } = useCookieConsent()

  useEffect(() => {
    if (!consent) {
      setOpen(true)
    } else {
      // Configure GA consent based on user choice
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: consent.analytics ? 'granted' : 'denied',
        })
      }
    }
  }, [consent, setOpen])

  const handleSave = (preferences: Omit<CookieConsent, 'timestamp'>) => {
    const newConsent = {
      ...preferences,
      timestamp: Date.now(),
    }
    setConsent(newConsent)

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: preferences.analytics ? 'granted' : 'denied',
      })
    }
  }

  const handleAcceptAll = () => {
    handleSave({
      ...defaultConsent,
      analytics: true,
      marketing: true,
      preferences: true,
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Cookie className="h-5 w-5" />
                Nastavení souborů cookie
              </DialogTitle>
              <DialogDescription>
                Používáme soubory cookie, abychom vám poskytli nejlepší možný zážitek z našich
                webových stránek. Některé jsou nezbytné pro fungování webu, zatímco jiné nám
                pomáhají web vylepšovat a personalizovat obsah.
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
                    checked={consent?.analytics ?? defaultConsent.analytics}
                    onCheckedChange={(checked) =>
                      handleSave({ ...defaultConsent, ...consent, analytics: checked })
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
                    checked={consent?.marketing ?? defaultConsent.marketing}
                    onCheckedChange={(checked) =>
                      handleSave({ ...defaultConsent, ...consent, marketing: checked })
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
                    checked={consent?.preferences ?? defaultConsent.preferences}
                    onCheckedChange={(checked) =>
                      handleSave({ ...defaultConsent, ...consent, preferences: checked })
                    }
                    aria-label="Preferenční cookies"
                  />
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>
                  Pro více informací o tom, jak používáme cookies, navštivte naše{' '}
                  <a href="/privacy" className="underline hover:text-foreground">
                    Zásady ochrany soukromí
                  </a>
                  .
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
                onClick={() => handleSave({ ...defaultConsent, ...consent })}
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
