import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ResultCard from "../common/ResultCard";

interface RightSideBarProps {
  generatedBios: string;
  isLeftSideBarVisible: boolean;
  searchValue: string | null;
}
const RightSideBar: React.FC<RightSideBarProps> = ({
  generatedBios,
  isLeftSideBarVisible,
  searchValue,
}) => {
  const [updatedSearchValue, setUpdatedSearchValue] = useState("");
  const zoomInVariants = {
    hidden: { scale: 0, y: 400, opacity: 0 },
    visible: { scale: 1, y: 0, opacity: 1 },
  };

  useEffect(() => {
    setUpdatedSearchValue("");
    console.log("updates sidebar");
  }, [isLeftSideBarVisible]);

  return (
    <div className="w-full h-full">
      {!(generatedBios.length > 0) ? (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="flex items-center justify-center w-full h-full"
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
                  className="flex flex-col lg:pb-32 items-center justify-center gap-10 py-12 mx-12 lex 2xl:mx-0"
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
                      <div className="absolute -top-2.5 w-full flex justify-center">
                        <p className="inline-block text-[#4E4E4E] bg-white px-5 font-InaiMathi text-base font-bold">
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
              className="absolute bottom-0 flex justify-center w-full"
            >
              <div className="w-full bg-white h-[115px] flex justify-center items-center rounded-t-[32px] shadow-[0px_-2px_22px_0px_#00000040] px-6 max-w-6xl relative">
                <input
                  className="w-full font-Inter font-normal py-4 rounded-2xl outline-none focus:border-black focus:ring-black focus:outline-none border-[#00000061] pr-16"
                  type="text"
                  value={updatedSearchValue}
                  onChange={(e) => setUpdatedSearchValue(e.target.value)}
                  placeholder="Enter a Health Topic, e.g......."
                />
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
                      <input className="hidden" type="file" id="documentData" />
                    </label>

                    <button>
                      <Image
                        alt="moetar"
                        src="/images/icon/mic-icon.svg"
                        width={15}
                        height={15}
                        className="cursor-pointer"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default RightSideBar;
