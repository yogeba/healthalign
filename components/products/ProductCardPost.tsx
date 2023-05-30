import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import useReadMore from "../hooks/ReadMore";
import { useRouter } from "next/router";

const initialWordCount = 252;

function ProductCardPost() {
  const router = useRouter();
  const { limit, isExpanded, handleReadMore, handleReadLess } =
    useReadMore(initialWordCount);
  const [isHovered, setisHovered] = useState<Boolean>(false);
  const zooInVariants = {
    hidden: { scale: 0, y: 400, opacity: 0 },
    visible: { scale: 1, y: 0, opacity: 1 },
  };

  const textData =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nost rud exercitation ullamco laboris.";

  const handleNextClick = () => {
    console.log("clicked next");
    router.push("/new/product");
  };

  return (
    <motion.div
      className="relative mx-5 md:mx-[50px] h-[200px] rounded-[28px] py-[24px] max-w-5xl lg:w-[900px] px-8 flex items-center gap-10 cursor-pointer justify-between shadow-[0px_0px_7px_0px_#00000029]"
      variants={zooInVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 1 }}
      onMouseEnter={() => setisHovered(true)}
      onMouseLeave={() => setisHovered(false)}
    >
      <div className="flex  h-full w-full gap-4">
        <div className="h-full flex-shrink-0">
          <Image
            alt="moetar"
            src="/images/product-image.png"
            width={152}
            height={152}
            className="h-[152px] w-[152px]"
          />
        </div>
        <div className="flex-grow relative flex justify-start">
          <div className="flex flex-col gap-[9px]">
            <p className="text-xs font-bold font-InaiMathi text-[#00A02C]">
              None
            </p>
            <h2 className="text-[21px] leading-[26px] text-[#595959] font-InaiMathi max-w-[450px] font-bold">
              Nature Bounties D-Complex With Folic Acid Plus Vitamins C
            </h2>
            <div className="text-sm font-normal font-InaiMathi text-[#888888] max-w-[580px]">
              {isExpanded ? textData : textData.slice(0, limit)}
              {textData.length > initialWordCount &&
                (isExpanded ? (
                  <button onClick={handleReadLess}>
                    <span className="inline-block px-2">Read Less</span>
                  </button>
                ) : (
                  <button onClick={handleReadMore}>
                    ...... <span className="inline-block px-2">Read More</span>
                  </button>
                ))}
            </div>
            {/* product button */}
            <div className="product absolute right-4 h-full flex items-center">
              <div
                className={`h-[52px] w-[52px] rounded-full transition-all duration-700  p-1.5 bg-[#00A02C] `}
              >
                <div
                  className={`w-full h-full border  rounded-full font-Poppins text-lg font-semibold flex transition-all duration-700 justify-center items-center border-white text-white`}
                >
                  <button onClick={() => handleNextClick()}>
                    <Image
                      alt="moetar"
                      src="/images/icon/right-arrow.svg"
                      width={25}
                      height={25}
                      className="hover:animate-pulse"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
      {/* grade */}
      <div
        className={`h-[52px] w-[52px] absolute -left-6 rounded-full transition-all duration-700  p-1.5 ${
          isHovered ? "bg-black" : "bg-white shadow-[0px_0px_6px_0px_#00000040]"
        }`}
      >
        <div
          className={`w-full h-full border  rounded-full font-Poppins text-lg font-semibold  flex transition-all duration-700 justify-center items-center ${
            isHovered ? "border-white text-white" : "border-black text-black"
          }`}
        >
          A+
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCardPost;
