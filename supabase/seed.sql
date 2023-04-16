-- To create a new person, you will need to do the following
-- 1. Create an account on local development while using the "supabase" email domain and password "Def22333!"
-- 2. Navigate to the table page --> http://localhost:54323/project/default/editor
-- 3. Select the auth schema
-- 4. Select the users table
-- 5. Copy paste a previously built block of sql code to create a new user
-- 6. Replace the id value from what was generated in the account creation
-- 7. Replace the encrypted_password value from what was generated in the account creation
-- 8. Don't forget to change the username and full_name information

-- Creating user --> Person1
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at)
  VALUES 
    ('00000000-0000-0000-0000-000000000000', '5899f99d-a449-4bfa-8769-19c097aaf1f5', 'authenticated', 'authenticated', 'person1@supabase.com', '$2a$10$SPevSn.86XsiXCOaid2NFurY4ao3yqhwgnPhLipaH8sBngjI5k6BW', '2022-10-04 03:41:27.39308+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2022-10-04 03:41:27.391146+00', '2022-10-04 03:41:27.39308+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL);

INSERT INTO auth.identities (id,user_id,identity_data,provider,last_sign_in_at,created_at,updated_at)
  VALUES 
    ('5899f99d-a449-4bfa-8769-19c097aaf1f5', '5899f99d-a449-4bfa-8769-19c097aaf1f5'::uuid, '{"sub": "5899f99d-a449-4bfa-8769-19c097aaf1f5"}', 'email', '2022-10-04 04:45:00.000+00', '2022-10-04 03:41:27.391146+00', '2022-10-04 03:41:27.39308+00');

UPDATE public.profiles
  SET updated_at = '2023-04-16 14:17:52.23905+00', username = 'Person1', full_name = 'John Doh'
  WHERE id = '5899f99d-a449-4bfa-8769-19c097aaf1f5'
-- Completed user --> Person1

-- Creating user --> Person2
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at)
  VALUES 
    ('00000000-0000-0000-0000-000000000000', '3b5c0f35-3e6d-4203-beb8-765659194b4a', 'authenticated', 'authenticated', 'person1@supabase.com', '$2a$10$JEbh7TcbT.7UQ9RSP26Nl.72JcKMRtUyYzdiAxKQOl8D415I2.qAW', '2022-10-04 03:41:27.39308+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2022-10-04 03:41:27.391146+00', '2022-10-04 03:41:27.39308+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL);

INSERT INTO auth.identities (id,user_id,identity_data,provider,last_sign_in_at,created_at,updated_at)
  VALUES 
    ('3b5c0f35-3e6d-4203-beb8-765659194b4a', '3b5c0f35-3e6d-4203-beb8-765659194b4a'::uuid, '{"sub": "3b5c0f35-3e6d-4203-beb8-765659194b4a"}', 'email', '2022-10-04 04:45:00.000+00', '2022-10-04 03:41:27.391146+00', '2022-10-04 03:41:27.39308+00');

UPDATE public.profiles
  SET updated_at = '2023-04-16 14:17:52.23905+00', username = 'Person2', full_name = 'Tracy Jones'
  WHERE id = '3b5c0f35-3e6d-4203-beb8-765659194b4a'
-- Completed user --> Person2
