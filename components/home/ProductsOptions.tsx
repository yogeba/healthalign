import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
interface PrductOptionsProps {
  optionsList: string[];
}
interface APIData {
  _id: string;
  identifier: string;
  title: string;
  vendor: string;
  marketplace: string;
  description: string;
  url: string;
  isAvailable: boolean;
  images: { url: string }[];
  variants: { title: string; image: { url: string } }[];
  price: {
    displayValue: string;
    currency: string;
    value: number;
  };
  ASIN: string;
  manufacturer: null | string;
  tags: string[];
  categories: { name: string; categoryID: string }[];
  grade: string;
  properties: {
    [key: string]: {
      found: string;
      claimed: string;
    };
  };
  ingredients: string[];
  score: number;
  parentCategory: string;
}

const ProductsOptions: React.FC<PrductOptionsProps> = ({ optionsList }) => {
  const [selectedFilter, setSelectedFilter] = useState(optionsList[0]);
  const [allProductData, setAllProductData] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    // const host = req.headers.host;
    const fetchData = async () => {
      const apiUrl = `api/search?searchQuery=${selectedFilter}`;
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setAllProductData(sortByGrade(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [selectedFilter]);

  const sortByGrade = (apiData: APIData[]) => {
    // Update the parameter type to an array of APIData objects
    const sortedData = apiData.sort((a, b) => {
      const gradeA = a.grade;
      const gradeB = b.grade;

      // Extract grade values without the positive/negative symbols
      const processedGradeA = gradeA.replace(/[+-]/, "");
      const processedGradeB = gradeB.replace(/[+-]/, "");

      // Compare grades alphabetically
      if (processedGradeA < processedGradeB) {
        return -1;
      } else if (processedGradeA > processedGradeB) {
        return 1;
      }

      // If grades are the same, consider positive/negative symbols
      const positiveA = gradeA.includes("+");
      const positiveB = gradeB.includes("+");

      if (positiveA && !positiveB) {
        return -1;
      } else if (!positiveA && positiveB) {
        return 1;
      }

      return 0; // Grades are equal
    });

    // Update the state with the sorted data, if needed
    return sortedData;
  };

  const individualProductClick = (data: any) => {
    const id = data.ASIN;

    // Redirect to "/products" with parameters using the Router
    router.push({
      pathname: "/product",
      query: { id },
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center w-full h-full"
      >
        <div className="flex flex-shrink-0 justify-center w-full border-[#E9E9E9] border-y">
          <div className="flex justify-center gap-5 pt-6 max-w-[90%] overflow-x-auto scrollbar-thin">
            {optionsList.map((item, index) => (
              <button
                onClick={() => setSelectedFilter(item)}
                key={index}
                className="h-[30px] flex items-start relative"
              >
                <h2 className="text-[6px] sm:text-[9px] md:text-[14px] font-bold font-InaiMathi capitalize">
                  {item}
                </h2>
                {selectedFilter === item && (
                  <div className="absolute w-full h-[3px] border bottom-0 bg-black border-black rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.8 }}
          className="pt-[23px] mx-auto"
        >
          <div className="flex flex-shrink-0 w-full overflow-x-auto h-full pb-3 max-w-[80vw] lg:max-w-[1024px] gap-5 scrollbar-thin">
            {allProductData.length > 0 ? (
              allProductData.map((item: any, index: number) => {
                const { description, images, title, grade } = item;

                // if (image_url.startsWith("//")) {
                //   cleanedImageUrl = cleanedImageUrl.replace(/^\/\//, "");
                // }
                // if (!cleanedImageUrl.startsWith("https://")) {
                //   cleanedImageUrl = `https://${cleanedImageUrl}`;
                // } else {
                //   cleanedImageUrl = cleanedImageUrl;
                // }
                return (
                  <div
                    onClick={() => individualProductClick(item)}
                    key={index}
                    className="border cursor-pointer relative w-[180px] md:w-[222px] flex-shrink-0 p-[17px] gap-4 border-[#0000001A] rounded-[15px] flex h-full"
                  >
                    <div className="flex-grow flex-shrink-0">
                      <Image
                        alt="moetar"
                        src={images.length > 0 && images[0].url}
                        width={66}
                        height={131}
                        className="h-[60px] w-[30px] md:h-[131px] md:w-[66px]"
                      />
                    </div>
                    <div className="flex flex-col gap-1 w-[60%]">
                      <div className="text-[6px] sm:text-[8px] md:text-xs font-bold font-InaiMathi text-[#595959] line-clamp-3">
                        {title ?? ""}
                      </div>
                      <div className="text-[5px] line-clamp-4 sm:text-[6px] md:text-[7px] font-normal text-[#888888] font-InaiMathi ">
                        {description ?? ""}
                      </div>
                    </div>
                    <div className="flex items-center gap-5">
                      <div className="h-[16px] w-[16px]  md:h-[30px] cursor-pointer absolute right-1.5 rounded-full bottom-1.5 p-0.5 md:w-[30px] bg-[#00A02C]">
                        <div className=" text-[4.5px] sm:text-[5px] md:text-[10px] font-bold font-Poppins rounded-full flex justify-center items-center h-full border border-white text-white">
                          {grade}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="font-bold font-Poppins ">No product found</div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductsOptions;
