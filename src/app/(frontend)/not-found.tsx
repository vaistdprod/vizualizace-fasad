import React from 'react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl w-full px-6 lg:px-8 flex flex-col items-center justify-center text-center">
        <div className="max-w-xl">
          <h1 className="text-6xl md:text-7xl font-bold mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-8">Stránka nebyla nalezena.</p>
          <Button href="/" size="lg" variant="default" className="px-8 group">
            Jít zpět
            <span
              className="ml-2 transition-transform group-hover:translate-x-1"
              aria-label="Šipka vpravo"
            >
              →
            </span>
          </Button>
        </div>
      </div>
    </section>
  )
}
