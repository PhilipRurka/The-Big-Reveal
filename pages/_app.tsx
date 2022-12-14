
import { UserProvider } from "@auth0/nextjs-auth0";
import type { AppProps } from "next/app";
import { FC } from "react";
// import Head from "../src/components/head";
import Header from "../src/components/header";
import { ContextProvider } from "../src/context";
import { FontStyles, LayoutStyles } from "../src/styled";
import { ResetStyles } from "../src/styled/base";

type ComponentProps = any

const MyApp: FC<AppProps<ComponentProps>> = ({
  Component,
  pageProps
}) => (
  <ContextProvider>
    <UserProvider>
      <ResetStyles />
      <FontStyles />
      <LayoutStyles />
      {/* <Head /> */}
      <Header />
      <Component {...pageProps} />
    </UserProvider>
  </ContextProvider>
)

export default MyApp;