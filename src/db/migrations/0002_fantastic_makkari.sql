ALTER TABLE "pfi" ALTER COLUMN "name" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "pfi" ALTER COLUMN "commencement_date" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "pfi" ALTER COLUMN "expiry_date" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "name" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "email" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;