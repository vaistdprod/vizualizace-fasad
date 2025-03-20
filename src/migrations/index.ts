import * as migration_20250320_103002 from './20250320_103002';

export const migrations = [
  {
    up: migration_20250320_103002.up,
    down: migration_20250320_103002.down,
    name: '20250320_103002'
  },
];
