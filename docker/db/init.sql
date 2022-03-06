CREATE TABLE "users" (
  "user_id" character(36) NOT NULL,
  "username" character(40) NOT NULL,
  "parent_name" character(80) NOT NULL,
  "password" character(80) NOT NULL,
  "email" character(80) NOT NULL,
  PRIMARY KEY ("user_id")
);

ALTER TABLE "users"
ADD CONSTRAINT "users_username" UNIQUE ("username");

ALTER TABLE "users"
ADD CONSTRAINT "users_user_id" UNIQUE ("user_id");

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
CREATE INDEX "IDX_session_expire" ON "session" ("expire");