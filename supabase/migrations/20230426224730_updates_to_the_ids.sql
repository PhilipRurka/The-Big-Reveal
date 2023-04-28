alter table "public"."post_base" alter column "id" set default uuid_generate_v4();

alter table "public"."post_description" alter column "id" set default uuid_generate_v4();

CREATE UNIQUE INDEX post_base_id_key ON public.post_base USING btree (id);

CREATE UNIQUE INDEX post_description_id_key ON public.post_description USING btree (id);

CREATE UNIQUE INDEX profiles_id_key ON public.profiles USING btree (id);

alter table "public"."post_base" add constraint "post_base_id_key" UNIQUE using index "post_base_id_key";

alter table "public"."post_description" add constraint "post_description_id_key" UNIQUE using index "post_description_id_key";

alter table "public"."profiles" add constraint "profiles_id_key" UNIQUE using index "profiles_id_key";


