drop policy "Enable read access to the owner only" on "public"."post_description";

create policy "Enable read access to the owner only"
on "public"."post_description"
as permissive
for select
to authenticated
using (true);



