import { getSession, useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { initialConsole } from "./api/initial-console";

const Dashboard = () => {
  const {
    isLoading,
    error,
    user
  } = useUser()

  if(isLoading) { <div>... Is loading</div> }
  else if(error) { console.error(error); return <></> }
  else if(user) {
    return (
      <main>
        <h1>Dashboard</h1>
      </main>
    );
  }

}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    initialConsole('Login')

    const session = getSession(context.req, context.res);
    console.log(session)
    return {
      props: {

      }
    };
  }
});

export default Dashboard