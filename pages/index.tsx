import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import HomePage from "../components/home";

const Home: NextPage = () => {
  return (
    <div className="mx-auto">
      <Head>
        <title>Health Align</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <main className="">
        <HomePage />
      </main>
    </div>
  );
};

export default Home;
