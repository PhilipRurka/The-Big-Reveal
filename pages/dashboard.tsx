import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { initialConsole } from "./api/initial-console";

const Dashboard = () => {
  return (
    <main>
      <h1>Dashboard</h1>
    </main>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    initialConsole('Login')
    const session = getSession(ctx.req, ctx.res);
    console.log(session)
    return {
      props: {

      }
    };
  }
});

export default Dashboard