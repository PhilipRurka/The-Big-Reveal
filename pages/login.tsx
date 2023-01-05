import { FC } from "react"
import LoginContainer from "../src/components/login"
import { initialConsole } from "./api/initial-console"

export const getStaticProps = () => {
  initialConsole('Login')

  return {
    props: {},
 };
}

const LoginPage: FC = () => <LoginContainer />

export default LoginPage