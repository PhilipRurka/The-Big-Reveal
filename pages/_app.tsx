import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { FC } from "react";
import client from "../apollo-client";
import Head from "../src/components/head";
import Header from "../src/components/header";
import { FontStyles, LayoutStyles } from "../src/styled";
import { ResetStyles } from "../src/styled/base";
import type { CountriesType } from "./index"

type ComponentProps = CountriesType

const MyApp: FC<AppProps<ComponentProps>> = ({
  Component,
  pageProps
}) => (
  <ApolloProvider client={client}>
    <ResetStyles />
    <FontStyles />
    <LayoutStyles />
    <Head />
    <Header />
    <Component {...pageProps} />
  </ApolloProvider>
)

export default MyApp;