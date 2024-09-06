ALTER TABLE "location_table" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "location_table" ADD CONSTRAINT "location_table_id_unique" UNIQUE("id");