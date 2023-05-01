alter table "public"."post_base" alter column "id" drop default;

CREATE UNIQUE INDEX post_description_post_id_key ON public.post_description USING btree (post_id);

alter table "public"."post_base" add constraint "post_base_id_fkey" FOREIGN KEY (id) REFERENCES post_description(post_id) not valid;

alter table "public"."post_base" validate constraint "post_base_id_fkey";

alter table "public"."post_description" add constraint "post_description_post_id_key" UNIQUE using index "post_description_post_id_key";


