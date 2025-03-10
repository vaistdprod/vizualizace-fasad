'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  Building2,
  Clock,
  Twitter,
  Linkedin,
  Instagram,
  Facebook,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Footer } from '@/payload-types'
import { LucideIcon } from 'lucide-react'

interface FooterClientProps {
  data: Footer
}

const socialLinks = [
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'LinkedIn', href: '#', icon: Linkedin },
  { name: 'Instagram', href: '#', icon: Instagram },
  { name: 'Facebook', href: '#', icon: Facebook },
]

const iconMap: Record<string, LucideIcon> = {
  Building2,
  MapPin,
  Phone,
  Mail,
  Clock,
}

export const FooterClient: React.FC<FooterClientProps> = ({ data }) => {
  const { companyInfo, footerColumns, newsletter } = data

  return (
    <footer className="bg-muted/30 border-t">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center gap-2">
              <Building2 className="h-6 w-6" />
              <span className="text-xl font-semibold">FacadeVision</span>
            </div>
            <div className="space-y-4">
              {companyInfo?.map((item, index) => {
                const Icon = iconMap[item.icon]
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    <span>{item.text}</span>
                  </div>
                )
              })}
            </div>
            <div className="flex space-x-4">
              {socialLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Footer Columns */}
          {footerColumns?.map((column, index) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm font-semibold mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links?.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.url || '#'}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter */}
          {newsletter && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm font-semibold mb-4">{newsletter.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{newsletter.description}</p>
              <form className="space-y-2">
                <input
                  type="email"
                  placeholder="Zadejte svůj e-mail"
                  className="w-full px-3 py-2 rounded-md border bg-background"
                />
                <Button className="w-full">{newsletter.buttonText}</Button>
              </form>
            </motion.div>
          )}
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} FacadeVision. Všechna práva vyhrazena.
            </p>
            <div className="flex gap-4">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Zásady ochrany soukromí
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Obchodní podmínky
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
