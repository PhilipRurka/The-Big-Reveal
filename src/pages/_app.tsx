import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import type { AppProps } from "next/app";
import { useState } from "react";
import { Provider } from 'react-redux';
import Head from "../components/head";
import Header from "../components/header";
import { store } from '../redux/redux_store';
import { Main } from "../styled";
import { ResetStyles } from "../styled/base-styled";
import Toaster from '../components/toaster';
import {
  noto,
  roboto
} from '../styled/typography-styled'

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
        <div className={`${noto.variable} ${roboto.variable}`}>
          <ResetStyles />
          <Head />
          <Header />
          <Main>
            <Toaster />
            <Component {...pageProps} />
          </Main>
        </div>
      </SessionContextProvider>
    </Provider>
  )
}

export default MyApp;