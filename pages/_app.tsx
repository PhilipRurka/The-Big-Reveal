import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import type { AppProps } from "next/app";
import { useState } from "react";
import { Provider } from 'react-redux';
// import Head from "../src/components/head";
import Header from "../src/components/header";
import { store } from '../src/redux/redux_store';
import { FontStyles, LayoutStyles } from "../src/styled";
import { ResetStyles } from "../src/styled/base-styled";
import InitGetSession from '../src/utils/InitGetSession';

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
        <LayoutStyles />
        <InitGetSession />
        {/* <Head /> */}
        <Header />
          <main>
            <Component {...pageProps} />
          </main>
      </SessionContextProvider>
    </Provider>
  )
}

export default MyApp;