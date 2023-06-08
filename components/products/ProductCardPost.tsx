import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import useReadMore from "components/hooks/ReadMore";

const initialWordCount = 150;

interface ProductCardPostProps {
  title: string;
  image: string;
  description: string;
  data: any;
}
const ProductCardPost: React.FC<ProductCardPostProps> = ({
  title,
  image,
  description,
  data,
}) => {
  const { limit, isExpanded, handleReadMore, handleReadLess } =
    useReadMore(initialWordCount);
  const router = useRouter();

  const [isHovered, setisHovered] = useState<Boolean>(false);
  const zooInVariants = {
    hidden: { scale: 0, y: 400, opacity: 0 },
    visible: { scale: 1, y: 0, opacity: 1 },
  };

  const handleNextClick = async () => {
    console.log("clicked next", data.id);
    const id = data.ASIN;
    // const type = getProductMarketplace(data);

    // Redirect to "/products" with parameters using the Router
    router.push({
      pathname: "/product",
      query: { id },
    });
  };

  return (
    <motion.div
      className="relative mx-8 md:mx-[50px] rounded-[28px] py-4 md:py-[24px] max-w-5xl lg:w-[900px] px-4 md:px-8 flex items-center gap-10 cursor-pointer justify-between shadow-[0px_0px_7px_0px_#00000029] bg-white h-full"
      variants={zooInVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 1 }}
      onClick={() => handleNextClick()}
      onMouseEnter={() => setisHovered(true)}
      onMouseLeave={() => setisHovered(false)}
    >
      <div className="flex w-full h-full gap-4">
        <div className="flex-shrink-0 h-full">
          <Image
            alt="moetar"
            src={image}
            // src={image}
            width={152}
            height={152}
            className="h-[100px] w-[80px] md:h-[150px] md:w-[100px]"
          />
        </div>
        <div className="relative flex justify-start flex-grow">
          <div className="flex flex-col gap-[9px] pr-8 md:pr-0">
            <p className="text-xs hidden font-bold font-InaiMathi text-[#00A02C]">
              {/* None */}
              {/* {availability ?? "None"} */}
            </p>
            <h2 className="text-[10px] line-clamp-4 md:line-clamp-none text-justify md:text-start md:text-sm lg:text-base lg:text-[21px] leading-[16px] md:leading-[26px] text-[#595959] font-InaiMathi  xs:md:max-w-[80%] xl:max-w-[520px] font-bold ">
              {/* Nature Bounties D-Complex With Folic Acid Plus Vitamins C */}
              {title ?? ""}
            </h2>
            {data.description.length > 0 && (
              <div className="text-sm font-normal pr-2 font-InaiMathi text-[#888888] max-w-[580px] text-justify">
                {isExpanded
                  ? data.description
                  : data.description.slice(0, limit)}
                {description.length > initialWordCount &&
                  (isExpanded ? (
                    <button onClick={handleReadLess}>
                      <span className="inline-block px-2">Read Less</span>
                    </button>
                  ) : (
                    <button onClick={handleReadMore}>
                      ......{" "}
                      <span className="inline-block px-2">Read More</span>
                    </button>
                  ))}
              </div>
            )}
            {/* product button */}
            <div className="absolute flex items-center h-full -right-4 product md:right-4">
              <div
                className={`h-10 w-10 md:h-[52px] md:w-[52px] rounded-full transition-all duration-700  p-1.5 bg-[#00A02C] `}
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
                      className="h-[14px] w-[14px] md:w-[25px] md:h-[25px] hover:animate-pulse "
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
        className={`h-10 w-10 md:h-[52px] md:w-[52px] absolute -left-6 rounded-full transition-all duration-700  p-1.5 ${
          isHovered ? "bg-black" : "bg-white shadow-[0px_0px_6px_0px_#00000040]"
        }`}
      >
        <div
          className={`w-full h-full border  rounded-full font-Poppins text-[13px] md:text-lg font-semibold  flex transition-all duration-700 justify-center items-center ${
            isHovered ? "border-white text-white" : "border-black text-black"
          }`}
        >
          {data?.grade}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCardPost;
