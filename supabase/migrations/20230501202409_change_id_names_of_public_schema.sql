alter table "public"."post_base" drop constraint "post_base_id_key";

alter table "public"."post_description" drop constraint "post_description_id_key";

alter table "public"."post_description" drop constraint "post_description_post_id_fkey";

alter table "public"."post_base" drop constraint "post base_pkey";

alter table "public"."post_description" drop constraint "post description_pkey";

drop index if exists "public"."post base_pkey";

drop index if exists "public"."post description_pkey";

drop index if exists "public"."post_base_id_key";

drop index if exists "public"."post_description_id_key";

alter table "public"."post_base" drop column "post_base_id";

alter table "public"."post_base" add column "base_id" uuid not null;

alter table "public"."post_description" drop column "post_description_id";

alter table "public"."post_description" add column "description_id" uuid not null default uuid_generate_v4();

CREATE UNIQUE INDEX "post base_pkey" ON public.post_base USING btree (base_id);

CREATE UNIQUE INDEX "post description_pkey" ON public.post_description USING btree (description_id);

CREATE UNIQUE INDEX post_base_id_key ON public.post_base USING btree (base_id);

CREATE UNIQUE INDEX post_description_id_key ON public.post_description USING btree (description_id);

alter table "public"."post_base" add constraint "post base_pkey" PRIMARY KEY using index "post base_pkey";

alter table "public"."post_description" add constraint "post description_pkey" PRIMARY KEY using index "post description_pkey";

alter table "public"."post_base" add constraint "post_base_id_key" UNIQUE using index "post_base_id_key";

alter table "public"."post_description" add constraint "post_description_id_key" UNIQUE using index "post_description_id_key";

alter table "public"."post_description" add constraint "post_description_post_id_fkey" FOREIGN KEY (post_id) REFERENCES post_base(base_id) not valid;

alter table "public"."post_description" validate constraint "post_description_post_id_fkey";

set check_function_bodies = off;

create type "public"."select_authors_posts_type" as ("post_base_id" uuid, "created_at" timestamp without time zone, "post_title" text, "username" text);


