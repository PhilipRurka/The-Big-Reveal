import { FC } from "react"
import LoginContainer from "../src/components/login/Login.container"

const LoginPage: FC = () => <LoginContainer />

export default LoginPage

// {!!session ? null : (
//   <Auth
//     supabaseClient={supabase}
//     appearance={{ theme: ThemeSupa }}
//     theme="dark" />
// )}