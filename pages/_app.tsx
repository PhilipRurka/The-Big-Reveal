import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { FC } from "react";
import client from "../apollo-client";
import Head from "../src/components/head";
import Header from "../src/components/header";
import type { CountriesType } from "./index"

type ComponentProps = CountriesType

const MyApp: FC<AppProps<ComponentProps>> = ({
  Component,
  pageProps
}) => (
  <ApolloProvider client={client}>
    <Head />
    <Header componentName={Component.name} />
    <Component {...pageProps} />
  </ApolloProvider>
)

export default MyApp;