alter table "public"."post_base" alter column "allow_published_at" set default now();

alter table "public"."post_base" alter column "allow_published_at" set not null;

alter table "public"."post_base" alter column "created_at" set not null;

alter table "public"."post_base" alter column "enable_reveal" set default true;

alter table "public"."post_base" alter column "enable_reveal" set not null;

alter table "public"."post_base" alter column "enable_reveal_date" set default now();

alter table "public"."post_base" alter column "enable_reveal_date" set not null;

alter table "public"."post_base" alter column "is_published" set default true;

alter table "public"."post_base" alter column "tags" set default ''::text;

alter table "public"."post_base" alter column "tags" set not null;

alter table "public"."post_base" alter column "updated_at" set default now();

alter table "public"."post_base" alter column "updated_at" set not null;

alter table "public"."post_base" alter column "user_id" set not null;

alter table "public"."post_base" alter column "written_at" set default now();

alter table "public"."post_base" alter column "written_at" set not null;

alter table "public"."post_description" alter column "post_content" set default ''::text;

alter table "public"."post_description" alter column "post_content" set not null;

alter table "public"."post_description" alter column "user_id" drop default;

alter table "public"."post_description" alter column "user_id" set not null;

alter table "public"."post_description" add constraint "post_description_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."post_description" validate constraint "post_description_user_id_fkey";


