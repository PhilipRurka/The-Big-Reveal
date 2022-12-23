import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { initialConsole } from "./api/initial-console";
import { FC } from "react";

type DashboardType = {
  todos: any;
  user: any;
}

const Dashboard = ({
  user,
  todos
}: DashboardType) => {

  console.log(todos)
  
return (
    <main>
      <h1>Dashboard</h1>
      {user.name && (
        <h2>Welcome {user.name}</h2>
      )}
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
  );
}

export const getServerSideProps = async (context: any
  ) => {
    initialConsole('Login')

  const supabase = createServerSupabaseClient(context)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  }
};

export default Dashboard