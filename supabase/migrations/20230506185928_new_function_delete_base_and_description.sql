set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.delete_base_and_description(post_id_val uuid)
 RETURNS SETOF void
 LANGUAGE plpgsql
AS $function$
begin
  delete from
    public.post_description
  where
    post_id = post_id_val;

  delete from
    public.post_base
  where
    base_id = post_id_val;
end $function$
;


