alter table "public"."post_base" drop column "author_username";

alter table "public"."post_base" drop column "profile_path";

alter table "public"."post_description" add constraint "post_description_post_id_fkey" FOREIGN KEY (post_id) REFERENCES post_base(id) not valid;

alter table "public"."post_description" validate constraint "post_description_post_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.insert_base_and_description(post_title text, tags text, enable_reveal_date timestamp with time zone, enable_reveal boolean, allow_published_at timestamp with time zone, written_at timestamp with time zone, is_published boolean, base_content text, description_content text)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
  declare
  base_id uuid;
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
END $function$
;


