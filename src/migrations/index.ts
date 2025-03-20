import * as migration_20250320_111021 from './20250320_111021';

export const migrations = [
  {
    up: migration_20250320_111021.up,
    down: migration_20250320_111021.down,
    name: '20250320_111021'
  },
];
