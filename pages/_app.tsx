import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import type { AppProps } from "next/app";
import { FC, useState } from "react";
import { Provider } from 'react-redux';
// import Head from "../src/components/head";
import Header from "../src/components/header";
import { ContextProvider } from "../src/context";
import { store } from '../src/redux/redux_store';
import { FontStyles, LayoutStyles } from "../src/styled";
import { ResetStyles } from "../src/styled/base";

type ComponentProps = any

const MyApp: FC<AppProps<ComponentProps>> = ({
  Component,
  pageProps
}: AppProps<{
  initialSession: Session
}>) => {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  return (
    <Provider store={store}>
      <ContextProvider>
        <SessionContextProvider
          supabaseClient={supabaseClient}
          initialSession={pageProps.initialSession} >
          <ResetStyles />
          <FontStyles />
          <LayoutStyles />
          {/* <Head /> */}
          <Header />
            <main>
              <Component {...pageProps} />
            </main>
        </SessionContextProvider>
      </ContextProvider>
    </Provider>
  )
}

export default MyApp;