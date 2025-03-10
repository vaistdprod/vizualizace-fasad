'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Building2, Clock } from 'lucide-react'
import type { Footer } from '@/payload-types'
import { LucideIcon } from 'lucide-react'

interface FooterClientProps {
  data: Footer
}

const iconMap: Record<string, LucideIcon> = {
  Building2,
  MapPin,
  Phone,
  Mail,
  Clock,
}

export const FooterClient: React.FC<FooterClientProps> = ({ data }) => {
  const { companyInfo, footerColumns } = data

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
              <span className="text-xl font-semibold">VizualizaceFasad.cz</span>
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
        </div>

        <div className="mt-12 pt-8 border-t">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} VizualizaceFasad.cz - Terapeutika – grafika s.r.o. Všechna
            práva vyhrazena.
          </p>
        </div>
      </div>
    </footer>
  )
}
