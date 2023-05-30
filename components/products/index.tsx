import React, { useEffect, useRef, useState } from "react";
import CommonHeader from "../common/Header";
import { AnimatePresence, motion } from "framer-motion";
import ProductCardPost from "./ProductCardPost";
import Image from "next/image";

function ProductsPage() {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("Folic Acid");
  const options = ["Folic Acid", "Vitamin C", "Vitamin D"];
  const containerRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef?.current &&
      !containerRef?.current?.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="">
        <CommonHeader />
      </div>
      <div className="h-full mx-7 md:mx-14 lg:mx-auto lg:container">
        <div className="flex flex-col items-center w-full h-full gap-10 lg:gap-0 lg:flex-row">
          <div className="relative flex items-center justify-center w-full h-full">
            <AnimatePresence mode="wait">
              <div
                key="content"
                className="flex flex-col items-center justify-center gap-10 py-12 mx-12 lex 2xl:mx-0"
              >
                <motion.div
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full relative max-w-[900px]"
                >
                  <hr className="border border-[#0000001F]" />
                  <div className="absolute -top-2.5 w-full flex justify-center">
                    <p className="inline-block bg-white text-[#4E4E4E] px-5 font-InaiMathi text-base font-bold">
                      All Vitamins C Products
                    </p>
                  </div>
                  <div className="flex h-[35px] w-[172px] justify-center items-center bg-black shadow-[0px_0px_8px_0px_#00000040] rounded-full absolute right-0 -top-4">
                    <div className="border-r-[1.5px] w-[50%] border-white h-full flex justify-center items-center">
                      <p className="capitalize cursor-pointer text-[8px] mx-2.5 font-bold text-white font-InaiMathi">
                        Sort By
                      </p>
                    </div>
                    <div
                      ref={containerRef}
                      className="flex items-center h-full font-bold flex-grow"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <div className=" border-white h-full flex justify-center items-center">
                        <p className="capitalize cursor-pointer text-[8px] mx-2.5 font-bold text-white font-InaiMathi">
                          {selectedOption}
                        </p>
                      </div>
                      <div className="flex items-center cursor-pointer">
                        <Image
                          alt="moetar"
                          src="/images/icon/left-arrow-icon.svg"
                          width={10}
                          height={10}
                          className={`transition-all duration-500 ${
                            isOpen && "rotate-180"
                          }`}
                        />
                      </div>
                    </div>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-10 right-0 w-[172px] bg-white  z-10 shadow-[0px_0px_8px_0px_#00000040] rounded-b-lg border border-[#0000001F] overflow-hidden"
                        >
                          {options.map((option) => (
                            <motion.li
                              key={option}
                              onClick={() => handleOptionClick(option)}
                              className="px-4 py-2  cursor-pointer"
                              whileHover={{ backgroundColor: "#E5E5E5" }}
                            >
                              {option}
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
                <div className="flex relative flex-col gap-10 py-1.5 max-h-[74vh] overflow-auto scrollbar-thin">
                  <ProductCardPost />
                  <ProductCardPost />
                  <ProductCardPost />
                </div>
              </div>
            </AnimatePresence>

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
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
