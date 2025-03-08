import * as migration_20250308_172019 from './20250308_172019';

export const migrations = [
  {
    up: migration_20250308_172019.up,
    down: migration_20250308_172019.down,
    name: '20250308_172019'
  },
];
