import { initialConsole } from "./api/initial-console";

const Login = () => {
  return (
    <h1>LOGIN PAGE</h1>
  );
}

export const getStaticProps = () => {
  initialConsole('Login')

  return {
    props: {}
  }
}

export default Login