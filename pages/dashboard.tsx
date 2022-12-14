import { getSupabase } from "../src/utils/supabase";
import { getSession, useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { initialConsole } from "./api/initial-console";
import { FC } from "react";

type DashboardType = {
  todos: any
}

const Dashboard = ({
  todos
}: DashboardType) => {
  const {
    isLoading,
    error,
    user
  } = useUser()

  console.log(todos)

  if(isLoading) { <div>... Is loading</div> }
  else if(error) { console.error(error); return <></> }
  else if(user) {
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

}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({
    req,
    res
  }) {
  // async getServerSideProps(context) {
    initialConsole('Login')

    const { user }: any = await getSession(req, res);

    // const session = getSession(context.req, context.res);
    const supabase = getSupabase(user.accessToken);

    const {
      data: todos
    } = await supabase.from("todo").select("*");

    console.log(todos)


    // console.log(session)
    return {
      props: {
        // user,
        todos
      }
    };
  }
});

export default Dashboard