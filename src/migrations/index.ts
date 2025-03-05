import * as migration_20250304_095044 from './20250304_095044';

export const migrations = [
  {
    up: migration_20250304_095044.up,
    down: migration_20250304_095044.down,
    name: '20250304_095044'
  },
];
