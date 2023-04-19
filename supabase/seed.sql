-- To create a new person, you will need to do the following
-- 1. Create an account on local development while using the "supabase" email domain and password "Def22333!"
-- 2. Navigate to the table page --> http://localhost:54323/project/default/editor
-- 3. Select the auth schema
-- 4. Select the users table
-- 5. Copy paste a previously built block of sql code to create a new user
-- 6. Replace the id value from what was generated in the account creation
-- 7. Replace the encrypted_password value from what was generated in the account creation
-- 8. Don't forget to change the username and full_name information

/* #region Creating Accounts */
-- Creating user --> Person1
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at)
  VALUES 
    ('00000000-0000-0000-0000-000000000000', '5899f99d-a449-4bfa-8769-19c097aaf1f5', 'authenticated', 'authenticated', 'person1@supabase.com', '$2a$10$SPevSn.86XsiXCOaid2NFurY4ao3yqhwgnPhLipaH8sBngjI5k6BW', '2022-10-04 03:41:27.39308+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2022-10-04 03:41:27.391146+00', '2022-10-04 03:41:27.39308+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL);

INSERT INTO auth.identities (id,user_id,identity_data,provider,last_sign_in_at,created_at,updated_at)
  VALUES 
    ('5899f99d-a449-4bfa-8769-19c097aaf1f5', '5899f99d-a449-4bfa-8769-19c097aaf1f5'::uuid, '{"sub": "5899f99d-a449-4bfa-8769-19c097aaf1f5"}', 'email', '2022-10-04 04:45:00.000+00', '2022-10-04 03:41:27.391146+00', '2022-10-04 03:41:27.39308+00');

UPDATE public.profiles
  SET updated_at = '2023-04-16 14:17:52.23905+00', username = 'Person1', full_name = 'John Doh'
  WHERE id = '5899f99d-a449-4bfa-8769-19c097aaf1f5';
-- Completed user --> Person1

-- Creating user --> Person2
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at)
  VALUES 
    ('00000000-0000-0000-0000-000000000000', 'b412af1c-4595-4e02-9b4e-755a56c43a0a', 'authenticated', 'authenticated', 'person2@supabase.com', '$2a$10$.U2AdItwGYRRvIGB6fs3F.U99K.5OPmBS8JX/nmUlt7TcFPIWt6c.', '2022-10-04 03:41:27.39308+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2022-10-04 03:41:27.391146+00', '2022-10-04 03:41:27.39308+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL);

INSERT INTO auth.identities (id,user_id,identity_data,provider,last_sign_in_at,created_at,updated_at)
  VALUES 
    ('b412af1c-4595-4e02-9b4e-755a56c43a0a', 'b412af1c-4595-4e02-9b4e-755a56c43a0a'::uuid, '{"sub": "b412af1c-4595-4e02-9b4e-755a56c43a0a"}', 'email', '2022-10-04 04:45:00.000+00', '2022-10-04 03:41:27.391146+00', '2022-10-04 03:41:27.39308+00');

UPDATE public.profiles
  SET updated_at = '2023-04-16 14:17:52.23905+00', username = 'Person2', full_name = 'Tracy Jones'
  WHERE id = 'b412af1c-4595-4e02-9b4e-755a56c43a0a';
-- Completed user --> Person2
/* #endregion */


INSERT INTO public.post_base (id, user_id, post_content, is_published, created_at, post_title, tags, updated_at, enable_reveal_date, enable_reveal, written_at, allow_published_at)
  VALUES ('4e9fce00-5b39-41b1-b164-902c95928580', '5899f99d-a449-4bfa-8769-19c097aaf1f5', '<h1 dir="ltr">The Girl Of My Dreams</h1><p dir="ltr">I have a secret to tell you about myself<br>Like clockwork, rhythm of nature repeats itself<br>An audience, emitting distant candlelight<br>Routinely without fail, surrounds the bright spotlight<br>This is my queue, the moment she leaves my eyesight<br>Nearby, I travel a great distance, I take flight<br>It''s not something I wish upon, it&rsquo;s not my goal<br>I promise you I have little to no control</p><p dir="ltr">One moment, there she is, held tightly in my arms<br>Her eyes, precious stones locked away, beautiful charms<br>As though they''re taking a break from the daily show<br>Shooting past the vast as they descended below<br>Her breath, a summer wind passing through narrow trees<br>Caressing everywhere they go with expertise<br>Her calming touch, although silent, capable of<br>Spouting three words, conveying the language of love</p><p dir="ltr">And the next, I have someone else in my embrace<br>Like the other, her beating heart rhythms with grace<br>Illusionary warmth emanating within<br>Her nature alone is proof, a night without sin<br>Guilt free, I listen to my heart, body and soul<br>Her dreamy fantasy being, makes me feel whole<br>I feel love and lust for her, like a queen for kings<br>You would too if you saw her grow angelic wings</p><p dir="ltr">Although they seem similar to one another<br>Believe me, they are far from the same being, rather<br>The one is independent, she is here to stay<br>While the other lives with me on a day-to-day<br>Today is one of those days, not a flaw in sight<br>A world made for us to share, this time it&rsquo;s midnight<br>Yesterday we were snuggled up to a campfire<br>Today, we&rsquo;re on the moon, sharing our one desire</p><p dir="ltr">When the world is at its calmest, a bridge is made<br>From which I am happy to traverse unafraid<br>Only myself can travel past this endless sea<br>Between two distinct fabrics of reality<br>Listen carefully, don&rsquo;t get the wrong impression<br>The second, literal, the first, an expression<br>The one, emerges at last, the girl of my dreams<br>As the girl in my dreams fade out beyond the seams</p>', true, '2023-04-11 14:26:27+00', 'The Girl Of My Dreams', NULL, NULL, NULL, NULL, NULL, NULL)