import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <AnimatePresence mode="wait">
      <Component {...pageProps} />
    </AnimatePresence>
      <Analytics />
    </>
  );
}

export default MyApp;
