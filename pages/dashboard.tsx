import type { GetServerSidePropsContext } from 'next';
import { useAppSelector } from '../src/redux/redux_hooks';
import { selectUser } from '../src/redux/slices/userSlice';
import { authRequired } from '../lib/authRequired';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const res = await authRequired(ctx)
  
  if(!res?.supabase || !res?.session) {
    return res
  }

  return {props: {}}
}

type DashboardType = {
  todos: any;
  user: any;
}

function Dashboard({
  user,
  todos
}: DashboardType) {

  const { session: userSession } = useAppSelector(selectUser)
  
  return (
    <main>
      <h1>Dashboard</h1>
      {userSession && (
        <h2>Welcome {userSession.user.email}</h2>
      )}
      <ul>
        {todos?.map(({
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

export default Dashboard