drop policy "Enable update for owners only" on "public"."post_base";

drop policy "Enable update for authenticated users only" on "public"."post_description";

create type "public"."update_post_return_type" as ("base_content" text, "description_content" text);


set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.update_base_and_description(post_id_val uuid, post_title_val text, base_content_val text, description_content_val text)
 RETURNS SETOF update_post_return_type
 LANGUAGE plpgsql
AS $function$
  begin
    update public.post_base
    set
      post_title = post_title_val,
      base_content = base_content_val
    where base_id = post_id_val;

    update public.post_description
    set
      description_content = description_content_val
    where post_id = post_id_val;

    return query
    select
      base_content as baseContent,
      description_content as descriptionContent
    from
      post_base
    inner join
      post_description
    on
      post_base.base_id = post_description.post_id
    where
      post_base.base_id = post_id_val;
  end
$function$
;
create policy "Enable update for owners only"
on "public"."post_base"
as permissive
for update
to public
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));


create policy "Enable update for authenticated users only"
on "public"."post_description"
as permissive
for update
to public
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));



