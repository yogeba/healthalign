import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import LoadingDots from "../LoadingDots";
import axios from "axios";
// const MicRecorder = require("mic-recorder-to-mp3");
import MicRecorder from "mic-recorder-to-mp3";

const recorder = new MicRecorder({
  bitRate: 128,
});

interface BodyProps {
  setGeneratedBios: React.Dispatch<React.SetStateAction<string>>;
  setSearchValue: React.Dispatch<React.SetStateAction<string | null>>;
  setIsSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const LeftSideBar: React.FC<BodyProps> = ({
  setGeneratedBios,
  setSearchValue,
  setIsSidebarVisible,
}) => {
  const [searchItem, setSearchItem] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState(false);
  const [resultData, setResultData] = useState<any>("");
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
    setSearchValue(searchItem);
    setSearchItem("");
    if (typeof searchItem === "string" && searchItem.length > 0) {
      setIsSidebarVisible(false);
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
    let accumulatedResult = ""; // Variable to accumulate the chunk values

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedBios((prev) => {
        return prev + chunkValue;
      });
      accumulatedResult += chunkValue; // Accumulate the chunk values
    }

    // Update the state with the accumulated result
    setResultData(accumulatedResult);

    setLoading(false);
  };

  useEffect(() => {
    if (!loading) {
      if (typeof window !== "undefined" && resultData !== "") {
        const result = { resultData, question: "This is question" };
        localStorage.setItem("resultData", JSON.stringify(result));
      }
    }
  }, [loading]);

  const startRecord = async () => {
    setIsRecording(true);
    recorder
      .start()
      .then(() => {
        // Do something else
      })
      .catch((e: any) => {
        console.error(e);
      });
  };

  const stopRecord = async () => {
    setIsRecording(false);
    console.log(process.env.MONGODB_URI, "test data");
    recorder
      .stop()
      .getMp3()
      .then(async ([buffer, blob]: any) => {
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

        const apiUrl = "https://api.openai.com/v1/audio/transcriptions";
        const headers = {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        };

        console.log(formData);

        const res = await axios.post(apiUrl, formData, { headers });
        setSearchItem(res.data.text);

        /* const response = await fetch("/api/whisper", {
          method: "POST",
          body: formData,
        });
        const text = await response.json();
        console.log(text, "texttexttexttexttexttexttexttext"); 
        console.log({ whisper: text });*/
      })
      .catch((e: any) => {
        alert("We could not retrieve your message");
        console.log(e);
      });
  };
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center w-full h-full">
        <div className="z-10 flex flex-col gap-5 xs:px-2 sm:px-12">
          <motion.h2
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className=" text-4xl md:text-[44px] leading-[53px] text-center font-semibold font-BarlowSemiCondensed"
          >
            Discover Your Optimal <span className="text-[#4DAF00]">Health</span>{" "}
            Needs
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-sm  md:text-base text-center font-Inter text-[#0000007D] font-normal lg:max-w-[351px]"
          >
            Plant Based Nature's Secrets for a Healthier, Happier Life.
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col py-5 mb-2.5 px-4 md:px-0"
          >
            <div className="flex gap-2.5 items-center">
              <button className="flex items-center justify-center flex-shrink-0 h-[14px] w-[14px] text-[9px] md:text-xs font-bold md:font-semibold text-white bg-black rounded-full md:w-5 md:h-5 ">
                1
              </button>
              <p className="text-[9px] md:text-xs font-bold font-Inter">
                Search a Health Condition{" "}
                <span className="text-[9px] md:text-xs font-normal">
                  (or goal or desired outcome)
                </span>
                .
              </p>
            </div>
            <div className="relative">
              <textarea
                value={searchItem ?? ""}
                onChange={(e) => setSearchItem(e.target.value)}
                rows={6}
                className="w-full py-3 pl-4 my-5 border-gray-300 shadow-sm resize-none rounded-2xl focus:border-black placeholder:text-gray-400 focus:ring-black scrollbar-thin"
                placeholder={
                  "Enter a Health Topic, e.g Diabetes, Depression, or heart Disease..."
                }
              />
              <div className="absolute w-full bottom-10 ">
                <div className="flex items-center justify-end gap-3 mx-4">
                  <label htmlFor="documentData" className="cursor-pointer">
                    <Image
                      alt="moetar"
                      src="/images/icon/attachment.svg"
                      width={15}
                      height={15}
                      className="cursor-pointer "
                    />
                    <input className="hidden" type="file" id="documentData" />
                  </label>

                  {!isRecording ? (
                    <button onClick={() => startRecord()}>
                      <Image
                        alt="moetar"
                        src="/images/icon/mic-icon.svg"
                        width={15}
                        height={15}
                        className="cursor-pointer"
                      />
                    </button>
                  ) : (
                    <button onClick={() => stopRecord()}>
                      <Image
                        alt="moetar"
                        src="/images/icon/stop-audio.svg"
                        width={15}
                        height={15}
                        className="cursor-pointer"
                      />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
          {!loading && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              onClick={(e) => handleSaerchButtonClick(e)}
              className="rounded-2xl font-Poppins flex gap-2 items-center justify-center bg-[#4DAF00] text-xs font-semibold leading-8 text-white py-3 animated"
            >
              Generate Awnser
              <Image
                alt="moetar"
                src="/images/icon/right-arrow.svg"
                width={10}
                height={10}
                className=""
              />
            </motion.button>
          )}
          {loading && (
            <button
              className="rounded-2xl animated h-[54px] flex gap-2 items-center justify-center bg-[#4DAF00] text-xs font-semibold leading-8 text-white py-3"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
