import { AppProps } from 'next/app';
import { useReducer } from 'react';
import { DAppProvider } from '@usedapp/core';

import Page from '../components/Page';

import { Context } from '../context';

import './styles.css';
import { AppContextState, appContextReducer } from '../context';

function CustomApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(appContextReducer, {
    auth: null,
    addresses: [],
    events: [],
  } as AppContextState);

  return (
    <Page>
      <DAppProvider config={{}}>
        <Context.Provider value={{ state, dispatch }}>
          <Component {...pageProps} />
        </Context.Provider>
      </DAppProvider>
    </Page>
  );
}

export default CustomApp;
