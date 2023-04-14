drop policy "Public profiles are viewable by their user." on "public"."profiles";

drop policy "Users can insert their own profile." on "public"."profiles";

drop policy "Users can update own profile." on "public"."profiles";

alter table "public"."profiles" alter column "user_id" set not null;

create policy "Public profiles are viewable by their user."
on "public"."profiles"
as permissive
for select
to public
using ((auth.uid() = user_id));


create policy "Users can insert their own profile."
on "public"."profiles"
as permissive
for insert
to public
with check ((auth.uid() = user_id));


create policy "Users can update own profile."
on "public"."profiles"
as permissive
for update
to public
using ((auth.uid() = user_id));



