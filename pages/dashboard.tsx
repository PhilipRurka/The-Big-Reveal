import WithAuthRequired from '../src/hoc/withAuthRequired';
import { useAppSelector } from '../src/redux/redux_hooks';
import { selectUser } from '../src/redux/slices/userSlice';

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

export default WithAuthRequired(Dashboard)