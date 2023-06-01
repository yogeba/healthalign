import Image from "next/image";
import React, { useState } from "react";

const optionsList = [
  "vitamins C",
  "Bounty b-Complex",
  "folic acid",
  "bountry b-complex",
  //   "folic Acid",
];
function ProductsOptions() {
  const [selectedFilter, setSelectedFilter] = useState(optionsList[0]);
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex justify-center gap-5 pt-6 border-[#E9E9E9] border-y">
        {optionsList.map((item, index) => {
          return (
            <button
              onClick={() => setSelectedFilter(item)}
              key={index}
              className="h-[30px] flex items-start relative"
            >
              <h2 className="text-[14px] font-bold font-InaiMathi first-letter:capitalize">
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
      <div className="pt-[23px] mx-auto">
        <div className="flex gap-5 overflow-x-auto ">
          {optionsList.map((item, index) => {
            return (
              <div
                key={index}
                className="border relative w-[222px] p-[17px] gap-4 border-[#0000001A] rounded-[15px] flex h-full"
              >
                <Image
                  alt="moetar"
                  src="/images/product-option.png"
                  width={66}
                  height={131}
                  className="h-[131px] w-[66px] flex-grow"
                />
                <div className="flex flex-col w-full gap-1">
                  <div className="text-xs font-bold font-InaiMathi text-[#595959]">
                    Nature's Bounty B- Complex With Folic Acid
                  </div>
                  <div className="text-[7px] font-normal text-[#888888] font-InaiMathi ">
                    Lorem ipsum dolor sit amet, conse ctetur adipiscing elit,
                    sed do eiusm od tempor incididunt ut labore et d olore magna
                    aliqua. Ut enim ad mi nim veniam, quis nostrud exercitat ion
                    ullamco laboris.
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="h-[26px] cursor-pointer absolute right-1.5 rounded-full bottom-1.5 p-0.5 w-[26px] bg-[#00A02C]">
                    <div className="text-[7px] font-bold font-Poppins rounded-full flex justify-center items-center h-full border border-white text-white">
                      5.0
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProductsOptions;
