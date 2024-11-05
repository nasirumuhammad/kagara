CREATE TABLE IF NOT EXISTS "purchase_Table" (
	"id" serial NOT NULL,
	"userId" varchar(255),
	"quantity" integer,
	"price" integer,
	"adress" varchar(255),
	"phone" varchar(255),
	"confirmed" boolean DEFAULT false,
	"createdAt" date DEFAULT now()
);
