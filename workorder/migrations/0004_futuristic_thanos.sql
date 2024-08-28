CREATE TABLE IF NOT EXISTS "location_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"district" text NOT NULL,
	"field" text NOT NULL,
	"area" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "asset_table" ADD COLUMN "asset_criticality" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "asset_table" ADD COLUMN "location_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "title" text NOT NULL;--> statement-breakpoint
ALTER TABLE "work_order_table" ADD COLUMN "asset_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "asset_table" ADD CONSTRAINT "asset_table_location_id_location_table_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."location_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "work_order_table" ADD CONSTRAINT "work_order_table_asset_id_asset_table_id_fk" FOREIGN KEY ("asset_id") REFERENCES "public"."asset_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
