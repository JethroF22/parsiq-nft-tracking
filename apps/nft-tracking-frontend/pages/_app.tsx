import { AppProps } from 'next/app';
import Amplify from 'aws-amplify';

import Page from '../components/Page';

import { Context } from '../context';
import amplifyConfig from '../amplify-config';

import './styles.css';

Amplify.configure(amplifyConfig);

function CustomApp({ Component, pageProps }: AppProps) {
  const state: any = {};
  return (
    <Page>
      <Context.Provider value={state}>
        <Component {...pageProps} />
      </Context.Provider>
    </Page>
  );
}

export default CustomApp;
