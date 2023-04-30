alter table "public"."post_base" drop constraint "post_content_length";

alter table "public"."post_description" drop constraint "post_content_length";

alter table "public"."post_base" add constraint "base_content_length" CHECK (((char_length(post_content) >= 1) AND (char_length(post_content) < 10000))) not valid;

alter table "public"."post_base" validate constraint "base_content_length";

alter table "public"."post_base" add constraint "base_title_length" CHECK ((char_length(post_title) < 50)) not valid;

alter table "public"."post_base" validate constraint "base_title_length";

alter table "public"."post_description" add constraint "description_content_length" CHECK ((char_length(post_content) < 10000)) not valid;

alter table "public"."post_description" validate constraint "description_content_length";

set check_function_bodies = off;

DROP FUNCTION public.insert_base_and_description(
  post_title text,
  tags text,
  enable_reveal_date timestamp,
  enable_reveal boolean,
  allow_published_at timestamp,
  written_at timestamp,
  is_published boolean,
  base_content text,
  description_content text
);

CREATE OR REPLACE FUNCTION public.insert_base_and_description(post_title text, tags text, enable_reveal_date timestamp without time zone, enable_reveal boolean, allow_published_at timestamp without time zone, written_at timestamp without time zone, is_published boolean, base_content text, description_content text)
 RETURNS uuid
 LANGUAGE plpgsql
AS $function$
  declare base_id uuid;
begin
  INSERT into public.post_base (
    post_title,
    tags,
    enable_reveal_date,
    enable_reveal,
    allow_published_at,
    written_at,
    is_published,
    post_content
  ) values (
      post_title,
      tags,
      enable_reveal_date,
      enable_reveal,
      allow_published_at,
      written_at,
      is_published,
      base_content
    ) returning id into base_id;

  INSERT into public.post_description (
    post_id,
    post_content
  ) values (
    base_id,
    description_content
  );

  return base_id;
END $function$
;


