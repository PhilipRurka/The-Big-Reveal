set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  insert into public.profiles (id, username, path)
  values (new.id, new.raw_user_meta_data->>'username', new.raw_user_meta_data->>'path');
  return new;
end;
$function$
;


