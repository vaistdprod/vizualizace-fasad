import * as migration_20250313_052240 from './20250313_052240';

export const migrations = [
  {
    up: migration_20250313_052240.up,
    down: migration_20250313_052240.down,
    name: '20250313_052240'
  },
];
