import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProductsOptions from "./ProductsOptions";
import ResultCard from "components/common/ResultCard";
import ChatResultCard from "components/common/ChatResultCard";
// import MicRecorder from "mic-recorder-to-mp3";
const MicRecorder = require("mic-recorder-to-mp3");
import axios from "axios";

const recorder = new MicRecorder({
  bitRate: 128,
});

interface RightSideBarProps {
  generatedBios: string;
  isLeftSideBarVisible: boolean;
  searchValue: string | null;
  setGeneratedBios: React.Dispatch<React.SetStateAction<string>>;
  setSearchValue: React.Dispatch<React.SetStateAction<string | null>>;
  allSupplementNames: string[];
}

const RightSideBar: React.FC<RightSideBarProps> = ({
  generatedBios,
  isLeftSideBarVisible,
  searchValue,
  setGeneratedBios,
  setSearchValue,
  allSupplementNames,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isShopSelected, setIsShopSelected] = useState(false);
  const [updatedSearchValue, setUpdatedSearchValue] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [resultData, setResultData] = useState<any>("");
  const zoomInVariants = {
    hidden: { scale: 0, y: 400, opacity: 0 },
    visible: { scale: 1, y: 0, opacity: 1 },
  };

  const prompt = `As Andrew Huberman, provide low-cost, low-risk, and high-output information and solutions on the following health-related questions about ${updatedSearchValue}:
  1. What is ${updatedSearchValue}? Provide a brief definition and overview.
  2. What are the main signs and symptoms of ${updatedSearchValue}? List at least 5.
  3. How is ${updatedSearchValue} diagnosed? Describe the process and any tests involved.
  4. What are some of the main medical treatments for ${updatedSearchValue}? List at least 3 treatments.
  5. Have any supplements been studied for ${updatedSearchValue}? Provide an overview of the research and any promising results.
  6. How could diet affect ${updatedSearchValue}? Explain the role of diet in managing or preventing the condition.
  7. Are there any alternative or complementary treatments for ${updatedSearchValue}? List at least 3 examples.
  8. What causes ${updatedSearchValue}? Describe the factors and possible triggers.
  9. What is the latest research on ${updatedSearchValue}? Provide a brief summary and links to at least 2 research articles.
  10. List 10 supplements that may be beneficial for ${updatedSearchValue}
  11. List at least 5 plant-based supplements that may be beneficial for ${updatedSearchValue} Make sure each generated answer is complete, contains short sentences, and is based on the context: ${updatedSearchValue}${
    updatedSearchValue?.slice(-1) === "." ? "" : "."
  }`;

  const handleSubmitClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      typeof updatedSearchValue === "string" &&
      updatedSearchValue.length > 0
    ) {
      generateBio(e);
    } else {
      setUpdatedSearchValue("This is test propmpt without APi");
      setGeneratedBios(
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta deleniti, accusantium sapiente repudiandae, nam magni voluptate alias dolore culpa omnis cupiditate reiciendis beatae. Tempore labore dolorem repudiandae architecto placeat odit!"
      );
    }
  };

  const generateBio = async (e: any) => {
    e.preventDefault();
    setSearchValue(updatedSearchValue);
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

    setResultData(accumulatedResult);
    setLoading(false);
  };

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

  useEffect(() => {
    if (!loading) {
      if (typeof window !== "undefined" && resultData !== "") {
        const result = { resultData, question: searchValue };
        localStorage.setItem("resultData", JSON.stringify(result));
      }
    }
  }, [loading]);

  const stopRecord = async () => {
    setIsRecording(false);
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
        setUpdatedSearchValue(res.data.text);
      })
      .catch((e: any) => {
        alert("We could not retrieve your message");
        console.log(e);
      });
  };

  useEffect(() => {
    setUpdatedSearchValue("");
  }, [isLeftSideBarVisible]);

  return (
    <div
      className={`w-full h-full ${
        !isLeftSideBarVisible ? "block md:block" : "hidden md:block"
      }`}
    >
      {!(generatedBios.length > 0) ? (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="items-center justify-center flex-shrink-0 hidden w-full h-full md:flex"
        >
          <Image
            alt="moetar"
            src="/images/image/fotor-poster.png"
            width={800}
            height={800}
            className="flex-shrink-0 w-auto h-auto "
          />
        </motion.div>
      ) : (
        <div className="relative w-full h-full">
          <div className="max-h-[78vh] md:max-h-[90vh] relative h-full w-full overflow-auto scrollbar-thin">
            {generatedBios && (
              <AnimatePresence mode="wait">
                <div
                  key="content"
                  className="hidden md:flex flex-col justify-center gap-10 px-0.5 py-12 md:px-0 md:items-center md:mx-12 lg:pb-32 2xl:mx-0"
                  // initial="hidden"
                  // animate="visible"
                  // variants={zoomInVariants}
                  // transition={{ duration: 1.5 }}
                >
                  {!isLeftSideBarVisible && (
                    <motion.div
                      initial={{ y: -100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="w-full relative max-w-[900px]"
                    >
                      <hr className="border border-[#0000001F]" />
                      <div className="absolute -top-2.5 w-full flex justify-start sm:justify-center">
                        <p className="inline-block text-[#4E4E4E] bg-white pr-3 sm:px-5 font-InaiMathi text-base font-bold">
                          {typeof searchValue === "string" ? searchValue : ""}
                        </p>
                      </div>
                      {/* <button
                        onClick={() =>
                          setUpdatedSearchValue(
                            typeof searchValue === "string" ? searchValue : ""
                          )
                        }
                        className="h-[25px] w-[25px] flex justify-center items-center bg-[#00A02C] rounded-full absolute right-0 -top-2.5"
                      >
                        <Image
                          alt="edit"
                          src="/images/icon/edit-icon.svg"
                          width={10}
                          height={10}
                          className="-mt-1 -mr-0.5 cursor-pointer"
                        />
                      </button> */}
                    </motion.div>
                  )}
                  {generatedBios
                    .split("\n")
                    .map((generatedBio: any, index: number) => {
                      if (generatedBio.trim() === "") return null;
                      return (
                        <ResultCard key={index} generatedBio={generatedBio} />
                      );
                    })}
                </div>
              </AnimatePresence>
            )}
            {generatedBios && (
              <div className="relative flex flex-col w-full h-full px-4 md:hidden sm:px-0 gap-7">
                {/* question */}
                <div className="flex justify-end">
                  <div className="text-[12px] relative mr-1.5 font-bold font-InaiMathi text-white bg-[#4DAF00] py-4 px-6 rounded-full inline-block ">
                    {typeof searchValue === "string" ? searchValue : ""}
                    <div className="absolute -right-1.5 -bottom-2">
                      <Image
                        alt="moetar"
                        src="/images/icon/message-blob.svg"
                        width={31}
                        height={31}
                        className="w-[30px] h-[30px]"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-full h-full gap-5">
                  {generatedBios
                    .split("\n")
                    .reverse()
                    .map((generatedBio: any, index: number) => {
                      if (generatedBio.trim() === "") return null;
                      return (
                        <ChatResultCard
                          key={index}
                          generatedBio={generatedBio}
                        />
                      );
                    })}
                </div>
              </div>
            )}
          </div>
          {!isLeftSideBarVisible && (
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-0 z-10 flex justify-center w-full px-2.5 md:px-0"
            >
              <div className="w-full flex-col gap-5 bg-[#FCF6FF] h-full flex rounded-t-[12px] md:rounded-t-[32px] shadow-[0px_-2px_22px_0px_#00000040] max-w-6xl relative py-3 md:py-[27px]">
                <form
                  onSubmit={(e) => handleSubmitClick(e)}
                  className="flex items-center w-full px-2.5 md:px-6 gap-1.5 md:gap-6"
                >
                  <div
                    onClick={() => setIsShopSelected(!isShopSelected)}
                    className={`border h-[36px] w-[36px] md:h-[56px] md:w-[64px] transition-all duration-500 cursor-pointer flex justify-center items-center rounded-lg md:rounded-[15px] ${
                      isShopSelected
                        ? "bg-[#00A02C] border-[#00A02C]"
                        : "border-[#00000061] bg-white"
                    }`}
                  >
                    <Image
                      alt="moetar"
                      src={`/images/icon/${
                        isShopSelected ? "selected-shop-icon" : "shop-icon"
                      }.svg`}
                      width={20}
                      height={20}
                      className="h-[14px] w-[14px] md:h-5 md:w-5"
                    />
                  </div>
                  <div className="w-full">
                    <input
                      className="w-full h-[40px] md:h-full font-Inter font-normal py-4   md:rounded-2xl outline-none rounded-lg focus:border-black focus:ring-black focus:outline-none border-[#00000061] md:pr-16"
                      type="text"
                      value={updatedSearchValue}
                      onChange={(e) => setUpdatedSearchValue(e.target.value)}
                      placeholder="Enter a Health Topic, e.g......."
                    />
                  </div>
                  <div
                    className={`border md:hidden  h-[36px] w-[36px] md:h-[56px] md:w-[64px] transition-all duration-500 cursor-pointer flex justify-center items-center rounded-lg md:rounded-[15px] ${
                      false
                        ? "bg-[#00A02C] border-[#00A02C]"
                        : "border-[#00000061] bg-white"
                    }`}
                  >
                    {!isRecording ? (
                      <div onClick={() => startRecord()}>
                        <Image
                          alt="moetar"
                          src="/images/icon/mic-icon.svg"
                          width={15}
                          height={15}
                          className="cursor-pointer"
                        />
                      </div>
                    ) : (
                      <div onClick={() => stopRecord()}>
                        <Image
                          alt="moetar"
                          src="/images/icon/stop-audio.svg"
                          width={15}
                          height={15}
                          className="cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                  <div className="absolute hidden right-5 md:block">
                    <div className="flex items-center justify-end gap-3 mx-4">
                      <label htmlFor="documentData" className="cursor-pointer">
                        <Image
                          alt="moetar"
                          src="/images/icon/attachment.svg"
                          width={15}
                          height={15}
                          className="cursor-pointer"
                        />
                        <input
                          className="hidden"
                          type="file"
                          id="documentData"
                        />
                      </label>

                      <div className="cursor-pointer">
                        {!isRecording ? (
                          <div onClick={() => startRecord()}>
                            <Image
                              alt="moetar"
                              src="/images/icon/mic-icon.svg"
                              width={15}
                              height={15}
                              className="cursor-pointer"
                            />
                          </div>
                        ) : (
                          <div onClick={() => stopRecord()}>
                            <Image
                              alt="moetar"
                              src="/images/icon/stop-audio.svg"
                              width={15}
                              height={15}
                              className="cursor-pointer"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
                {allSupplementNames.length > 0 && isShopSelected && (
                  <div className="flex items-center w-full gap-6">
                    <ProductsOptions
                      optionsList={
                        allSupplementNames.length > 7
                          ? allSupplementNames.slice(0, 7)
                          : allSupplementNames
                      }
                    />
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default RightSideBar;
