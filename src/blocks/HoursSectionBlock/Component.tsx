'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Info, AlertCircle, Clock } from 'lucide-react'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { MagicBorderCard } from '@/components/ui/magic-border-card'

import type { HoursSectionBlock as HoursSectionBlockProps } from '@/payload-types'

export const HoursSectionBlock: React.FC<
  HoursSectionBlockProps & {
    id?: string
  }
> = (props) => {
  const { id, heading, description, hours, bloodDrawInfo, emergencyContactInfo, emergencyPhone } =
    props

  const [currentTime, setCurrentTime] = useState<string>('')
  const [isCurrentDayOpen, setIsCurrentDayOpen] = useState<boolean | null>(null)
  const [currentDayName, setCurrentDayName] = useState<string>('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const pragueTime = new Intl.DateTimeFormat('cs-CZ', {
        timeZone: 'Europe/Prague',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(now)

      const days = ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota']
      const pragueDate = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Prague' }))
      const currentDay = days[pragueDate.getDay()] || 'Pondělí' // Fallback to Monday if undefined
      setCurrentDayName(currentDay)

      const currentDayIndex = hours?.findIndex((h) => h.day === currentDay) ?? -1
      if (currentDayIndex !== -1 && hours && hours.length > 0) {
        setCurrentTime(pragueTime)

        const daySchedule = hours[currentDayIndex]
        if (daySchedule && daySchedule.hours?.toLowerCase().includes('zavřeno')) {
          setIsCurrentDayOpen(false)
        } else if (daySchedule) {
          const scheduleLines = daySchedule.hours?.split('\n') || []
          let isOpen = false

          // Add fallback values for destructuring
          const [currentHourStr = '0', currentMinuteStr = '0'] = pragueTime.split(':')
          const currentHour = Number(currentHourStr)
          const currentMinute = Number(currentMinuteStr)
          const currentTimeNum = currentHour * 100 + currentMinute

          for (const line of scheduleLines) {
            const timePart = line.split(' (')[0]?.trim()
            if (timePart) {
              const [start, end] = timePart.split(' - ')
              if (start && end) {
                const [startHourStr = '0', startMinuteStr = '0'] = start.split(':')
                const [endHourStr = '0', endMinuteStr = '0'] = end.split(':')

                const startHour = Number(startHourStr)
                const startMinute = Number(startMinuteStr)
                const endHour = Number(endHourStr)
                const endMinute = Number(endMinuteStr)

                const startTimeNum = startHour * 100 + startMinute
                const endTimeNum = endHour * 100 + endMinute

                if (currentTimeNum >= startTimeNum && currentTimeNum <= endTimeNum) {
                  isOpen = true
                  break
                }
              }
            }
          }
          setIsCurrentDayOpen(isOpen)
        }
      }
    }

    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [hours])

  return (
    <section className="py-16" id={`block-${id}`}>
      <div id="ordinacni-hodiny" className="container px-4 md:px-6 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center">
            <div className="relative">
              <Calendar className="w-10 h-10 mr-3 text-primary" />
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-md" />
            </div>
            <AnimatedGradientText
              as="h2"
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl pb-4 -mb-4"
              colorFrom="hsl(var(--primary))"
              colorTo="hsl(var(--secondary))"
            >
              {heading}
            </AnimatedGradientText>
          </div>
          <p className="mt-4 text-muted-foreground md:text-lg">{description}</p>
        </motion.div>

        {isCurrentDayOpen !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center mb-6"
          >
            <div
              className={`inline-flex items-center px-5 py-2.5 rounded-full shadow-sm backdrop-blur-sm ${
                isCurrentDayOpen
                  ? 'bg-green-500/80 text-white border border-green-600/50'
                  : 'bg-rose-500/80 text-white border border-rose-600/50'
              }`}
            >
              <div
                className={`w-3 h-3 rounded-full mr-3 ${
                  isCurrentDayOpen ? 'bg-white/90 shadow-sm' : 'bg-white/90 shadow-sm'
                }`}
              ></div>
              <span className="text-sm font-medium">
                {isCurrentDayOpen ? 'Nyní máme otevřeno' : 'Nyní máme zavřeno'}
                {currentTime && (
                  <span className="ml-2 px-2 py-0.5 rounded-md bg-white/20 text-white text-xs font-normal">
                    {currentTime} ({currentDayName})
                  </span>
                )}
              </span>
            </div>
          </motion.div>
        )}

        <div className="max-w-4xl mx-auto">
          <MagicBorderCard
            className="p-8 pb-0 rounded-2xl shadow-xs overflow-hidden"
            gradientColor="hsl(var(--muted))"
            gradientFrom="hsl(var(--primary))"
            gradientTo="hsl(var(--secondary))"
            gradientOpacity={0.2}
            borderBeamSize={100}
            borderBeamDuration={10}
            showBorderBeamOnHover={true}
          >
            {/* Table header */}
            <div className="grid grid-cols-12 px-8 -mx-8 gap-4 pb-2 relative after:content-[''] after:absolute after:bottom-0 after:left-8 after:right-8 after:h-px after:bg-border">
              <div className="col-span-4 font-medium text-sm uppercase tracking-wider text-muted-foreground">
                Den
              </div>
              <div className="col-span-8 font-medium text-sm uppercase tracking-wider text-muted-foreground">
                Ordinační hodiny
              </div>
            </div>

            {/* Hours items */}
            <div className="space-y-0">
              {hours?.map((schedule, index) => (
                <motion.div
                  key={schedule.day}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`grid grid-cols-12 gap-4 py-4 px-8 -mx-8 hover:bg-primary/5 transition-colors items-center relative ${
                    index !== 0
                      ? "before:content-[''] before:absolute before:top-0 before:left-8 before:right-8 before:h-px before:bg-border"
                      : ''
                  } ${schedule.day === currentDayName ? 'bg-primary/5' : ''}`}
                >
                  <div className="col-span-4">
                    <h3 className="text-base font-medium flex items-center">
                      {schedule.day === currentDayName && (
                        <Clock className="w-4 h-4 mr-2 text-primary" />
                      )}
                      {schedule.day}
                    </h3>
                  </div>
                  <div className="col-span-8">
                    {schedule.hours?.toLowerCase().includes('zavřeno') ? (
                      <span className="text-rose-500 font-medium">Zavřeno</span>
                    ) : schedule.hours?.includes('\n') ? (
                      <div className="space-y-2">
                        {schedule.hours.split('\n').map((line, idx) => (
                          <div
                            key={`${schedule.day}-${idx}`}
                            className="flex flex-wrap justify-between"
                          >
                            <span className="font-medium mr-4">{line?.split(' (')[0] || ''}</span>
                            {line?.includes(' (') && (
                              <span className="text-muted-foreground">
                                {line?.split(' (')[1]?.replace(')', '') || ''}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-foreground">{schedule.hours}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </MagicBorderCard>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-10 max-w-4xl mx-auto">
          {bloodDrawInfo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary/5 to-primary/10 p-5 rounded-2xl shadow-sm border border-primary/20 backdrop-blur-md"
            >
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1 text-primary">Odběry krve</h3>
                  <p className="text-muted-foreground">{bloodDrawInfo}</p>
                </div>
              </div>
            </motion.div>
          )}

          {emergencyContactInfo && emergencyPhone && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-rose-500/5 to-rose-500/10 p-5 rounded-2xl shadow-sm border border-rose-500/20 backdrop-blur-md"
            >
              <div className="flex items-start">
                <div className="bg-rose-500/10 p-2 rounded-full mr-3">
                  <AlertCircle className="w-5 h-5 text-rose-500" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1 text-rose-600 dark:text-rose-400">
                    Pohotovost
                  </h3>
                  <p className="text-muted-foreground">
                    {emergencyContactInfo}{' '}
                    <a
                      href={`tel:${emergencyPhone}`}
                      className="text-rose-600 dark:text-rose-400 font-medium hover:text-rose-700 dark:hover:text-rose-300 transition-colors"
                    >
                      {emergencyPhone}
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
