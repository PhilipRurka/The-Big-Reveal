import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import type { AppProps } from "next/app";
import { useState } from "react";
import { Provider } from 'react-redux';
import Head from "../src/components/head";
import Header from "../src/components/header";
import { store } from '../src/redux/redux_store';
import { FontStyles, LayoutStyles, Main } from "../src/styled";
import { ResetStyles } from "../src/styled/base-styled";
import InitGetSession from '../src/utils/InitGetSession';
import Toaster from '../src/components/toaster';

function MyApp({
  Component,
  pageProps
}: AppProps<{
  initialSession: Session
}>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  return (
    <Provider store={store}>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession} >
        <ResetStyles />
        <FontStyles />
        <InitGetSession />
        <Head />
        <Header />
          <Main>
            <Toaster />
            <Component {...pageProps} />
          </Main>
      </SessionContextProvider>
    </Provider>
  )
}

export default MyApp;