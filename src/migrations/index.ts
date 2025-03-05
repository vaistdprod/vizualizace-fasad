import * as migration_20250305_124204 from './20250305_124204';

export const migrations = [
  {
    up: migration_20250305_124204.up,
    down: migration_20250305_124204.down,
    name: '20250305_124204'
  },
];
