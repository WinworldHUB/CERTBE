ALTER TABLE "pfi" ADD CONSTRAINT "pfi_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "pfi" ADD CONSTRAINT "pfi_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "pfi" ADD CONSTRAINT "pfi_phone_no_unique" UNIQUE("phone_no");