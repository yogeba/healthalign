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
import { Product, ProductById } from "../types";
import { gql, useQuery } from "@apollo/client";
import client from "../lib/apolloClient";
import SearchProductList from "components/SearchProductList";
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
      .catch((e) => {
        console.error(e);
      });

    // Once you are done singing your best song, stop and get the mp3.
  };

  const stopRecord = async () => {
    recorder
      .stop()
      .getMp3()
      .then(async ([buffer, blob]) => {
        // do what ever you want with buffer and blob
        // Example: Create a mp3 file and play
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

        // Set the API endpoint and headers
        const apiUrl = "https://api.openai.com/v1/audio/transcriptions";
        console.log(process.env.OPENAI_API_KEY, "process.env.OPENAI_API_KEY");
        const headers = {
          Accept: "application/json",
          Authorization: `Bearer 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`,
        };

        // Send the request to the Whisper API
        const res = await axios.post(apiUrl, formData, { headers });
        setTopic(res.data.text);

        //TODO

        // if (res?.data?.text) {
        //   setTopicAndPrompt(res.data.text);
        //   generateBio();
        // }

        const response = await fetch("/api/whisper", {
          method: "POST",
          body: formData,
        });
        const text = await response.json();
        console.log({ whisper: text });
        // const player = new Audio(URL.createObjectURL(file));
        // player.play();
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
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Health Align</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>

      <Header cartId={cartId} />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-10">
        <div className="relative">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply  fliter blur-xl opacity-50 animate-blob"></div>
          <div className="absolute top-0 -right-1 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply fliter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-2- left-20 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply fliter blur-xl opacity-50 animate-blob animation-delay-4000"></div>

          <motion.h1
            className="text-4xl sm:text-6xl max-w-[708px] font-bold text-slate-900"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Discover Your Optimal Health Needs
          </motion.h1>

          <p className="text-slate-500 mt-5">
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
        <div className="max-w-xl w-full">
          <div className="flex mt-10 items-center space-x-3">
            <Image
              src="/1-black.png"
              width={30}
              height={30}
              alt="1 icon"
              className="mb-5 sm:mb-0"
            />
            <p className="text-left font-medium">
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
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={
              "Enter a health topic, e.g. diabetes, depression, or heart disease."
            }
          />
          {/* <div className="flex mb-5 items-center space-x-3">
            <Image src="/2-black.png" width={30} height={30} alt="1 icon" />
            <p className="text-left font-medium">Select your vibe.</p>
          </div>
          <div className="block">
            <DropDown vibe={vibe} setVibe={(newVibe) => setVibe(newVibe)} />
          </div> */}

          {!loading && (
            <button
              className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => startrecord()}
            >
              StartRecord
            </button>
          )}

          {!loading && (
            <button
              className="bg-red-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => stopRecord()}
            >
              StopRecord
            </button>
          )}

          {!loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              onClick={(e) => generateBio(e)}
            >
              Generate Answers &rarr;
            </button>
          )}
          {loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
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
        <div className="space-y-10 my-10">
          {generatedBios && (
            <>
              <div>
                <h2
                  className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto"
                  ref={contentRef}
                >
                  Your Optimal Health Needs
                </h2>
              </div>
              <motion.div
                className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto"
                initial="hidden"
                animate="visible"
                variants={fadeInVariants}
              >
                {generatedBios.split("\n").map((generatedBio, index) => {
                  if (generatedBio.trim() === "") return null;
                  return (
                    <div
                      className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition cursor-copy border dark:border-gray-600"
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
              <h1 className="text-2xl font-bold mb-6">Supplements for you</h1>
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
