import * as migration_20250314_033931 from './20250314_033931';

export const migrations = [
  {
    up: migration_20250314_033931.up,
    down: migration_20250314_033931.down,
    name: '20250314_033931'
  },
];
