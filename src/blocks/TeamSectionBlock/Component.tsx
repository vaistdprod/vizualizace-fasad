'use client'

import React from 'react'
import { motion } from 'framer-motion'
import type { LucideProps } from 'lucide-react'
import {
  User,
  Stethoscope,
  HeartPulse,
  Microscope,
  Clipboard,
  Activity,
  Thermometer,
  Baby,
  Pill,
  BookOpen,
  Star,
  Heart,
  Syringe,
  Bandage,
  MessageCircle,
} from 'lucide-react'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { MagicBorderCard } from '@/components/ui/magic-border-card'
import type { TeamSectionBlock as TeamSectionBlockProps } from '@/payload-types'

const icons: Record<string, React.ComponentType<LucideProps>> = {
  User,
  Stethoscope,
  HeartPulse,
  Microscope,
  Clipboard,
  Activity,
  Thermometer,
  Baby,
  Pill,
  BookOpen,
  Star,
  Heart,
  Syringe,
  Bandage,
  MessageCircle,
}

// Function to generate a pattern based on index
const generatePattern = (index: number) => {
  const patterns = [
    'radial-gradient(circle at 30% 70%, hsl(var(--primary)/0.8), hsl(var(--primary)/0.1) 50%)',
    'linear-gradient(135deg, hsl(var(--secondary)/0.8), hsl(var(--primary)/0.1))',
    'repeating-linear-gradient(45deg, hsl(var(--primary)/0.1), hsl(var(--primary)/0.1) 10px, hsl(var(--secondary)/0.1) 10px, hsl(var(--secondary)/0.1) 20px)',
    'radial-gradient(circle at 70% 30%, hsl(var(--secondary)/0.8), hsl(var(--secondary)/0.1) 50%)',
    'linear-gradient(45deg, hsl(var(--primary)/0.8), hsl(var(--secondary)/0.8))',
    'repeating-radial-gradient(circle at 50% 50%, hsl(var(--primary)/0.1) 0, hsl(var(--primary)/0.1) 10px, hsl(var(--secondary)/0.1) 10px, hsl(var(--secondary)/0.1) 20px)',
  ]

  return patterns[index % patterns.length]
}

export const TeamSectionBlock: React.FC<
  TeamSectionBlockProps & {
    id?: string
  }
> = (props) => {
  const { id, heading, description, teamMembers } = props

  return (
    <section className="py-16" id={`block-${id}`}>
      <div id="nas-tym" className="container px-4 md:px-6 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center">
            <div className="relative">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 bg-primary/10 rounded-full blur-lg"
              />
              <User className="w-10 h-10 mr-3 text-primary relative z-10" />
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
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers?.map((member, index) => {
            // Get the icon component from Lucide based on the icon name in the config
            const iconName = member.icon || 'User'
            // Get the icon component, with type assertion to handle undefined case
            const IconComponent = (icons[iconName] ||
              icons.User) as React.ComponentType<LucideProps>

            // Generate a unique pattern for this team member
            const pattern = generatePattern(index)

            return (
              <motion.div
                key={member.id || `team-member-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group h-full"
              >
                <MagicBorderCard
                  className="h-full flex flex-col shadow-xs rounded-2xl p-px relative overflow-hidden"
                  gradientColor="hsl(var(--muted))"
                  gradientFrom="hsl(var(--primary))"
                  gradientTo="hsl(var(--secondary))"
                  gradientOpacity={0.5}
                  gradientSize={250}
                  borderBeamSize={80}
                  borderBeamDuration={8}
                  showBorderBeamOnHover={true}
                >
                  <div
                    className="relative overflow-hidden aspect-[16/9] rounded-t-2xl w-full flex items-center justify-center"
                    style={{ background: pattern }}
                  >
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0.9 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10"
                    >
                      <div className="bg-background/30 backdrop-blur-sm p-5 rounded-full">
                        <IconComponent className="w-12 h-12 text-primary" />
                      </div>
                    </motion.div>

                    {/* Animated background elements */}
                    <motion.div
                      className="absolute top-[20%] left-[20%] w-10 h-10 rounded-full bg-primary/10"
                      animate={{
                        y: [0, 8, 0],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: index * 0.5,
                      }}
                    />
                    <motion.div
                      className="absolute bottom-[20%] right-[20%] w-8 h-8 rounded-full bg-secondary/10"
                      animate={{
                        y: [0, -6, 0],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-5 bg-card rounded-b-2xl w-full">
                    <h3 className="text-xl font-semibold">{member.title}</h3>
                    <p className="text-primary font-medium">{member.role}</p>
                    <p className="mt-2 text-muted-foreground">{member.description}</p>
                  </div>
                </MagicBorderCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
