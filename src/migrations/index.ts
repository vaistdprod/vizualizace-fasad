import * as migration_20250312_042310 from './20250312_042310';

export const migrations = [
  {
    up: migration_20250312_042310.up,
    down: migration_20250312_042310.down,
    name: '20250312_042310'
  },
];
