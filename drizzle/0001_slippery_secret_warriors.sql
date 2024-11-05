ALTER TABLE "purchase_Table" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "purchase_Table" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "purchase_Table" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "purchase_table_index" ON "purchase_Table" USING btree ("id");