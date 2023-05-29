import Image from "next/image";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import ResultCard from "../common/ResultCard";

interface RightSideBarProps {
  generatedBios: string;
  isLeftSideBarVisible: boolean;
}
const RightSideBar: React.FC<RightSideBarProps> = ({
  generatedBios,
  isLeftSideBarVisible,
}) => {
  const zoomInVariants = {
    hidden: { scale: 0, y: 400, opacity: 0 },
    visible: { scale: 1, y: 0, opacity: 1 },
  };

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
                  className="flex flex-col items-center justify-center gap-10 py-12 mx-12 lex 2xl:mx-0"
                  initial="hidden"
                  animate="visible"
                  variants={zoomInVariants}
                  transition={{ duration: 1.5 }}
                >
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
                        className="cursor-pointer "
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
