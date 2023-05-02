drop type "public"."select_authors_posts_type";

create type "public"."select_authors_posts_type" as ("post_base_id" uuid, "created_at" timestamp with time zone, "post_title" text, "username" text);

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.select_authors_posts(profile_path text)
 RETURNS SETOF select_authors_posts_type
 LANGUAGE plpgsql
AS $function$
  declare
    user_id_var uuid;
begin
  select profile_id
  into user_id_var
  from profiles
  where path = profile_path;

  return query
  select
    base_id,
    created_at,
    post_title,
    username
  from post_base
  inner
    join profiles
    on profiles.profile_id = post_base.user_id
  where profiles.profile_id = user_id_var
  order by post_base.created_at;
end $function$
;