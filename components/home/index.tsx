import React, { useRef, useState } from "react";
import Image from "next/image";

import { Toaster, toast } from "react-hot-toast";
import { motion } from "framer-motion";
import Body from "./Body";
import Link from "next/link";

const HomePage = () => {
  const [generatedBios, setGeneratedBios] = useState<string>("");
  const contentRef = useRef<null | HTMLDivElement>(null);

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative w-full h-screen">
      <div className="absolute w-48 h-48 bg-orange-100 rounded-full opacity-50 -bottom-2- left-36 mix-blend-multiply fliter blur-xl animate-blob animation-delay-4000"></div>
      <div className="absolute bg-purple-200 rounded-full opacity-50 bottom-16 left-1/3 w-80 h-80 mix-blend-multiply fliter blur-xl animate-blob"></div>
      <div className="absolute bg-green-100 rounded-full opacity-50 right-10 top-[20%] w-72 h-72 mix-blend-multiply fliter blur-xl animate-blob animation-delay-2000"></div>
      <div className="flex h-full">
        {/* body page */}
        <div className="w-full sm:w-1/2 xl:w-[36%] h-full border-r border-[#00000038] ">
          <Body setGeneratedBios={setGeneratedBios} />
        </div>

        {/* result page */}
        <div className="flex flex-col flex-grow sm:w-1/2 xl:w-auto ">
          <div
            className={`flex border-b py-5 items-center border-[#00000038] ${
              generatedBios.length > 0 ? "justify-between" : "justify-end"
            }`}
          >
            {generatedBios.length > 0 && (
              <div
                className="cursor-pointer"
                onClick={() => setGeneratedBios("")}
              >
                <Image
                  alt="moetar"
                  src="/images/icon/back-icon.svg"
                  width={15}
                  height={15}
                  className="cursor-pointer mx-7 hover:animate-pulse"
                />
              </div>
            )}
            <div className="flex items-start justify-end px-[30px]">
              <div className="border flex border-[#5F5F5F] rounded-md">
                <div className="px-[10px] py-3 border-r border-[#5F5F5F]">
                  <Image
                    alt="moetar"
                    src="/images/icon/users-icon.svg"
                    width={15}
                    height={15}
                    className="cursor-pointer"
                  />
                </div>
                <Link
                  href="/about"
                  className="capitalize cursor-pointer text-[10px] font-semibold text-[#5F5F5F] py-3 px-[13px]"
                >
                  About Us
                </Link>
              </div>
            </div>
          </div>

          {/* result image & decroiption */}
          {!(generatedBios.length > 0) ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              className="flex items-center justify-center w-full h-full "
            >
              <Image
                alt="moetar"
                src="/images/image/fotor-poster.png"
                width={1024}
                height={707}
                className="max-w-[500px] xl:max-w-[700px] 2xl:max-w-5xl"
              />
            </motion.div>
          ) : (
            <div className="max-h-[1000px] overflow-auto scrollbar-thin">
              {generatedBios && (
                <div>
                  <motion.div
                    className="flex flex-col items-center justify-center gap-10 py-12 mx-12 lex 2xl:mx-0"
                    initial="hidden"
                    animate="visible"
                    variants={fadeInVariants}
                  >
                    {generatedBios
                      .split("\n")
                      .reverse()
                      .map((generatedBio, index) => {
                        if (generatedBio.trim() === "") return null;
                        return (
                          <div
                            ref={contentRef}
                            className="border w-[855px] h-[200px] border-[#00000059] rounded-[28px] py-2 max-w-5xl px-12 flex items-center gap-10 justify-between"
                            onClick={() => {
                              navigator.clipboard.writeText(generatedBio);
                              toast("Bio copied to clipboard", {
                                icon: "✂️",
                              });
                            }}
                            key={index}
                          >
                            <p className="text-base font-normal leading-6 text-[#0000008F] text-justify">
                              {generatedBio.replace(/^\d+\.\s*/, "")}
                            </p>
                            <div className="flex-shrink-0">
                              <Image
                                alt="moetar"
                                src="/images/image/cactus flower-pana 1.png"
                                width={184}
                                height={184}
                                className="h-[184px] w-[184px]"
                              />
                            </div>
                          </div>
                        );
                      })}
                  </motion.div>
                </div>
              )}
              <Toaster
                position="top-center"
                reverseOrder={false}
                toastOptions={{ duration: 2000 }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
