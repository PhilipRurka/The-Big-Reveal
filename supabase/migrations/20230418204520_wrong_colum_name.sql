alter table "public"."post base" drop column "allow_publish_at";

alter table "public"."post base" add column "allow_published_at" timestamp with time zone;


