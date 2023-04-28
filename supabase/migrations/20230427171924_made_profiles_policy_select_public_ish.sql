drop policy "Public profiles are viewable by their user." on "public"."profiles";

create policy "Public profiles are viewable by their user."
on "public"."profiles"
as permissive
for select
to authenticated
using (true);



