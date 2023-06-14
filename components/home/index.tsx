import React, { useState, useEffect } from "react";
import Image from "next/image";

import CommonHeader from "../common/Header";
import RightSideBar from "./RightSideBar";
import LeftSideBar from "./LeftSideBar";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";

function HomePage() {
  const [generatedBios, setGeneratedBios] = useState<string>("");
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string | null>("");
  const [allSupplementNames, setAllSupplementNames] = useState<string[]>([]);
  const [isMobileView, setisMobileView] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isMobile = window.innerWidth <= 768;
      setisMobileView(isMobile);
    }
  }, []);

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

  useEffect(() => {
    extractSupplementNames(generatedBios);
  }, [generatedBios]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const resultData: string | null = localStorage.getItem("resultData");
      const data: any =
        resultData !== "undefined" && resultData ? JSON.parse(resultData) : "";
      if (data && data.resultData.length > 0 && data.question.length > 0) {
        toast
          .promise(new Promise<void>((resolve) => setTimeout(resolve, 2500)), {
            loading: "Fetching data...",
            success: "All data fetched",
            error: "Error while fetching data",
          })
          .then(() => {
            setGeneratedBios(data.resultData);
            setSearchValue(data.question);
            setIsSidebarVisible(false);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }, []);

  const toggleDivVisibility = () => {
    setIsSidebarVisible((prevVisible) => !prevVisible);
    if (typeof window !== "undefined") {
      localStorage.setItem("visibility", JSON.stringify(!isSidebarVisible));
    }
  };
  const leftSidebarAnimation = {
    hidden: {
      translateX: "-100%",
      opacity: 0,
      width: 0,
      height: isMobileView ? 0 : "100%",
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
                  className={`absolute hidden lg:flex justify-center items-center z-10 w-[50px] h-[50px] text-white rounded-md cursor-pointer top-2  ${
                    isSidebarVisible
                      ? "bg-[#4DAF00] left-2"
                      : "border-2 border-[#00000061] left-8"
                  }`}
                >
                  {isSidebarVisible ? (
                    <Image
                      alt="back arrow"
                      src="/images/icon/side-bar-icon.svg"
                      width={25}
                      height={25}
                      className="ml-0.5 "
                    />
                  ) : (
                    <Image
                      alt="back arrow"
                      src="/images/icon/side-bar-icon.svg"
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
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
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 2000 }}
      />
    </div>
  );
}

export default HomePage;
