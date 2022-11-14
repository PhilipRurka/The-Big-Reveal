import { initialConsole } from "./api/initial-console";

const Login = () => {
  return (
    <main>
      <h1>LOGIN PAGE</h1>
    </main>
  );
}

export const getStaticProps = () => {
  initialConsole('Login')

  return {
    props: {}
  }
}

export default Login