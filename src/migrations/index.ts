import * as migration_20250319_194250 from './20250319_194250';

export const migrations = [
  {
    up: migration_20250319_194250.up,
    down: migration_20250319_194250.down,
    name: '20250319_194250'
  },
];
