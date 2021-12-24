import * as React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import useSocket from "../_helpers/useSocket";

function MyApp({ Component, pageProps }: AppProps) {
  const socket = useSocket()

  return <Component {...pageProps} />;
}

export default MyApp;
