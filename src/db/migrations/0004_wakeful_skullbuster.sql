CREATE TABLE IF NOT EXISTS "agreements" (
	"id" serial PRIMARY KEY NOT NULL,
	"pfi_id" integer NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"agreement_amount" numeric NOT NULL,
	"agreement_period" varchar NOT NULL,
	"is_paid" boolean DEFAULT false NOT NULL,
	"is_approved" boolean DEFAULT false NOT NULL,
	"commencement_date" timestamp,
	"expiry_date" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"message" text NOT NULL,
	"from_id" integer NOT NULL,
	"to_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" RENAME TO "users";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "pfi_id" TO "parent_id";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "user_pfi_id_pfi_id_fk";
--> statement-breakpoint
ALTER TABLE "pfi" ADD COLUMN "phone_no" varchar(15) NOT NULL;--> statement-breakpoint
ALTER TABLE "pfi" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "pfi" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "is_primary" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "agreements" ADD CONSTRAINT "agreements_pfi_id_pfi_id_fk" FOREIGN KEY ("pfi_id") REFERENCES "public"."pfi"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages" ADD CONSTRAINT "messages_from_id_users_id_fk" FOREIGN KEY ("from_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages" ADD CONSTRAINT "messages_to_id_agreements_id_fk" FOREIGN KEY ("to_id") REFERENCES "public"."agreements"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "pfi" DROP COLUMN IF EXISTS "agreement_amount";--> statement-breakpoint
ALTER TABLE "pfi" DROP COLUMN IF EXISTS "agreement_period";--> statement-breakpoint
ALTER TABLE "pfi" DROP COLUMN IF EXISTS "commencement_date";--> statement-breakpoint
ALTER TABLE "pfi" DROP COLUMN IF EXISTS "expiry_date";--> statement-breakpoint
ALTER TABLE "pfi" DROP COLUMN IF EXISTS "agreement_document";--> statement-breakpoint
ALTER TABLE "pfi" DROP COLUMN IF EXISTS "due_diligence_document";