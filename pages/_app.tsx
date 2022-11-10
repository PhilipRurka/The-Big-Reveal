import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import client from "../apollo-client";
import Head from "../src/components/head";
import Header from "../src/components/header";
import type { CountriesType } from "./index"

type ComponentProps = CountriesType

const MyApp = ({ Component, pageProps }: AppProps<ComponentProps>) => (
  <ApolloProvider client={client}>
    <Head />
    <Header />
    <Component {...pageProps} />
  </ApolloProvider>
)

export default MyApp;