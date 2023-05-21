import type { AppProps } from "next/app";
import "../styles/globals.css";
import { AnimatePresence } from "framer-motion";
import client from "./api/client";
import { ApolloProvider } from "@apollo/client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AnimatePresence mode="wait">
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </AnimatePresence>
  );
}

export default MyApp;
