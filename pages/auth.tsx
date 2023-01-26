import { FC } from "react"
import AuthContainer from "../src/components/auth/Auth.container";
import { initialConsole } from "./api/initial-console"

export const getStaticProps = () => {
  // initialConsole('auth')

  return {
    props: {},
 };
}

const AuthPage: FC = () => <AuthContainer />

export default AuthPage