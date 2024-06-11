CREATE TABLE IF NOT EXISTS "pfi" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"address" text NOT NULL,
	"agreement_amount" numeric NOT NULL,
	"agreement_period" varchar NOT NULL,
	"commencement_date" timestamp NOT NULL,
	"expiry_date" timestamp NOT NULL,
	"agreement_document" text NOT NULL,
	"due_diligence_document" text NOT NULL
);
