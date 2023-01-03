import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useSession } from '@supabase/auth-helpers-react';
import Account from '../src/components/Account';
import { initialConsole } from "./api/initial-console";

type DashboardType = {
  todos: any;
  user: any;
}

const Dashboard = ({
  user,
  todos
}: DashboardType) => {
  const session = useSession()
  
  return (
    <>
      {!session ? null : (
        <main>
          <h1>Dashboard</h1>
          {user.name && (
            <h2>Welcome {user.name}</h2>
          )}
          <Account session={session} />
          <ul>
            {todos.map(({
              content
            }: any) => (
              <li key={content}>
                <p>{content}</p>
              </li>
            ))}
          </ul>
        </main>
      )}
    </>
  );
}

export const getServerSideProps = async (context: any
  ) => {
  initialConsole('Dashboard')

  const supabase = createServerSupabaseClient(context)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if(!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  }
};

export default Dashboard