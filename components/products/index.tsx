import React, { useEffect, useRef, useState } from "react";
import CommonHeader from "../common/Header";
import { AnimatePresence, motion } from "framer-motion";
import ProductCardPost from "./ProductCardPost";
import Image from "next/image";
import Pagination from "components/common/Pagination";

interface ProductPageProps {
  productsData: any[];
  supplymentData: string[];
}

const ProductsPage: React.FC<ProductPageProps> = ({
  productsData,
  supplymentData,
}) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollableDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = scrollableDivRef.current?.scrollTop || 0;
      setIsScrolling(scrollTop > 0); // Update isScrolling state based on scroll position
    };

    // Attach the scroll event listener to the scrollable div
    const scrollableDiv = scrollableDivRef.current;
    if (scrollableDiv) {
      scrollableDiv.addEventListener("scroll", handleScroll);
    }

    // Clean up the scroll event listener when the component unmounts
    return () => {
      if (scrollableDiv) {
        scrollableDiv.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  console.log(isScrolling, "isScrolling isScrolling");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>(
    supplymentData[0] ?? "all"
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productsData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="relative flex flex-col w-full h-full">
      <div className="absolute bottom-0 z-40 flex justify-center w-full mx-auto">
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duraion: 2 }}
          className={` pt-5 pb-3 px-10  transition-all duration-[400ms] ${
            isScrolling
              ? "bg-[#FCF6FFD9] rounded-t-[32px] shadow-[0px_-2px_22px_0px_#00000040]"
              : "bg-white"
          }`}
        >
          <Pagination
            totalItems={productsData.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </motion.div>
      </div>
      <div className="">
        <CommonHeader />
      </div>
      <div className="h-full">
        <div className="flex flex-col items-center w-full h-full gap-10 lg:gap-0 lg:flex-row">
          <div className="relative flex items-center justify-center w-full h-full">
            <AnimatePresence mode="wait">
              <div
                key="content"
                className="flex flex-col items-center justify-center gap-10 py-12 mx-4 xs:mx-5 md:mx-2 2xl:mx-0"
              >
                <motion.div
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full relative max-w-[900px]"
                >
                  <hr className="sm:border sm:border-[#0000001F]" />
                  <div className="absolute  -top-2.5 w-full flex sm:justify-center">
                    <p className="inline-block text-[10px] bg-white text-[#4E4E4E] pt-0.5 sm:pt-0 pr-3 sm:px-5 font-InaiMathi md:text-base font-bold">
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
                      className="flex items-center justify-between flex-grow h-full pr-2 font-bold"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <div className="flex items-center justify-center h-full border-white ">
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
                      {isOpen && supplymentData.length > 0 && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className={
                            "absolute top-10 right-0 w-[172px] bg-white  z-10 shadow-[0px_0px_8px_0px_#00000040] rounded-b-lg border border-[#0000001F] overflow-hidden"
                          }
                        >
                          {supplymentData.length > 0 &&
                            supplymentData.map((option) => (
                              <motion.li
                                key={option}
                                onClick={() => handleOptionClick(option)}
                                className="px-4 py-2 cursor-pointer"
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
                <div
                  ref={scrollableDivRef}
                  className="flex relative flex-col gap-10 py-1.5 max-h-[76vh] overflow-auto scrollbar-thin"
                >
                  {currentItems.length > 0 &&
                    currentItems.map((item, index) => {
                      const { category, available, image_url, title } = item;
                      let cleanedImageUrl = image_url;
                      if (image_url.startsWith("//")) {
                        cleanedImageUrl = cleanedImageUrl.replace(/^\/\//, "");
                      }
                      if (!cleanedImageUrl.startsWith("https://")) {
                        cleanedImageUrl = `https://${cleanedImageUrl}`;
                      } else {
                        cleanedImageUrl = cleanedImageUrl;
                      }
                      if (available) {
                        return (
                          <ProductCardPost
                            key={index}
                            availability={category}
                            title={title}
                            description={
                              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nost rud exercitation ullamco laboris."
                            }
                            data={item}
                            image={cleanedImageUrl}
                          />
                        );
                      }
                    })}
                </div>
              </div>
            </AnimatePresence>

            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="absolute top-0 left-0 items-center hidden h-full lg:flex -z-10"
            >
              <Image
                alt="left"
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
              className="absolute top-0 right-0 items-center hidden h-full lg:flex -z-10"
            >
              <Image
                alt="right"
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
};

export default ProductsPage;
