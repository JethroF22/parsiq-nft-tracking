import { AppProps } from 'next/app';
import Page from '../components/Page';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}

export default CustomApp;
