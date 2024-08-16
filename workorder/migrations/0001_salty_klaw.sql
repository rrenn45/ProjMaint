ALTER TABLE "users_table" RENAME COLUMN "age" TO "jobFunction";--> statement-breakpoint
ALTER TABLE "users_table" ALTER COLUMN "jobFunction" SET DATA TYPE text;