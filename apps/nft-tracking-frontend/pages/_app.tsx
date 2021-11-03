import { AppProps } from 'next/app';
import { useReducer } from 'react';
import Amplify from 'aws-amplify';

import Page from '../components/Page';

import { Context } from '../context';
import amplifyConfig from '../amplify-config';

import './styles.css';
import { AppContextState, appContextReducer } from '../context';

Amplify.configure(amplifyConfig);

function CustomApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(appContextReducer, {
    auth: null,
    addresses: [],
  } as AppContextState);

  return (
    <Page>
      <Context.Provider value={{ state, dispatch }}>
        <Component {...pageProps} />
      </Context.Provider>
    </Page>
  );
}

export default CustomApp;
