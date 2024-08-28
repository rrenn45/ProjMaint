CREATE TABLE IF NOT EXISTS "asset_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"asset_description" text NOT NULL,
	"asset_class" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "work_order_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"brief_description" text NOT NULL,
	"work_order_type" text NOT NULL,
	"work_category" text NOT NULL,
	"created_by" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "work_order_table" ADD CONSTRAINT "work_order_table_created_by_users_table_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
