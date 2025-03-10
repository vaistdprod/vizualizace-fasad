import * as migration_20250310_143443 from './20250310_143443';

export const migrations = [
  {
    up: migration_20250310_143443.up,
    down: migration_20250310_143443.down,
    name: '20250310_143443'
  },
];
