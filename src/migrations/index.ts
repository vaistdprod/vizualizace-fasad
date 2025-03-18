import * as migration_20250318_185855 from './20250318_185855'

export const migrations = [
  {
    up: migration_20250318_185855.up,
    down: migration_20250318_185855.down,
    name: '20250318_185855',
  },
]
