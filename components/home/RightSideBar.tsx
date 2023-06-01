import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProductsOptions from "./ProductsOptions";
import ResultCard from "components/common/ResultCard";

interface RightSideBarProps {
  generatedBios: string;
  isLeftSideBarVisible: boolean;
  searchValue: string | null;
  setGeneratedBios: React.Dispatch<React.SetStateAction<string>>;
  setSearchValue: React.Dispatch<React.SetStateAction<string | null>>;
}

const RightSideBar: React.FC<RightSideBarProps> = ({
  generatedBios,
  isLeftSideBarVisible,
  searchValue,
  setGeneratedBios,
  setSearchValue,
}) => {
  const [isShopSelected, setIsShopSelected] = useState(false);
  const [updatedSearchValue, setUpdatedSearchValue] = useState("");
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
    setGeneratedBios("null");
    // setLoading(true);
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
    // setLoading(false);
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
          className="items-center justify-center hidden w-full h-full md:flex"
        >
          <Image
            alt="moetar"
            src="/images/image/fotor-poster.png"
            width={1024}
            height={707}
            className="w-auto h-auto"
          />
        </motion.div>
      ) : (
        <div className="relative w-full h-full">
          <div className="max-h-[90vh] relative h-full w-full overflow-auto scrollbar-thin">
            {generatedBios && (
              <AnimatePresence mode="wait">
                <motion.div
                  key="content"
                  className="flex flex-col justify-center gap-10 px-0.5 py-12 md:px-0 md:items-center md:mx-12 lg:pb-32 2xl:mx-0"
                  initial="hidden"
                  animate="visible"
                  variants={zoomInVariants}
                  transition={{ duration: 1.5 }}
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
                      <button
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
                      </button>
                    </motion.div>
                  )}
                  {generatedBios
                    .split("\n")
                    .reverse()
                    .map((generatedBio: any, index: number) => {
                      if (generatedBio.trim() === "") return null;
                      return (
                        <ResultCard key={index} generatedBio={generatedBio} />
                      );
                    })}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
          {!isLeftSideBarVisible && (
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-0 z-10 flex justify-center w-full"
            >
              <div className="w-full flex-col gap-5 bg-[#FCF6FFD9] h-full flex  rounded-t-[32px] shadow-[0px_-2px_22px_0px_#00000040] max-w-6xl relative py-[27px]">
                <form
                  onSubmit={(e) => handleSubmitClick(e)}
                  className="flex items-center w-full gap-6 px-6"
                >
                  <div
                    onClick={() => setIsShopSelected(!isShopSelected)}
                    className={`border transition-all duration-500 cursor-pointer    px-5 py-5 rounded-[15px] ${
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
                      className=""
                    />
                  </div>
                  <div className="w-full">
                    <input
                      className="w-full font-Inter font-normal py-4 rounded-2xl outline-none focus:border-black focus:ring-black focus:outline-none border-[#00000061] pr-16"
                      type="text"
                      value={updatedSearchValue}
                      onChange={(e) => setUpdatedSearchValue(e.target.value)}
                      placeholder="Enter a Health Topic, e.g......."
                    />
                  </div>
                  <div className="absolute right-5">
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
                        <Image
                          alt="moetar"
                          src="/images/icon/mic-icon.svg"
                          width={15}
                          height={15}
                          className="cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </form>
                {isShopSelected && (
                  <div className="flex items-center w-full gap-6">
                    <ProductsOptions />
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
