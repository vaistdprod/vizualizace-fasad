'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Building2, Clock, Briefcase } from 'lucide-react'
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
  Briefcase,
}

export const FooterClient: React.FC<FooterClientProps> = ({ data }) => {
  const { companyInfo, footerColumns, logoSvg } = data

  return (
    <footer className="bg-muted/30 border-t">
      <div className="mx-auto max-w-7xl px-6 pt-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center">
              <Link href="/">
                {logoSvg ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: logoSvg }}
                    className="w-[81px] h-[54px] object-contain"
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <Building2 className="h-6 w-6" />
                    <span className="text-xl font-semibold">studiofasad.cz</span>
                  </div>
                )}
              </Link>
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
                    {item.icon === 'Phone' ? (
                      <a
                        href={`tel:${item.text.replace(/\s+/g, '')}`}
                        className="hover:text-foreground transition-colors"
                      >
                        {item.text}
                      </a>
                    ) : item.icon === 'Mail' ? (
                      <a
                        href={`mailto:${item.text}`}
                        className="hover:text-foreground transition-colors"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <span>{item.text}</span>
                    )}
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
                    {link.url ? (
                      <Link
                        href={link.url}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <span className="text-sm text-muted-foreground">{link.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 py-8 border-t">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} studiofasad.cz | Terapeutika – grafika s.r.o. | Vytvořilo{' '}
            <a href="https://tdprod.cz" target="_blank" rel="noopener noreferrer">
              TD Productions
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
