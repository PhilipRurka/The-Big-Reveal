alter table "public"."post_base" add column "profile_path" text;

alter table "public"."post_base" add constraint "post_base_profile_path_fkey" FOREIGN KEY (profile_path) REFERENCES profiles(path) not valid;

alter table "public"."post_base" validate constraint "post_base_profile_path_fkey";


