import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import LoadingDots from "../LoadingDots";
import { motion } from "framer-motion";

interface BodyProps {
  setGeneratedBios: React.Dispatch<React.SetStateAction<string>>;
}

const Body: React.FC<BodyProps> = ({ setGeneratedBios }) => {
  const [searchItem, setSearchItem] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);

  const prompt = `As Andrew Huberman, provide low-cost, low-risk, and high-output information and solutions on the following health-related questions about ${searchItem}:
      1. What is ${searchItem}? Provide a brief definition and overview.
      2. What are the main signs and symptoms of ${searchItem}? List at least 5.
      3. How is ${searchItem} diagnosed? Describe the process and any tests involved.
      4. What are some of the main medical treatments for ${searchItem}? List at least 3 treatments.
      5. Have any supplements been studied for ${searchItem}? Provide an overview of the research and any promising results.
      6. How could diet affect ${searchItem}? Explain the role of diet in managing or preventing the condition.
      7. Are there any alternative or complementary treatments for ${searchItem}? List at least 3 examples.
      8. What causes ${searchItem}? Describe the factors and possible triggers.
      9. What is the latest research on ${searchItem}? Provide a brief summary and links to at least 2 research articles.
      10. List 10 supplements that may be beneficial for ${searchItem}
      11. List at least 5 plant-based supplements that may be beneficial for ${searchItem} Make sure each generated answer is complete, contains short sentences, and is based on the context: ${searchItem}${
    searchItem?.slice(-1) === "." ? "" : "."
  }`;

  const handleSaerchButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSearchItem("");
    if (typeof searchItem === "string" && searchItem.length > 0) {
      generateBio(e);
    }
  };

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
      setGeneratedBios((prev) => {
        console.log(prev + chunkValue);
        return prev + chunkValue;
      });
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-12 pt-14">
        <Link href="/" className="flex items-center gap-3">
          <Image
            alt="moetar"
            src="/images/icon/mortar-icon.svg"
            width={25}
            height={25}
          />
          <h1 className="tracking-tight capitalize font-bold text-sm text-[#4E4E4E]">
            Health Align
          </h1>
        </Link>
      </div>
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col gap-5 px-12">
          <motion.h2
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-[44px] leading-[53px] font-semibold text-start"
          >
            Discover Your Optimal <span className="text-[#4DAF00]">Health</span>{" "}
            Needs
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-base text-[#0000007D] font-normal max-w-[351px]"
          >
            Plant Based Nature's Secrets for a Healthier, Happier Life.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col py-5 mb-2.5"
          >
            <div className="flex gap-2.5 items-center">
              <button className="flex items-center justify-center flex-shrink-0 w-5 h-5 text-xs font-semibold text-white bg-black rounded-full ">
                1
              </button>
              <p className="text-xs font-bold">
                Search a Health Condition{" "}
                <span className="text-xs font-normal">
                  (or goal or desired outcome)
                </span>
                .
              </p>
            </div>
            <textarea
              value={searchItem ?? ""}
              onChange={(e) => setSearchItem(e.target.value)}
              rows={6}
              className="w-full my-5 border-gray-300 shadow-sm resize-none rounded-2xl focus:border-black focus:ring-black scrollbar-thin"
              placeholder={
                "Enter a Health Topic, e.g Diabetes, Depression, or heart Disease..."
              }
            />
          </motion.div>
          {!loading && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              onClick={(e) => handleSaerchButtonClick(e)}
              className="rounded-2xl flex gap-2 items-center justify-center bg-[#4DAF00] text-xs font-semibold leading-8 text-white py-3"
            >
              Generate Awnser
              <Image
                alt="moetar"
                src="/images/icon/right-arrow.svg"
                width={10}
                height={10}
                className="mt-1"
              />
            </motion.button>
          )}
          {loading && (
            <button
              className="rounded-2xl h-[54px] flex gap-2 items-center justify-center bg-[#4DAF00] text-xs font-semibold leading-8 text-white py-3"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
      </div>

      {/* footer part */}
      <div className="py-[30px] flex items-center justify-center gap-2 text-center font-bold text-sm  md:text-base border-t border-[#00000038]">
        Powered by{" "}
        <a
          href="https://openai.com/blog/chatgpt"
          target="_blank"
          rel="noreferrer"
          className="font-normal transition hover:underline"
        >
          ChatGPT{" "}
        </a>
        |
        <Link legacyBehavior href="/">
          <a className="font-normal transition hover:underline">Home</a>
        </Link>
        |
        <Link legacyBehavior href="/about">
          <a className="font-normal transition hover:underline">About</a>
        </Link>
      </div>
    </div>
  );
};

export default Body;
