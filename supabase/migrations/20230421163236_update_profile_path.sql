alter table "public"."post_base" alter column "profile_path" set default ''::text;

alter table "public"."post_base" alter column "profile_path" set not null;


