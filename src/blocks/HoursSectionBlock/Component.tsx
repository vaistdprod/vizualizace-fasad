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
  const {
    id,
    heading,
    description,
    hours,
    closedDates,
    bloodDrawInfo,
    emergencyContactInfo,
    emergencyPhone,
  } = props

  const [currentTime, setCurrentTime] = useState<string>('')
  const [isCurrentDayOpen, setIsCurrentDayOpen] = useState<boolean>(false)
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
      const currentDay = days[pragueDate.getDay()] || 'Pondělí'
      setCurrentDayName(currentDay)
      setCurrentTime(pragueTime)

      // Format current date as YYYY-MM-DD for comparison, with a fallback
      const currentDate = pragueDate.toISOString().split('T')[0] ?? ''
      if (!currentDate) {
        console.error('Failed to format current date, setting to closed')
        setIsCurrentDayOpen(false)
        return
      }

      console.log('Received hours data:', hours) // Debug: Check input data
      console.log('Received closed dates:', closedDates) // Debug: Check closed dates

      const isWeekend = pragueDate.getDay() === 0 || pragueDate.getDay() === 6
      if (isWeekend) {
        setIsCurrentDayOpen(false)
        console.log('Weekend detected, setting to closed')
        return
      }

      // Check if current date falls within any closed date range
      if (closedDates && closedDates.length > 0) {
        const isClosed = closedDates.some((cd) => {
          if (cd.from && cd.to) {
            const fromDate = new Date(cd.from).toISOString().split('T')[0] ?? ''
            const toDate = new Date(cd.to).toISOString().split('T')[0] ?? ''
            if (!fromDate || !toDate) {
              console.warn('Invalid date range in closedDates:', cd)
              return false
            }
            return currentDate >= fromDate && currentDate <= toDate
          }
          return false
        })
        if (isClosed) {
          setIsCurrentDayOpen(false)
          console.log(`Date ${currentDate} is within a closed range, setting to closed`)
          return
        }
      }

      const [currentHourStr = '0', currentMinuteStr = '0'] = pragueTime.split(':')
      const currentHour = Number(currentHourStr)
      const currentMinute = Number(currentMinuteStr)
      const currentTimeNum = currentHour * 100 + currentMinute
      console.log('Current Time:', pragueTime, 'Current Time Num:', currentTimeNum) // Debug: Check time

      const currentDayIndex = hours?.findIndex((h) => h.day === currentDay) ?? -1

      if (currentDayIndex !== -1 && hours && hours.length > 0) {
        const daySchedule = hours[currentDayIndex]
        if (!daySchedule || !daySchedule.schedules) {
          setIsCurrentDayOpen(false)
          console.log('No schedule or schedules data, setting to closed')
          return
        }

        let isOpen = false
        for (const schedule of daySchedule.schedules) {
          if (schedule.timeRange) {
            const [start, end] = schedule.timeRange.split('-').map((t) => t.trim())
            if (start && end) {
              const [startHourStr, startMinuteStr] = start.split(':').map((s) => s.trim()) || [
                '0',
                '0',
              ]
              const [endHourStr, endMinuteStr] = end.split(':').map((s) => s.trim()) || ['0', '0']

              const startHour = Number(startHourStr)
              const startMinute = Number(startMinuteStr)
              const endHour = Number(endHourStr)
              const endMinute = Number(endMinuteStr)

              if (
                !isNaN(startHour) &&
                !isNaN(startMinute) &&
                !isNaN(endHour) &&
                !isNaN(endMinute)
              ) {
                const startTimeNum = startHour * 100 + startMinute
                const endTimeNum = endHour * 100 + endMinute

                console.log(`Checking range: ${startTimeNum} <= ${currentTimeNum} <= ${endTimeNum}`) // Debug: Check ranges

                if (currentTimeNum >= startTimeNum && currentTimeNum <= endTimeNum) {
                  isOpen = true
                  break
                }
              } else {
                console.log('Invalid time format in range:', schedule.timeRange) // Debug: Log invalid formats
              }
            } else {
              console.log('Failed to parse range:', schedule.timeRange) // Debug: Log parsing failures
            }
          }
        }
        setIsCurrentDayOpen(isOpen)
        console.log('Set isCurrentDayOpen to:', isOpen) // Debug: Check state update
      } else {
        setIsCurrentDayOpen(currentHour >= 8 && currentHour < 18)
        console.log('No matching day, defaulting to:', currentHour >= 8 && currentHour < 18)
      }
    }

    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [hours, closedDates]) // Dependency array includes closedDates

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

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex justify-center mb-6"
        >
          <div
            className={`inline-flex items-center px-5 py-2.5 rounded-full shadow-lg backdrop-blur-sm ${
              isCurrentDayOpen
                ? 'bg-gradient-to-r from-emerald-500/90 via-teal-400/90 to-cyan-500/90 text-white border border-emerald-400/50'
                : 'bg-gradient-to-r from-amber-500/90 via-orange-400/90 to-rose-500/90 text-white border border-amber-400/50'
            }`}
          >
            <div
              className={`w-3 h-3 rounded-full mr-3 animate-pulse ${
                isCurrentDayOpen
                  ? 'bg-white shadow-sm ring-2 ring-white/30'
                  : 'bg-white shadow-sm ring-2 ring-white/30'
              }`}
            ></div>
            <span className="text-sm font-medium">
              {isCurrentDayOpen ? 'Nyní máme otevřeno' : 'Nyní máme zavřeno'}
              {currentTime && (
                <span className="ml-2 px-2.5 py-0.5 rounded-md bg-white/20 text-white text-xs font-normal border border-white/10 shadow-inner">
                  <span className="opacity-90">{currentTime}</span>{' '}
                  <span className="opacity-75">({currentDayName})</span>
                </span>
              )}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="grid grid-cols-12 px-8 -mx-8 gap-4 pb-2 relative after:content-[''] after:absolute after:bottom-0 after:left-8 after:right-8 after:h-px after:bg-border"
            >
              <div className="col-span-4 font-medium text-sm uppercase tracking-wider text-muted-foreground">
                Den
              </div>
              <div className="col-span-8 font-medium text-sm uppercase tracking-wider text-muted-foreground">
                Ordinační hodiny
              </div>
            </motion.div>

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
                    {!schedule.schedules || schedule.schedules.length === 0 ? (
                      <span className="text-rose-500 font-medium">Zavřeno</span>
                    ) : (
                      <div className="space-y-2">
                        {schedule.schedules.map((s, idx) => (
                          <div
                            key={`${schedule.day}-${idx}`}
                            className="flex flex-wrap justify-between"
                          >
                            <span className="font-medium mr-4">{s.timeRange}</span>
                            {s.note && <span className="text-muted-foreground">{s.note}</span>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </MagicBorderCard>
        </motion.div>

        {/* Display closed date ranges */}
        {closedDates && closedDates.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-8 max-w-4xl mx-auto"
          >
            <MagicBorderCard
              className="p-6 rounded-2xl shadow-xs overflow-hidden"
              gradientColor="hsl(var(--muted))"
              gradientFrom="hsl(var(--primary))"
              gradientTo="hsl(var(--secondary))"
              gradientOpacity={0.2}
              borderBeamSize={100}
              borderBeamDuration={10}
              showBorderBeamOnHover={true}
            >
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-lg font-medium mb-4 text-primary"
              >
                Zavřené období
              </motion.h3>
              <div className="space-y-2">
                {closedDates.map((cd, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                    className="flex justify-between"
                  >
                    <span className="text-muted-foreground">
                      {new Date(cd.from).toLocaleDateString('cs-CZ', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}{' '}
                      -{' '}
                      {new Date(cd.to).toLocaleDateString('cs-CZ', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                    </span>
                    {cd.note && <span className="text-muted-foreground">{cd.note}</span>}
                  </motion.div>
                ))}
              </div>
            </MagicBorderCard>
          </motion.div>
        )}

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
