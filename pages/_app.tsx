import { ApolloProvider } from '@apollo/react-hooks';
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import withApolloClient from '../apollo/client';

function MyApp({
  Component,
  pageProps,
  apollo
}: AppProps | any) {
  return (
    <ApolloProvider client={apollo} >
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default withApolloClient(MyApp)
