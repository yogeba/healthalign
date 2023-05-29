import React, { useState } from "react";
import CommonHeader from "../common/Header";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";
import { motion } from "framer-motion";
import Image from "next/image";

function HomePage() {
  const [generatedBios, setGeneratedBios] = useState<string>("");
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);

  const toggleDivVisibility = () => {
    setIsSidebarVisible((prevVisible) => !prevVisible);
  };

  const leftSidebarAnimation = {
    hidden: {
      translateX: "-100%",
      opacity: 0,
      width: 0,
      zIndex: 0,
    },
    visible: {
      translateX: 0,
      opacity: 1,
      width: "100%",
      zIndex: 1,
    },
  };
  return (
    <div className="relative w-full h-screen">
      <div className="absolute w-48 h-48 bg-orange-100 rounded-full opacity-50 -bottom-2- left-36 mix-blend-multiply fliter blur-xl animate-blob animation-delay-4000"></div>
      <div className="absolute bg-purple-200 rounded-full opacity-50 bottom-20 left-1/3 w-80 h-80 mix-blend-multiply fliter blur-xl animate-blob"></div>
      <div className="absolute bg-green-100 rounded-full opacity-50 right-10 top-[20%] w-72 h-72 mix-blend-multiply fliter blur-xl animate-blob animation-delay-2000"></div>
      <div className="flex flex-col w-full h-full">
        <div className="">
          <CommonHeader />
        </div>
        <div className="h-full mx-7 md:mx-14 lg:mx-auto lg:container">
          <div className="flex flex-col items-center w-full h-full gap-10 lg:gap-0 lg:flex-row">
            {/* leftSidebar */}
            <motion.div
              className="lg:border-r relative lg:shadow-[1px_6px_10px_0px_#00000033] flex h-full lg:max-w-[500px]"
              variants={leftSidebarAnimation}
              initial={isSidebarVisible ? "visible" : "hidden"}
              animate={isSidebarVisible ? "visible" : "hidden"}
              transition={{ duration: 0.4 }}
            >
              <LeftSideBar setGeneratedBios={setGeneratedBios} />
            </motion.div>
            <div className="relative flex items-center justify-center w-full h-full">
              <button
                onClick={toggleDivVisibility}
                className="absolute hidden lg:block left-0 z-10 w-8 h-10 bg-[#4DAF00] text-white rounded-r-full cursor-pointer top-1/2"
              >
                {isSidebarVisible ? (
                  <Image
                    alt="back arrow"
                    src="/images/icon/right-arrow.svg"
                    width={25}
                    height={25}
                    className="ml-0.5 rotate-180"
                  />
                ) : (
                  <Image
                    alt="back arrow"
                    src="/images/icon/right-arrow.svg"
                    width={25}
                    height={25}
                    className="ml-0.5 "
                  />
                )}
              </button>
              <RightSideBar
                isLeftSideBarVisible={isSidebarVisible}
                generatedBios={generatedBios}
              />
              {!isSidebarVisible && (
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="absolute top-0 left-0 flex items-center h-full -z-10"
                >
                  <Image
                    alt="moetar"
                    src="/images/left-blob.png"
                    width={1257}
                    height={707}
                    className="w-auto h-auto"
                  />
                </motion.div>
              )}
              {!isSidebarVisible && (
                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="absolute top-0 right-0 flex items-center h-full -z-10"
                >
                  <Image
                    alt="moetar"
                    src="/images/right-blob.png"
                    width={1257}
                    height={707}
                    className="w-auto h-auto"
                  />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
