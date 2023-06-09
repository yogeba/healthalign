import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import axios from "axios";
import ProductList from "../components/ProductList";
import { gql, useQuery } from "@apollo/client";
import client from "../lib/apolloClient";
import SearchProductList from "components/SearchProductList";
import { ProductById } from "types";
import { Product } from "types/searchProduct";
const MicRecorder = require("mic-recorder-to-mp3");

const Home: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [topic, setTopic] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generatedBios, setGeneratedBios] = useState<string>("");
  // const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductById[]>([]);
  const [cartId, setCartId] = useState<string>("");
  const recorder = new MicRecorder({
    bitRate: 128,
  });

  // References
  const cartIdRef = useRef<string | null>(null);

  const getPrompt = (
    topic: string
  ) => `As Andrew Huberman, provide low-cost, low-risk, and high-output information and solutions on the following health-related questions about ${topic}:
      1. What is ${topic}? Provide a brief definition and overview.
      2. What are the main signs and symptoms of ${topic}? List at least 5.
      3. How is ${topic} diagnosed? Describe the process and any tests involved.
      4. What are some of the main medical treatments for ${topic}? List at least 3 treatments.
      5. Have any supplements been studied for ${topic}? Provide an overview of the research and any promising results.
      6. How could diet affect ${topic}? Explain the role of diet in managing or preventing the condition.
      7. Are there any alternative or complementary treatments for ${topic}? List at least 3 examples.
      8. What causes ${topic}? Describe the factors and possible triggers.
      9. What is the latest research on ${topic}? Provide a brief summary and links to at least 2 research articles.
      10. List 10 supplements that may be beneficial for ${topic}
      11. List at least 5 plant-based supplements that may be beneficial for ${topic}

Make sure each generated answer is complete, contains short sentences, and is based on the context: ${topic}${
    topic.slice(-1) === "." ? "" : "."
  }`;

  const setTopicAndPrompt = (topic: string) => {
    setTopic(topic);
    setPrompt(getPrompt(topic));
    console.log({ topic, prompt, a: "1" });
  };

  const contentRef = useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (contentRef.current !== null) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Extract supplement names from the response

  const extractSupplementNames = (response: string) => {
    const lines = response.split("\n");
    const question10Supplements = lines.find((line) => line.startsWith("10."));
    const question11Supplements = lines.find((line) => line.startsWith("11."));

    const supplementNames = question10Supplements
      ? question10Supplements.replace(/^10\.\s*/, "").split(", ")
      : [];

    const plantBasedSupplementNames = question11Supplements
      ? question11Supplements.replace(/^11\.\s*/, "").split(", ")
      : [];

    return { supplementNames, plantBasedSupplementNames };
  };

  // Fetch products from Rye API

  async function fetchRyeProducts(query: string): Promise<Product[]> {
    const API_KEY = process.env.RYE_API_KEY;

    const response = await axios.get(
      "/api/rye?query=" + encodeURIComponent(query)
    );
    const products = response.data;
    setFilteredProducts((prevProducts) => [
      ...prevProducts,
      ...products.products,
    ]);

    console.log("All Products: ", filteredProducts);
    return products.products;
  }

  async function fetchProducts(query: string): Promise<Product[]> {
    const response = await axios.get(
      "/api/search?searchQuery=" + encodeURIComponent(query)
    );
    const products = response.data;
    console.log(products, "updated products");
    setFilteredProducts((prevProducts) => [...prevProducts, ...products]);

    console.log("All Products: ", filteredProducts);
    return products;
  }

  // Event handlers

  const generateBio = async (e?: any) => {
    console.log({ topic, prompt });
    if (!topic || !prompt) return;

    if (e) e.preventDefault();
    setGeneratedBios("");
    setLoading(true);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedBios((prev) => prev + chunkValue);
    }

    scrollToBios();
    setLoading(false);
  };

  const startrecord = async () => {
    recorder
      .start()
      .then(() => {
        // something else
      })
      .catch((e: any) => {
        console.error(e);
      });

    // Once you are done singing your best song, stop and get the mp3.
  };

  const stopRecord = async () => {
    recorder
      .stop()
      .getMp3()
      .then(async ([buffer, blob]: any) => {
        // do what ever you want with buffer and blob
        // Example: Create a mp3 file and play
        console.log(buffer, "old buffer");
        const file = new File(buffer, "voice.mp3", {
          type: blob.type,
          lastModified: Date.now(),
        });

        const formData = new FormData();
        formData.append("file", file);
        formData.append("model", "whisper-1");
        formData.append("response_format", "json");
        formData.append("temperature", "0");
        formData.append("language", "en");

        console.log(file, "formData");

        // Set the API endpoint and headers
        const apiUrl = "https://api.openai.com/v1/audio/transcriptions";
        const headers = {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        };

        // Send the request to the Whisper API
        const res = await axios.post(apiUrl, formData, { headers });

        //TODO
        // const response = await fetch("/api/whisper", {
        //   method: "POST",

        //   body: formData,
        // });
        // const text = await response.json();
        // console.log({ whisper: text });
        if (res?.data?.text) {
          setTopicAndPrompt(res.data.text);
          generateBio();
        }
        const player = new Audio(URL.createObjectURL(file));
        player.play();
      })
      .catch((e: any) => {
        alert("We could not retrieve your message");
        console.log(e);
      });
  };

  // Side effects

  useEffect(() => {
    if (!loading && generatedBios !== "") {
      console.log(generatedBios);

      Promise.resolve().then(async () => {
        const { supplementNames, plantBasedSupplementNames } =
          extractSupplementNames(generatedBios);
        console.log("Extracted Supplement Names:", supplementNames);
        console.log(
          "Extracted Plant-based Supplement Names:",
          plantBasedSupplementNames
        );

        const allSupplementNames = [
          ...supplementNames,
          ...plantBasedSupplementNames,
        ];

        for (const supplementName of allSupplementNames) {
          try {
            const products = await fetchProducts(supplementName);
            console.log(`Rye products for "${supplementName}":`, products);
          } catch (error) {
            console.error(
              `Error fetching Rye products for "${supplementName}":`,
              error
            );
          }
        }
      });
    }
  }, [loading, generatedBios]);

  useEffect(() => {
    setFilteredProducts([]);
  }, [topic, prompt]);

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-5xl min-h-screen py-2 mx-auto">
      <Head>
        <title>Health Align</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>

      <Header cartId={cartId} />
      <main className="flex flex-col items-center justify-center flex-1 w-full px-4 mt-12 text-center sm:mt-10">
        <div className="relative">
          <div className="absolute top-0 bg-purple-200 rounded-full opacity-50 -left-4 w-72 h-72 mix-blend-multiply fliter blur-xl animate-blob"></div>
          <div className="absolute top-0 bg-blue-200 rounded-full opacity-50 -right-1 w-72 h-72 mix-blend-multiply fliter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bg-green-200 rounded-full opacity-50 -bottom-2- left-20 w-72 h-72 mix-blend-multiply fliter blur-xl animate-blob animation-delay-4000"></div>

          <motion.h1
            className="text-4xl sm:text-6xl max-w-[708px] font-bold text-slate-900"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Discover Your Optimal Health Needs
          </motion.h1>

          <p className="mt-5 text-slate-500">
            {" "}
            Plant Based Nature's Secrets for a Healthier, Happier Life.
          </p>
        </div>
        <div className="mt-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Image
              src="/fotor_2023-4-30_0_58_9.png"
              width={1920}
              height={1080}
              alt="Health Aligh - Plant Based Supplements"
              className="pb-6"
            />
          </motion.div>
        </div>
        <div className="w-full max-w-xl">
          <div className="flex items-center mt-10 space-x-3">
            <Image
              src="/1-black.png"
              width={30}
              height={30}
              alt="1 icon"
              className="mb-5 sm:mb-0"
            />
            <p className="font-medium text-left">
              Search a Health Condition{" "}
              <span className="text-slate-500">
                (or goal or desired outcome)
              </span>
              .
            </p>
          </div>
          <textarea
            value={topic}
            onChange={(e) => setTopicAndPrompt(e.target.value)}
            rows={4}
            className="w-full my-5 border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black"
            placeholder={
              "Enter a health topic, e.g. diabetes, depression, or heart disease."
            }
          />
          {/* <div className="flex items-center mb-5 space-x-3">
            <Image src="/2-black.png" width={30} height={30} alt="1 icon" />
            <p className="font-medium text-left">Select your vibe.</p>
          </div>
          <div className="block">
            <DropDown vibe={vibe} setVibe={(newVibe) => setVibe(newVibe)} />
          </div> */}

          {!loading && (
            <button
              className="px-4 py-2 font-bold text-white bg-blue-400 rounded hover:bg-blue-700"
              onClick={() => startrecord()}
            >
              StartRecord
            </button>
          )}

          {!loading && (
            <button
              className="px-4 py-2 font-bold text-white bg-red-400 rounded hover:bg-blue-700"
              onClick={() => stopRecord()}
            >
              StopRecord
            </button>
          )}

          {!loading && (
            <button
              className="w-full px-4 py-2 mt-8 font-medium text-white bg-black rounded-xl sm:mt-10 hover:bg-black/80"
              onClick={(e) => generateBio(e)}
            >
              Generate Answers &rarr;
            </button>
          )}
          {loading && (
            <button
              className="w-full px-4 py-2 mt-8 font-medium text-white bg-black rounded-xl sm:mt-10 hover:bg-black/80"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <div className="my-10 space-y-10">
          {generatedBios && (
            <>
              <div>
                <h2
                  className="mx-auto text-3xl font-bold sm:text-4xl text-slate-900"
                  ref={contentRef}
                >
                  Your Optimal Health Needs
                </h2>
              </div>
              <motion.div
                className="flex flex-col items-center justify-center max-w-xl mx-auto space-y-8"
                initial="hidden"
                animate="visible"
                variants={fadeInVariants}
              >
                {generatedBios.split("\n").map((generatedBio, index) => {
                  if (generatedBio.trim() === "") return null;
                  return (
                    <div
                      className="p-4 transition bg-white border shadow-md dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 cursor-copy dark:border-gray-600"
                      onClick={() => {
                        navigator.clipboard.writeText(generatedBio);
                        toast("Bio copied to clipboard", {
                          icon: "✂️",
                        });
                      }}
                      key={index}
                    >
                      <p className="dark:text-gray-200">
                        {generatedBio.replace(/^\d+\.\s*/, "")}
                      </p>
                    </div>
                  );
                })}
              </motion.div>
            </>
          )}
          <div>
            {filteredProducts.length > 0 && (
              <h1 className="mb-6 text-2xl font-bold">Supplements for you</h1>
            )}
            <SearchProductList products={filteredProducts} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
