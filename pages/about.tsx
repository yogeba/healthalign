// pages/about.tsx

import type { NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";

const About: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>About - Health Align</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>

      {/* <Header /> */}

      <main className="flex flex-col items-center justify-center flex-1 w-full px-4 mt-12 sm:mt-10">
        <Image
          src="/about.jpg"
          alt="About Health Align"
          width={1920}
          height={1200}
        ></Image>

        <motion.h1
          className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900 mb-8"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          About Health Align
        </motion.h1>

        <div className="w-full max-w-3xl text-center">
          <p className="mb-6 text-slate-500">
            Health Align is a platform dedicated to helping you discover your
            optimal health needs through plant-based nature's secrets. Our goal
            is to provide personalized health recommendations based on your
            unique conditions, goals, or desired outcomes.
          </p>

          <p className="mb-6 text-slate-500">
            We believe that nature has the power to heal, and our mission is to
            uncover the most effective plant-based supplements, treatments, and
            lifestyle changes that can help you live a healthier, happier life.
          </p>

          <p className="mb-6 text-slate-500">
            Our team of health experts, researchers, and developers work
            tirelessly to provide you with accurate, up-to-date, and
            evidence-based health information. We're constantly exploring the
            latest research, trends, and breakthroughs in natural medicine to
            ensure that you have access to the best possible health advice.
          </p>

          <p className="text-slate-500">
            Thank you for choosing Health Align to be your trusted source for
            plant-based health solutions. We look forward to helping you on your
            journey to optimal health and well-being.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
