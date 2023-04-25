alter table "public"."profiles" drop constraint "username_length";

alter table "public"."profiles" add constraint "username_formating" CHECK ((username ~* '^[0-9A-Za-z\s\_]+$'::text)) not valid;

alter table "public"."profiles" validate constraint "username_formating";

alter table "public"."profiles" add constraint "username_length" CHECK (((char_length(username) >= 3) AND (char_length(username) < 100))) not valid;

alter table "public"."profiles" validate constraint "username_length";


