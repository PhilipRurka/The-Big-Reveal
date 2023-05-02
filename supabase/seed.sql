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
  SET updated_at = '2023-04-16 14:17:52.23905+00', username = 'Person1', full_name = 'John Doh', path = 'person1'
  WHERE profile_id = '5899f99d-a449-4bfa-8769-19c097aaf1f5';
-- Completed user --> Person1

-- Creating user --> Person2
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at)
  VALUES 
    ('00000000-0000-0000-0000-000000000000', 'b412af1c-4595-4e02-9b4e-755a56c43a0a', 'authenticated', 'authenticated', 'person2@supabase.com', '$2a$10$.U2AdItwGYRRvIGB6fs3F.U99K.5OPmBS8JX/nmUlt7TcFPIWt6c.', '2022-10-04 03:41:27.39308+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2022-10-04 03:41:27.391146+00', '2022-10-04 03:41:27.39308+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL);

INSERT INTO auth.identities (id,user_id,identity_data,provider,last_sign_in_at,created_at,updated_at)
  VALUES 
    ('b412af1c-4595-4e02-9b4e-755a56c43a0a', 'b412af1c-4595-4e02-9b4e-755a56c43a0a'::uuid, '{"sub": "b412af1c-4595-4e02-9b4e-755a56c43a0a"}', 'email', '2022-10-04 04:45:00.000+00', '2022-10-04 03:41:27.391146+00', '2022-10-04 03:41:27.39308+00');

UPDATE public.profiles
  SET updated_at = '2023-04-16 14:17:52.23905+00', username = 'Person2', full_name = 'Tracy Jones', path = 'person2'
  WHERE profile_id = 'b412af1c-4595-4e02-9b4e-755a56c43a0a';
-- Completed user --> Person2
/* #endregion */


/* #region Person1 Post 1 */
INSERT INTO public.post_base (
  base_id,
  user_id,
  is_published,
  enable_reveal,
  tags,
  created_at,
  updated_at,
  enable_reveal_date,
  written_at,
  allow_published_at,
  post_title,
  base_content
) VALUES (
  '4e9fce00-5b39-41b1-b164-902c95928580',
  '5899f99d-a449-4bfa-8769-19c097aaf1f5',
  true,
  true,
  '',
  '2023-04-11 14:26:27+00',
  '2023-04-11 14:26:27+00',
  '2023-04-11 14:26:27+00',
  '2023-04-11 14:26:27+00',
  '2023-04-11 14:26:27+00',
  'The&nbsp;Girl Of My Dreams',
  '<h1 dir="ltr">The Girl Of My Dreams</h1><p dir="ltr">I have a secret to tell you about myself<br>Like clockwork, rhythm of nature repeats itself<br>An audience, emitting distant candlelight<br>Routinely without fail, surrounds the bright spotlight<br>This is my queue, the moment she leaves my eyesight<br>Nearby, I travel a great distance, I take flight<br>It''s not something I wish upon, it&rsquo;s not my goal<br>I promise you I have little to no control</p><p dir="ltr">One moment, there she is, held tightly in my arms<br>Her eyes, precious stones locked away, beautiful charms<br>As though they''re taking a break from the daily show<br>Shooting past the vast as they descended below<br>Her breath, a summer wind passing through narrow trees<br>Caressing everywhere they go with expertise<br>Her calming touch, although silent, capable of<br>Spouting three words, conveying the language of love</p><p dir="ltr">And the next, I have someone else in my embrace<br>Like the other, her beating heart rhythms with grace<br>Illusionary warmth emanating within<br>Her nature alone is proof, a night without sin<br>Guilt free, I listen to my heart, body and soul<br>Her dreamy fantasy being, makes me feel whole<br>I feel love and lust for her, like a queen for kings<br>You would too if you saw her grow angelic wings</p><p dir="ltr">Although they seem similar to one another<br>Believe me, they are far from the same being, rather<br>The one is independent, she is here to stay<br>While the other lives with me on a day-to-day<br>Today is one of those days, not a flaw in sight<br>A world made for us to share, this time it&rsquo;s midnight<br>Yesterday we were snuggled up to a campfire<br>Today, we&rsquo;re on the moon, sharing our one desire</p><p dir="ltr">When the world is at its calmest, a bridge is made<br>From which I am happy to traverse unafraid<br>Only myself can travel past this endless sea<br>Between two distinct fabrics of reality<br>Listen carefully, don&rsquo;t get the wrong impression<br>The second, literal, the first, an expression<br>The one, emerges at last, the girl of my dreams<br>As the girl in my dreams fade out beyond the seams</p>'
);

INSERT INTO public.post_description (
  description_id,
  post_id,
  user_id,
  description_content
) VALUES (
  'aa55c5ec-aee3-4324-957b-dc92c6906aa6',
  '4e9fce00-5b39-41b1-b164-902c95928580',
  '5899f99d-a449-4bfa-8769-19c097aaf1f5',
  '<p dir="ltr"><span style="color: rgb(241, 196, 15);">Part 1</span></p> <ul style="list-style-type: circle;"> <li dir="ltr" aria-level="1"> <p dir="ltr" role="presentation">&ldquo;<span style="color: rgb(53, 152, 219);">I have a secret to tell you about myself</span>&rdquo; I wanted to make it sound like I was doing something wrong on the first line.</p> </li> <li dir="ltr" aria-level="1"> <p dir="ltr" role="presentation">&ldquo;<span style="color: rgb(53, 152, 219);">Like clockwork, rhythm of nature repeats itself</span>&rdquo; meaning a natural phenomena that repeats itself on a routine-like basis.</p> </li> <li dir="ltr" aria-level="1"> <p dir="ltr" role="presentation">This natural phenomena is mentioned in the next couple lines &ldquo;<span style="color: rgb(53, 152, 219);">An audience, emitting distant candlelight. Routinely without fail, surrounds the bright spotlight</span>&ldquo;. The audience are stars in the sky and the spotlight is the moon. Something to note is that I am describing the relationship between the two as an audience and a performance of sorts. This information is relevant later on.</p> </li> <li dir="ltr" aria-level="1"> <p dir="ltr" role="presentation">&ldquo;<span style="color: rgb(53, 152, 219);">This is my queue, the moment she leaves my eyesight</span>&rdquo; routinely at night (mentioned above), as soon as I don&rsquo;t see her anymore. &ldquo;<span style="color: rgb(53, 152, 219);">Nearby, I travel a great distance, I take flight</span>&rdquo; this line combined with the fact that it is night time and she routinely leaves my sight is referring to myself falling asleep. So the scenario is simple. Every night while I am laying in bed with this girl, I watch her disappear as I fall asleep and fly into the dream state. That is why I say &ldquo;<span style="color: rgb(53, 152, 219);">Nearby, I travel a great distance, I take flight</span>&rdquo;</p> </li> <li dir="ltr" aria-level="1"> <p dir="ltr" role="presentation">&ldquo;<span style="color: rgb(53, 152, 219);">It''s not something I wish upon, it&rsquo;s not my goal. I promise you I have little to no control</span>&rdquo; mutch like the first line, I wanted the reader to feel like I was admitting to doing something wrong. I wanted the reader to only know what the entire poem was about on the last two lines. This was a little misdirection.</p> </li> </ul> <p>&nbsp;</p> <p dir="ltr"><span style="color: rgb(241, 196, 15);">Part 2</span></p> <ul> <li dir="ltr" aria-level="1"> <p dir="ltr" role="presentation">Considering the beginning of this part and the next (<span style="color: rgb(241, 196, 15);">Part 3</span>) starts with &ldquo;<span style="color: rgb(53, 152, 219);">One moment,</span> &hellip;.&rdquo; - &ldquo;<span style="color: rgb(53, 152, 219);">And the next,</span> &hellip;&rdquo; means that these two sections are directly related to the scenario described above. Myself falling asleep while gazing upon a girl.</p> </li> </ul> <ul> <li dir="ltr" aria-level="1"> <p dir="ltr" role="presentation">In this section it&rsquo;s obvious, I am talking about a girl.</p> </li> <li dir="ltr" aria-level="1"> <p dir="ltr" role="presentation">&ldquo;<span style="color: rgb(53, 152, 219);">Her eyes, precious stones locked away, beautiful charms</span>&rdquo; meaning her eyes are like gemstones, beautiful enough to be encased in charms. &ldquo;<span style="color: rgb(53, 152, 219);">As though they''re taking a break from the daily show. Shooting past the vast as they descended below</span>&rdquo; I am making a reference to the stars and performance I mentioned above. Her eyes, by &rdquo;<span style="color: rgb(53, 152, 219);">taking a break from the daily show</span>&rdquo;, I am saying that they were part of the audience, hence, they are stars. &ldquo;<span style="color: rgb(53, 152, 219);">Shooting past the vast as they descended below</span>&rdquo; they are not just stars, they are shooting stars that descended from sky.</p> </li> <li dir="ltr" aria-level="1"> <p dir="ltr" role="presentation">&ldquo;<span style="color: rgb(53, 152, 219);">Her breath, a summer wind passing through narrow trees. Caressing everywhere they go with expertise</span>&rdquo; I can feel her breath on my skin and body hair. Signifying that we are cuddling.</p> </li> <li dir="ltr" aria-level="1"> <p dir="ltr" role="presentation">Possibly my favorite passage from this poem. &ldquo;<span style="color: rgb(53, 152, 219);">Her calming touch, although silent, capable of. Spouting three words, conveying the language of love</span>&rdquo; this is making a reference to one of the 5 love languages, physical touch. Which is my top love language, giving and receiving. The use of the word "<span style="color: rgb(53, 152, 219);">conveying</span>" was important for me as convey can be defined as such &ldquo;Make (an idea, impression, or feeling) known or understandable to someone&rdquo;. This is very different from simply communicating, as there can be a loss in translation. The use of the word &ldquo;<span style="color: rgb(53, 152, 219);">conveying</span>&rdquo; means that I received and understood the intended message, the three words, I love you. It is conveyed because it&rsquo;s my top love language.</p> </li> </ul> <p><strong><br><br></strong></p> <p dir="ltr"><span style="color: rgb(241, 196, 15);">Part 1</span></p> <p dir="ltr" style="padding-left: 40px;">I have a secret to tell you about myself<br>Like clockwork, rhythm of nature repeats itself<br>An audience, emitting distant candlelight<br>Routinely without fail, surrounds the bright spotlight<br>This is my queue, the moment she leaves my eyesight<br>Nearby, I travel a great distance, I take flight<br>It''s not something I wish upon, it&rsquo;s not my goal<br>I promise you I have little to no control</p> <p dir="ltr"><span style="color: rgb(241, 196, 15);">Part 2</span></p> <p dir="ltr" style="padding-left: 40px;">One moment, there she is, held tightly in my arms<br>Her eyes, precious stones locked away, beautiful charms<br>As though they&rsquo;re taking a break from the daily show<br>Shooting past the vast as they descended below<br>Her breath, a summer wind passing through narrow trees<br>Caressing everywhere they go with expertise<br>Her calming touch, although silent, capable of<br>Spouting three words, conveying the language of love</p> <p dir="ltr"><span style="color: rgb(241, 196, 15);">Part 3</span></p> <p dir="ltr" style="padding-left: 40px;">And the next, I have someone else in my embrace<br>Like the other, her beating heart rhythms with grace<br>Illusionary warmth emanating within<br>Her nature alone if proof, a night without sin<br>Guilt free, I listen to my heart, body and soul<br>Her dreamy fantiful being, makes me feel whole<br>I feel love and lust for her, like a queen for kings<br>You would too if you saw her grow angelic wings</p> <p dir="ltr"><span style="color: rgb(241, 196, 15);">Part 4</span></p> <p dir="ltr" style="padding-left: 40px;">Although they seem similar to one another<br>Believe me, they are far from the same being, rather<br>The one is independent, she is here to stay<br>While the other lives with me on a day-to-day<br>Today is one of those days, not a flaw in sight<br>A world made for us to share, this time it&rsquo;s midnight<br>Yesterday we were snuggled up to a campfire<br>Today, we&rsquo;re on the moon, sharing our one desire</p> <p dir="ltr"><span style="color: rgb(241, 196, 15);">Part 5</span></p> <p dir="ltr" style="text-align: left; padding-left: 40px;">When the world is at its calmest, a bridge is made<br>From which I am happy to traverse unafraid<br>Only myself can travel past this endless sea<br>Between two distinct fabrics of reality<br>Listen carefully, don&rsquo;t get the wrong impression<br>The second, literal, the first, an expression<br>The one, emerges at last, the girl of my dreams<br>As the girl in my dreams fade out beyond the seams</p>'
);
/* #endregion */


/* #region Person1 Post 2 */
INSERT INTO public.post_base (
  base_id,
  user_id,
  is_published,
  created_at,
  post_title,
  tags,
  updated_at,
  enable_reveal_date,
  enable_reveal,
  written_at,
  allow_published_at,
  base_content
) VALUES (
  'fc27e131-0b9a-4eae-a05d-27fc729de24e',
  '5899f99d-a449-4bfa-8769-19c097aaf1f5',
  true,
  '2023-04-21 14:21:57.74827+00',
  'Heading 1',
  '',
  '2023-04-11 14:26:27+00',
  '2023-04-11 14:26:27+00',
  true,
  '2023-04-11 14:26:27+00',
  '2023-04-11 14:26:27+00',
  '<h1 dir="ltr"><span style="color: rgb(0, 0, 0);">Heading 1</span></h1>
  <h2><span style="color: rgb(0, 0, 0);">Heading 2</span></h2>
  <h3><span style="color: rgb(0, 0, 0);">Heading 3</span></h3>
  <h4><span style="color: rgb(0, 0, 0);">Heading 4</span></h4>
  <h5><span style="color: rgb(0, 0, 0);">Heading 5</span></h5>
  <h6><span style="color: rgb(0, 0, 0);">Heading 6</span></h6>
  <pre><span style="color: rgb(0, 0, 0);">Preformatted<br></span></pre>
  <p><span style="color: rgb(0, 0, 0);"><strong>This is bold!<br></strong><em>This is italic!<br></em><span style="color: rgb(224, 62, 45);">This is red!</span></span></p>
  <p style="text-align: center;">This is aligned middle!<span style="color: rgb(0, 0, 0);"><span style="color: rgb(224, 62, 45);"><br></span></span></p>
  <p style="text-align: right;">This is aligned right!</p>
  <p style="text-align: justify;">This is aligned ... full width?</p>
  <ul>
  <li style="text-align: justify;">Bullet</li>
  <li style="text-align: justify;">Another</li>
  </ul>
  <ul style="list-style-type: circle;">
  <li>Circle</li>
  <li>Another</li>
  </ul>
  <ul style="list-style-type: square;">
  <li>Squares</li>
  <li>Another</li>
  </ul>
  <ol>
  <li>Number</li>
  <li>Another</li>
  </ol>
  <ol style="list-style-type: lower-alpha;">
  <li>Letters</li>
  <li>Another</li>
  </ol>
  <ol style="list-style-type: lower-greek;">
  <li>Greek Letters</li>
  <li>Another</li>
  </ol>
  <ol style="list-style-type: lower-roman;">
  <li>Index</li>
  <li>Another</li>
  </ol>
  <ol style="list-style-type: upper-alpha;">
  <li>Cap Letters</li>
  <li>Another</li>
  </ol>
  <ol style="list-style-type: upper-roman;">
  <li>Cap Index</li>
  <li>Another</li>
  </ol>
  <p>&nbsp;</p>
  <p>This is a normal block of text.</p>
  <p style="padding-left: 40px;">This bock is indented once</p>
  <p style="padding-left: 40px;">This bock is indented once</p>
  <p style="padding-left: 80px;">This bock is indented twice</p>
  <p style="padding-left: 80px;">This bock is indented twice</p>'
);

INSERT INTO public.post_description (
  description_id,
  post_id,
  user_id,
  description_content
)
VALUES (
  '3ee847b9-862e-44b1-ae7b-248ae6b36a32',
  'fc27e131-0b9a-4eae-a05d-27fc729de24e',
  '5899f99d-a449-4bfa-8769-19c097aaf1f5',
  ''
);
/* #endregion */