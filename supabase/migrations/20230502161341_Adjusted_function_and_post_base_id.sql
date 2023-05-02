alter table "public"."post_base" alter column "base_id" set default uuid_generate_v4();

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
    ) returning base_id into base_id_var;

  INSERT into public.post_description (
    post_id,
    post_content
  ) values (
    base_id_var,
    description_content
  );

  return base_id_var;
END $function$
;


