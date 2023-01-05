import { FC } from "react"
import ResetPasswordContainer from "../src/components/resetPassword/ResetPassword.container";
import { initialConsole } from "./api/initial-console"

export const getStaticProps = () => {
  initialConsole('Reset Password')

  return {
    props: {},
 };
}

const ResetPasswordPage: FC = () => <ResetPasswordContainer />

export default ResetPasswordPage