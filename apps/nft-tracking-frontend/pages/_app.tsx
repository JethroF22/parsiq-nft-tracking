import { AppProps } from 'next/app';

import Page from '../components/Page';

import { Context } from '../context';

import './styles.css';

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
