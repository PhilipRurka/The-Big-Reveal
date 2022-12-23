import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { FC } from 'react';
import { initialConsole } from './api/initial-console';
import Account from '../src/components/Account';

const Home: FC = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <main>
      <h1>Homepage</h1>
      <div className="container" style={{ padding: '50px 0 100px 0' }}>
        {!session ? (
          <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
        ) : (
          <Account session={session} />
        )}
      </div>
    </main>
  )
}

export const getStaticProps = () => {
  initialConsole('Home')

  return {
    props: {},
 };
}


export default Home;