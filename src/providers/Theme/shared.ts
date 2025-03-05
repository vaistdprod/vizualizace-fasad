import type { Theme } from './types'

export const defaultTheme = 'light'

export const getImplicitPreference = (): Theme | null => {
  return 'light'
}
