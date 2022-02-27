import '../styles/normalize.css';
import '../styles/globals.css';
import 'antd/dist/antd.min.css';

import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { MainLayout } from '../layouts/main/MainLayout';
import { store } from '../store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Provider>
  );
}

export default MyApp;
