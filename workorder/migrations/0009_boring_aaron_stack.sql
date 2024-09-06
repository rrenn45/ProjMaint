ALTER TABLE "asset_table" RENAME COLUMN "asset_criticality" TO "asset_status";--> statement-breakpoint
ALTER TABLE "asset_table" ALTER COLUMN "asset_class" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "asset_table" ALTER COLUMN "asset_status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "asset_table" ALTER COLUMN "asset_status" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "asset_table" ALTER COLUMN "location_id" DROP NOT NULL;