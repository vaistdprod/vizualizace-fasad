import * as migration_20250310_191740 from './20250310_191740';

export const migrations = [
  {
    up: migration_20250310_191740.up,
    down: migration_20250310_191740.down,
    name: '20250310_191740'
  },
];
