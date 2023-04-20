drop policy "Enable deletion for authenticated users only" on "public"."post base";

drop policy "Enable insert for authenticated users only" on "public"."post base";

drop policy "Enable read access for all users" on "public"."post base";

drop policy "Enable update for owners only" on "public"."post base";

drop policy "Enable deletion for authenticated users only" on "public"."post description";

drop policy "Enable insert for authenticated users only" on "public"."post description";

drop policy "Enable read access to the owner only" on "public"."post description";

drop policy "Enable update for authenticated users only" on "public"."post description";

alter table "public"."post base" drop constraint "post base_pkey";

alter table "public"."post description" drop constraint "post description_pkey";

drop index if exists "public"."post base_pkey";

drop index if exists "public"."post description_pkey";

drop table "public"."post base";

drop table "public"."post description";

create table "public"."post_base" (
    "id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "user_id" uuid default auth.uid(),
    "updated_at" timestamp with time zone,
    "post_content" text not null,
    "tags" text,
    "is_published" boolean not null default false,
    "enable_reveal_date" timestamp with time zone,
    "enable_reveal" boolean,
    "written_at" timestamp with time zone,
    "allow_published_at" timestamp with time zone
);


alter table "public"."post_base" enable row level security;

create table "public"."post_description" (
    "id" uuid not null,
    "post_id" uuid not null,
    "user_id" uuid default auth.uid(),
    "post_content" text not null
);


alter table "public"."post_description" enable row level security;

CREATE UNIQUE INDEX "post base_pkey" ON public.post_base USING btree (id);

CREATE UNIQUE INDEX "post description_pkey" ON public.post_description USING btree (id);

alter table "public"."post_base" add constraint "post base_pkey" PRIMARY KEY using index "post base_pkey";

alter table "public"."post_description" add constraint "post description_pkey" PRIMARY KEY using index "post description_pkey";

create policy "Enable deletion for authenticated users only"
on "public"."post_base"
as permissive
for delete
to public
using ((auth.uid() = user_id));


create policy "Enable insert for authenticated users only"
on "public"."post_base"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."post_base"
as permissive
for select
to authenticated
using (true);


create policy "Enable update for owners only"
on "public"."post_base"
as permissive
for update
to public
using ((auth.uid() = user_id));


create policy "Enable deletion for authenticated users only"
on "public"."post_description"
as permissive
for delete
to public
using ((auth.uid() = user_id));


create policy "Enable insert for authenticated users only"
on "public"."post_description"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access to the owner only"
on "public"."post_description"
as permissive
for select
to public
using ((auth.uid() = user_id));


create policy "Enable update for authenticated users only"
on "public"."post_description"
as permissive
for update
to public
with check ((auth.uid() = user_id));



