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

alter table "public"."follow post" drop constraint "follow post_post_id_fkey";

alter table "public"."follow post" drop constraint "follow post_user_id_fkey";

alter table "public"."private posts" drop constraint "private posts_post_id_fkey";

alter table "public"."public posts" drop constraint "public posts_id_key";

alter table "public"."follow post" drop constraint "follow post_pkey";

alter table "public"."private posts" drop constraint "private posts_pkey";

alter table "public"."public posts" drop constraint "public posts_pkey";

drop index if exists "public"."follow post_pkey";

drop index if exists "public"."private posts_pkey";

drop index if exists "public"."public posts_id_key";

drop index if exists "public"."public posts_pkey";

drop table "public"."follow post";

drop table "public"."private posts";

drop table "public"."public posts";


