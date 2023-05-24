alter table "public"."post_base" add constraint "base_title_non_empty" CHECK ((char_length(post_title) > 0)) not valid;

alter table "public"."post_base" validate constraint "base_title_non_empty";