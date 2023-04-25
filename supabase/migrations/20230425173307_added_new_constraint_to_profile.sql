alter table "public"."profiles" add constraint "full_name_formating" CHECK ((full_name ~* '^[A-Za-z\s]*$'::text)) not valid;

alter table "public"."profiles" validate constraint "full_name_formating";

alter table "public"."profiles" add constraint "full_name_length" CHECK ((char_length(full_name) < 100)) not valid;

alter table "public"."profiles" validate constraint "full_name_length";


