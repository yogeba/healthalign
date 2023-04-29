import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import {motion} from "framer-motion"
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";


const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("");
  const [generatedBios, setGeneratedBios] = useState<String>("");

  const contentRef = useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (contentRef.current !== null) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const prompt = `Answer the following questions about ${topic}.
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
      11. List atleast 5 plant-based supplements that may be beneficial for ${topic}

Make sure each generated answer is complete, contains short sentences, and is based on the context: ${topic}${topic.slice(-1) === "." ? "" : "."}`;

  const generateBio = async (e: any) => {
    e.preventDefault();
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

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">

      <Head>
        <title>Health Align</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-10">
        
        
        <div className="relative">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply  fliter blur-xl opacity-50 animate-blob"></div>
          <div className="absolute top-0 -right-1 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply fliter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-2- left-20 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply fliter blur-xl opacity-50 animate-blob animation-delay-4000">
        </div>
        
        <motion.h1
          className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Discover Your Optimal Health Needs
        </motion.h1>
        
        <p className="text-slate-500 mt-5"> Plant Based Nature's Secrets for a Healthier, Happier Life.</p>
        </div>
        <div className="mt-10">

          <Image src="/fotor_2023-4-30_0_58_9.png" width={1920}height={1080} alt="Health Aligh - Plant Based Supplements" className="pb-6"/>
        
        
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
            onChange={(e) => setTopic(e.target.value)}
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
                {generatedBios
                  .split("\n")
                  .map((generatedBio) => {
                    return (
                      <div
                        className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                        onClick={() => {
                          navigator.clipboard.writeText(generatedBio);
                          toast("Bio copied to clipboard", {
                            icon: "✂️",
                          });
                        }}
                        key={generatedBio}
                      >
                        <p>{generatedBio}</p>
                      </div>
                    );
                  })}
                  </motion.div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
