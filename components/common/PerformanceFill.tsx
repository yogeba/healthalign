import React from "react";
import { motion } from "framer-motion";

interface PerformanceFillProps {
  title: string;
  performance: number;
  quantity: string;
  allData: any;
}

const PerformanceFill: React.FC<PerformanceFillProps> = ({
  title,
  performance,
  quantity,
  allData,
}) => {
  console.log(allData);
  return (
    <div className="flex flex-col gap-2.5">
      <h2 className="text-xs font-semibold text-black first-letter:capitalize font-Poppins">
        {title ?? ""}
      </h2>
      <div className="flex relative flex-col gap-0.5">
        <h2 className="absolute -top-5 right-0 text-[10px] text-end font-semibold font-Poppins text-[#0000005E]">
          {quantity ?? ""}
        </h2>
        <div className="w-full shadow-[0px_0px_2px_0px_#0000006B] rounded-full h-[11px]  bg-white">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${performance}%` }}
            transition={{ duration: 1 }}
            className={` h-full bg-[#00CC3C] rounded-full`}
          ></motion.div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceFill;
