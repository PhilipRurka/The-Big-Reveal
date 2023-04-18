drop trigger if exists "handle_updated_at" on "public"."private posts";

drop trigger if exists "handle_updated_at" on "public"."public posts";

drop policy "Enable deletion for authenticated users only" on "public"."private posts";

drop policy "Enable insert for authenticated users only" on "public"."private posts";

drop policy "Enable read access to the owner only" on "public"."private posts";

drop policy "Enable update for authenticated users only" on "public"."private posts";

drop policy "Enable deletion for authenticated users only" on "public"."public posts";

drop policy "Enable insert for authenticated users only" on "public"."public posts";

drop policy "Enable read access for all users" on "public"."public posts";

drop policy "Enable update for owners only" on "public"."public posts";

alter table "public"."private posts" drop constraint "private posts_post_id_fkey";

alter table "public"."public posts" drop constraint "public posts_id_key";

alter table "public"."follow post" drop constraint "follow post_post_id_fkey";

alter table "public"."private posts" drop constraint "private posts_pkey";

alter table "public"."public posts" drop constraint "public posts_pkey";

drop index if exists "public"."private posts_pkey";

drop index if exists "public"."public posts_id_key";

drop index if exists "public"."public posts_pkey";

drop table "public"."private posts";

drop table "public"."public posts";

create table "public"."post base" (
    "id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "user_id" uuid default auth.uid(),
    "updated_at" timestamp with time zone,
    "post_title" text not null,
    "post_content" text not null,
    "tags" text,
    "is_published" boolean not null default false,
    "enable_reveal_date" timestamp with time zone,
    "enable_reveal" boolean,
    "allow_publish_at" timestamp with time zone,
    "written_at" timestamp with time zone
);


alter table "public"."post base" enable row level security;

create table "public"."post description" (
    "id" uuid not null,
    "post_id" uuid not null,
    "user_id" uuid default auth.uid(),
    "post_content" text not null
);


alter table "public"."post description" enable row level security;

CREATE UNIQUE INDEX "private posts_pkey" ON public."post description" USING btree (id);

CREATE UNIQUE INDEX "public posts_id_key" ON public."post base" USING btree (id);

CREATE UNIQUE INDEX "public posts_pkey" ON public."post base" USING btree (id);

alter table "public"."post base" add constraint "public posts_pkey" PRIMARY KEY using index "public posts_pkey";

alter table "public"."post description" add constraint "private posts_pkey" PRIMARY KEY using index "private posts_pkey";

alter table "public"."post base" add constraint "public posts_id_key" UNIQUE using index "public posts_id_key";

alter table "public"."post description" add constraint "post description_post_id_fkey" FOREIGN KEY (post_id) REFERENCES "post base"(id) not valid;

alter table "public"."post description" validate constraint "post description_post_id_fkey";

alter table "public"."follow post" add constraint "follow post_post_id_fkey" FOREIGN KEY (post_id) REFERENCES "post base"(id) not valid;

alter table "public"."follow post" validate constraint "follow post_post_id_fkey";

create policy "Enable deletion for authenticated users only"
on "public"."post base"
as permissive
for delete
to public
using ((auth.uid() = user_id));


create policy "Enable insert for authenticated users only"
on "public"."post base"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."post base"
as permissive
for select
to authenticated
using (true);


create policy "Enable update for owners only"
on "public"."post base"
as permissive
for update
to public
using ((auth.uid() = user_id));


create policy "Enable deletion for authenticated users only"
on "public"."post description"
as permissive
for delete
to public
using ((auth.uid() = user_id));


create policy "Enable insert for authenticated users only"
on "public"."post description"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access to the owner only"
on "public"."post description"
as permissive
for select
to public
using ((auth.uid() = user_id));


create policy "Enable update for authenticated users only"
on "public"."post description"
as permissive
for update
to public
with check ((auth.uid() = user_id));


CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public."post base" FOR EACH ROW EXECUTE FUNCTION moddatetime();

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public."post description" FOR EACH ROW EXECUTE FUNCTION moddatetime();


