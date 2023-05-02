alter table "public"."post_base" drop constraint "base_content_length";

alter table "public"."post_description" drop constraint "description_content_length";

alter table "public"."post_base" drop column "post_content";

alter table "public"."post_base" add column "base_content" text not null;

alter table "public"."post_description" drop column "post_content";

alter table "public"."post_description" add column "description_content" text not null default ''::text;

alter table "public"."post_base" add constraint "base_content_length" CHECK (((char_length(base_content) >= 1) AND (char_length(base_content) < 10000))) not valid;

alter table "public"."post_base" validate constraint "base_content_length";

alter table "public"."post_description" add constraint "description_content_length" CHECK ((char_length(description_content) < 10000)) not valid;

alter table "public"."post_description" validate constraint "description_content_length";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.insert_base_and_description(post_title text, tags text, enable_reveal_date timestamp without time zone, enable_reveal boolean, allow_published_at timestamp without time zone, written_at timestamp without time zone, is_published boolean, base_content text, description_content text)
 RETURNS uuid
 LANGUAGE plpgsql
AS $function$
  declare base_id_var uuid;
begin
  INSERT into public.post_base (
    post_title,
    tags,
    enable_reveal_date,
    enable_reveal,
    allow_published_at,
    written_at,
    is_published,
    base_content
  ) values (
      post_title,
      tags,
      enable_reveal_date,
      enable_reveal,
      allow_published_at,
      written_at,
      is_published,
      base_content
    ) returning base_id into base_id_var;

  INSERT into public.post_description (
    post_id,
    description_content
  ) values (
    base_id_var,
    description_content
  );

  return base_id_var;
END $function$
;


