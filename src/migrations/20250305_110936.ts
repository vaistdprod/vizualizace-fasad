import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_pricing_section_pricing_items" ADD COLUMN "description" varchar;
  ALTER TABLE "_pages_v_blocks_pricing_section_pricing_items" ADD COLUMN "description" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_pricing_section_pricing_items" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_pages_v_blocks_pricing_section_pricing_items" DROP COLUMN IF EXISTS "description";`)
}
