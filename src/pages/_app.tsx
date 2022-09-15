import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import { store } from "@/src/redux/store";

import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
