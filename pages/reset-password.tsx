import { FC } from "react"
import ResetPassword from "../src/components/resetPassword/ResetPassword.container";

export const getStaticProps = () => {

  return {
    props: {},
 };
}

const ResetPasswordPage: FC = () => <ResetPassword />

export default ResetPasswordPage