CREATE TABLE "transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"amount" numeric NOT NULL,
	"category" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
