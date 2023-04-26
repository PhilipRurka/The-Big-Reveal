alter table "public"."post_base" alter column "user_id" drop default;

alter table "public"."post_base" add constraint "post_base_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) not valid;

alter table "public"."post_base" validate constraint "post_base_user_id_fkey";

alter table "public"."post_base" add constraint "post_content_length" CHECK ((char_length(post_content) < 10000)) not valid;

alter table "public"."post_base" validate constraint "post_content_length";

alter table "public"."post_description" add constraint "post_content_length" CHECK ((char_length(post_content) < 10000)) not valid;

alter table "public"."post_description" validate constraint "post_content_length";


