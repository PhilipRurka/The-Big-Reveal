drop function if exists "public"."insert_base_and_description"(post_title text, tags text, enable_reveal_date timestamp with time zone, enable_reveal boolean, allow_published_at timestamp with time zone, written_at timestamp with time zone, is_published boolean, base_content text, description_content text);

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.insert_base_and_description(post_title text, tags text, enable_reveal_date timestamp without time zone, enable_reveal boolean, allow_published_at timestamp without time zone, written_at timestamp without time zone, is_published boolean, base_content text, description_content text)
 RETURNS SETOF void
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
    created_at,
    updated_at,
    post_content
  ) values (
      post_title,
      tags,
      enable_reveal_date,
      enable_reveal,
      allow_published_at,
      written_at,
      is_published,
      current_timestamp,
      current_timestamp,
      base_content
    ) returning id into base_id;

  INSERT into public.post_description (
    post_id,
    post_content
  ) values (
    base_id,
    description_content
  );
END $function$
;


