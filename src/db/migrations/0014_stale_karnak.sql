ALTER TABLE "agreements" ALTER COLUMN "is_active" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "agreements" ALTER COLUMN "status" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "agreements" ALTER COLUMN "is_paid" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "agreements" ALTER COLUMN "is_approved" DROP NOT NULL;