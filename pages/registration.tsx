import { FC } from "react"
import RegistrationContainer from "../src/components/registration"
// import { initialConsole } from "./api/initial-console"

const RegistrationPage: FC = () => <RegistrationContainer />

export default RegistrationPage

export const getStaticProps = () => {
  // initialConsole('Registration')

  return {
    props: {},
 };
}