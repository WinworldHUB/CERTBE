ALTER TABLE "users" ALTER COLUMN "parent_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "is_primary" DROP NOT NULL;