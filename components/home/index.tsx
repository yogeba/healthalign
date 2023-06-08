import React, { useState, useEffect } from "react";
import Image from "next/image";

import CommonHeader from "../common/Header";
import RightSideBar from "./RightSideBar";
import LeftSideBar from "./LeftSideBar";
import { motion } from "framer-motion";

function HomePage() {
  const [generatedBios, setGeneratedBios] = useState<string>("");
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string | null>("");
  const [allSupplementNames, setAllSupplementNames] = useState<string[]>([]);

  const extractSupplementNames = (response: string) => {
    const lines = response.split("\n");
    const question10Supplements = lines.find((line) => line.startsWith("10."));
    const question11Supplements = lines.find((line) => line.startsWith("11."));

    const supplementNames = question10Supplements
      ? question10Supplements
          .replace(/^10\.\s*/, "")
          .replace(/^.*include /, "")
          .split(", ")
          .map((name) => name.replace("and ", ""))
          .map((name) => name.replace("and", ""))
          .map((name) => name.replace(".", ""))
      : [];

    const plantBasedSupplementNames = question11Supplements
      ? question11Supplements
          .replace(/^11\.\s*/, "")
          .replace(/^.*include /, "")
          .split(", ")
          .map((name) => name.replace("and ", ""))
          .map((name) => name.replace("and", ""))
          .map((name) => name.replace(".", ""))
      : [];

    setAllSupplementNames(supplementNames);

    return { supplementNames, plantBasedSupplementNames };
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "supplementNames",
        JSON.stringify(allSupplementNames)
      );
    }
  }, [allSupplementNames]);

  /*  useEffect(() => {
    console.log(allSupplementNames, "allSupplementNames");
    extractSupplementNames(generatedBios);
    if (typeof window !== "undefined" && generatedBios.length > 0) {
      console.log(generatedBios, "generatedBios");
      localStorage.setItem("resultData", JSON.stringify(generatedBios));
    }
  }, [allSupplementNames]); */

  useEffect(() => {
    if (typeof window !== "undefined") {
      const resultData: string | null = localStorage.getItem("resultData");
      const data: string = resultData ? JSON.parse(resultData) : "";

      if (data.length > 0) {
        setGeneratedBios(data);
      }
    }
  }, []);

  const toggleDivVisibility = () => {
    setIsSidebarVisible((prevVisible) => !prevVisible);
  };

  const leftSidebarAnimation = {
    hidden: {
      translateX: "-100%",
      opacity: 0,
      width: 0,
      height: 0,
    },
    visible: {
      translateX: 0,
      opacity: 1,
      width: "100%",
      hight: "100%",
    },
  };

  return (
    <div className="relative w-full h-screen">
      <div className="absolute hidden w-48 h-48 bg-orange-100 rounded-full opacity-50 lg:block -bottom-2- left-36 mix-blend-multiply fliter blur-xl animate-blob animation-delay-4000"></div>
      <div className="absolute hidden bg-purple-200 rounded-full opacity-50 lg:block bottom-20 left-1/3 w-80 h-80 mix-blend-multiply fliter blur-xl animate-blob"></div>
      <div className="hidden lg:block absolute bg-green-100 rounded-full opacity-50 right-16 top-[20%] w-72 h-72 mix-blend-multiply fliter blur-xl animate-blob animation-delay-2000"></div>
      <div className="flex flex-col w-full h-full">
        <div className="">
          <CommonHeader />
        </div>
        {/* <div className="flex items-center justify-center h-full mx-4 md:mx-8 lg:mx-auto lg:container"> */}
        <div className="flex items-center justify-center h-full ">
          <div
            className={`flex flex-col items-center gap-10 md:w-full md:h-full lg:gap-0 lg:flex-row ${
              !isSidebarVisible && "h-full"
            }`}
          >
            {/* leftSidebar */}
            <motion.div
              className={`lg:border-r relative lg:shadow-[1px_6px_10px_0px_#00000033] flex h-full lg:max-w-[500px]`}
              variants={leftSidebarAnimation}
              initial={isSidebarVisible ? "visible" : "hidden"}
              animate={isSidebarVisible ? "visible" : "hidden"}
              transition={{ duration: 0.4 }}
            >
              <LeftSideBar
                setSearchValue={setSearchValue}
                setGeneratedBios={setGeneratedBios}
                setIsSidebarVisible={setIsSidebarVisible}
              />
            </motion.div>
            <div className="relative flex items-center justify-center w-full h-full">
              {generatedBios.length > 0 && (
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
              )}
              <RightSideBar
                isLeftSideBarVisible={isSidebarVisible}
                generatedBios={generatedBios}
                searchValue={searchValue}
                setGeneratedBios={setGeneratedBios}
                setSearchValue={setSearchValue}
                allSupplementNames={allSupplementNames}
              />
              {!isSidebarVisible && (
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="absolute top-0 left-0 items-center hidden h-full lg:flex -z-10"
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
                  className="absolute top-0 right-0 items-center hidden h-full lg:flex -z-10"
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
