ALTER TABLE "location_table" RENAME COLUMN "id" TO "location_id";--> statement-breakpoint
ALTER TABLE "location_table" DROP CONSTRAINT "location_table_id_unique";--> statement-breakpoint
ALTER TABLE "asset_table" DROP CONSTRAINT "asset_table_location_id_location_table_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "asset_table" ADD CONSTRAINT "asset_table_location_id_location_table_location_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."location_table"("location_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "location_table" ADD CONSTRAINT "location_table_location_id_unique" UNIQUE("location_id");