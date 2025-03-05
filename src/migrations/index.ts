import * as migration_20250305_061926 from './20250305_061926';

export const migrations = [
  {
    up: migration_20250305_061926.up,
    down: migration_20250305_061926.down,
    name: '20250305_061926'
  },
];
