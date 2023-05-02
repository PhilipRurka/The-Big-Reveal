drop policy "Users can insert their own profile." on "public"."profiles";

drop policy "Users can update own profile." on "public"."profiles";

alter table "public"."profiles" drop constraint "profiles_id_fkey";

alter table "public"."post_base" drop constraint "post_base_id_key";

alter table "public"."post_base" drop constraint "post_base_user_id_fkey";

alter table "public"."post_description" drop constraint "post_description_id_key";

alter table "public"."post_description" drop constraint "post_description_post_id_fkey";

alter table "public"."profiles" drop constraint "profiles_id_key";

alter table "public"."post_base" drop constraint "post base_pkey";

alter table "public"."post_description" drop constraint "post description_pkey";

alter table "public"."profiles" drop constraint "profiles_pkey";

drop index if exists "public"."post base_pkey";

drop index if exists "public"."post description_pkey";

drop index if exists "public"."post_base_id_key";

drop index if exists "public"."post_description_id_key";

drop index if exists "public"."profiles_id_key";

drop index if exists "public"."profiles_pkey";

alter table "public"."post_base" drop column "id";

alter table "public"."post_base" add column "post_base_id" uuid not null;

alter table "public"."post_description" drop column "id";

alter table "public"."post_description" add column "post_description_id" uuid not null default uuid_generate_v4();

alter table "public"."profiles" drop column "id";

alter table "public"."profiles" add column "profile_id" uuid not null;

CREATE UNIQUE INDEX "post base_pkey" ON public.post_base USING btree (post_base_id);

CREATE UNIQUE INDEX "post description_pkey" ON public.post_description USING btree (post_description_id);

CREATE UNIQUE INDEX post_base_id_key ON public.post_base USING btree (post_base_id);

CREATE UNIQUE INDEX post_description_id_key ON public.post_description USING btree (post_description_id);

CREATE UNIQUE INDEX profiles_id_key ON public.profiles USING btree (profile_id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (profile_id);

alter table "public"."post_base" add constraint "post base_pkey" PRIMARY KEY using index "post base_pkey";

alter table "public"."post_description" add constraint "post description_pkey" PRIMARY KEY using index "post description_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."profiles" add constraint "profiles_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES auth.users(id) not valid;

alter table "public"."profiles" validate constraint "profiles_profile_id_fkey";

alter table "public"."post_base" add constraint "post_base_id_key" UNIQUE using index "post_base_id_key";

alter table "public"."post_base" add constraint "post_base_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(profile_id) not valid;

alter table "public"."post_base" validate constraint "post_base_user_id_fkey";

alter table "public"."post_description" add constraint "post_description_id_key" UNIQUE using index "post_description_id_key";

alter table "public"."post_description" add constraint "post_description_post_id_fkey" FOREIGN KEY (post_id) REFERENCES post_base(post_base_id) not valid;

alter table "public"."post_description" validate constraint "post_description_post_id_fkey";

alter table "public"."profiles" add constraint "profiles_id_key" UNIQUE using index "profiles_id_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  insert into public.profiles (profile_id, username, path)
  values (new.id, new.raw_user_meta_data->>'username', new.raw_user_meta_data->>'path');
  return new;
end;
$function$
;

create policy "Users can insert their own profile."
on "public"."profiles"
as permissive
for insert
to public
with check ((auth.uid() = profile_id));


create policy "Users can update own profile."
on "public"."profiles"
as permissive
for update
to public
using ((auth.uid() = profile_id));