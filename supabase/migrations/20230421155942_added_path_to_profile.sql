alter table "public"."profiles" add column "path" text not null;

CREATE UNIQUE INDEX profiles_path_key ON public.profiles USING btree (path);

alter table "public"."profiles" add constraint "profiles_path_key" UNIQUE using index "profiles_path_key";


