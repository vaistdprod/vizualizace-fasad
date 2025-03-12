import * as migration_20250312_151251 from './20250312_151251';

export const migrations = [
  {
    up: migration_20250312_151251.up,
    down: migration_20250312_151251.down,
    name: '20250312_151251'
  },
];
