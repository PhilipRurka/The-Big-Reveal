import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { FC } from "react";
import client from "../apollo-client";
import Head from "../src/components/head";
import Header from "../src/components/header";
import { FontStyles } from "../src/styled";
import { Reset } from "../src/styled/base";
import type { CountriesType } from "./index"

type ComponentProps = CountriesType

const MyApp: FC<AppProps<ComponentProps>> = ({
  Component,
  pageProps
}) => (
  <ApolloProvider client={client}>
    <Reset />
    <FontStyles />
    <Head />
    <Header />
    <Component {...pageProps} />
  </ApolloProvider>
)

export default MyApp;