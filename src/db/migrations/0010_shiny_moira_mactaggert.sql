ALTER TABLE "agreements" DROP CONSTRAINT "agreements_pfi_id_pfi_id_fk";
--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_parent_id_pfi_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "agreements" ADD CONSTRAINT "agreements_pfi_id_pfi_id_fk" FOREIGN KEY ("pfi_id") REFERENCES "public"."pfi"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_parent_id_pfi_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pfi"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
