import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MARKETPLACE } from "constants/marketplace";
import { useRouter } from "next/router";
import { Product } from "types";

const optionsList = [
  "vitamins C",
  "Bounty b-Complex",
  "folic acid",
  "bountry b-complex",
  "folic Acid",
];
function ProductsOptions() {
  const [selectedFilter, setSelectedFilter] = useState(optionsList[0]);
  const [allProductData, setAllProductData] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    // const host = req.headers.host;
    const fetchData = async () => {
      const apiUrl = `/api/rye?query=supplement`;
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setAllProductData(data.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const getProductMarketplace = (product: Product) => {
    return product?.request_domain === "amazon.com"
      ? MARKETPLACE.AMAZON
      : MARKETPLACE.SHOPIFY;
  };

  const individualProductClick = (data: any) => {
    const id = data.id;
    const type = getProductMarketplace(data);

    // Redirect to "/products" with parameters using the Router
    router.push({
      pathname: "/new/product",
      query: { id, type },
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col w-full h-full"
      >
        <div className="flex justify-center gap-5 pt-6 border-[#E9E9E9] border-y">
          {optionsList.map((item, index) => {
            return (
              <button
                onClick={() => setSelectedFilter(item)}
                key={index}
                className="h-[30px] flex items-start relative"
              >
                <h2 className="text-[6px] sm:text-[9px] md:text-[14px] font-bold font-InaiMathi first-letter:capitalize">
                  {item}
                </h2>
                {selectedFilter === item && (
                  <div className="absolute w-full h-[3px] border bottom-0 bg-black border-black rounded-full"></div>
                )}
              </button>
            );
          })}

          {/* {optionsList.map((item) => {
                 
             })}  */}
        </div>
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.8 }}
          className="pt-[23px] mx-auto"
        >
          <div className="flex flex-shrink-0 w-full overflow-x-auto h-full pb-3 max-w-[80vw] lg:max-w-[1024px] gap-5 scrollbar-thin">
            {allProductData.length > 0 &&
              allProductData.map((item: any, index: number) => {
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
                return (
                  <div
                    onClick={() => individualProductClick(item)}
                    key={index}
                    className="border cursor-pointer relative w-[180px] md:w-[222px] flex-shrink-0 p-[17px] gap-4 border-[#0000001A] rounded-[15px] flex h-full"
                  >
                    <Image
                      alt="moetar"
                      src={cleanedImageUrl}
                      width={66}
                      height={131}
                      className="h-[60px] w-[30px] md:h-[131px] md:w-[66px] flex-grow"
                    />
                    <div className="flex flex-col w-full gap-1">
                      <div className="text-[6px] sm:text-[8px] md:text-xs font-bold font-InaiMathi text-[#595959] line-clamp-3">
                        {title ?? ""}
                      </div>
                      <div className="text-[5px] sm:text-[6px] md:text-[7px] font-normal text-[#888888] font-InaiMathi ">
                        Lorem ipsum dolor sit amet, conse ctetur adipiscing
                        elit, sed do eiusm od tempor incididunt ut labore et d
                        olore magna aliqua. Ut enim ad mi nim.
                      </div>
                    </div>
                    <div className="flex items-center gap-5">
                      <div className="h-[16px] w-[16px]  md:h-[26px] cursor-pointer absolute right-1.5 rounded-full bottom-1.5 p-0.5 md:w-[26px] bg-[#00A02C]">
                        <div className=" text-[4.5px] sm:text-[5px] md:text-[7px] font-bold font-Poppins rounded-full flex justify-center items-center h-full border border-white text-white">
                          5.0
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ProductsOptions;
