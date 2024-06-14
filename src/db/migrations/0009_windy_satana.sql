ALTER TABLE "pfi" DROP CONSTRAINT "pfi_email_unique";--> statement-breakpoint
ALTER TABLE "pfi" DROP CONSTRAINT "pfi_phone_no_unique";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_parent_id_pfi_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pfi"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "pfi" DROP COLUMN IF EXISTS "email";--> statement-breakpoint
ALTER TABLE "pfi" DROP COLUMN IF EXISTS "phone_no";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "address";