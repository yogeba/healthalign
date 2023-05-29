import React from "react";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import Image from "next/image";
import useReadMore from "../hooks/ReadMore";

interface ResultCardProps {
  generatedBio: string;
}

const initialWordCount = 200;

const ResultCard: React.FC<ResultCardProps> = ({ generatedBio }) => {
  const { limit, isExpanded, handleReadMore, handleReadLess } =
    useReadMore(initialWordCount);
  const handlePlayButtonCLick = () => {};
  return (
    <motion.div
      className="border relative mx-5 md:mx-[50px] h-[200px] border-[#00000059] rounded-[28px] py-2 max-w-5xl lg:w-[900px] px-12 flex items-center gap-10 justify-between"
      // variants={zoomOutVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 1 }}
    >
      <div>
        <p
          onClick={() => {
            navigator.clipboard.writeText(generatedBio);
            toast("Bio copied to clipboard", {
              icon: "✂️",
            });
          }}
          className="text-base inline cursor-copy font-normal leading-6 text-[#0000008F] text-justify"
        >
          {isExpanded
            ? generatedBio?.replace(/^\d+\.\s*/, "")
            : generatedBio.replace(/^\d+\.\s*/, "").slice(0, limit)}
        </p>
        {generatedBio?.replace(/^\d+\.\s*/, "").length > initialWordCount &&
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

      <div className="flex justify-end flex-shrink-0">
        <Image
          alt="moetar"
          src="/images/image/flower-pana-1.png"
          width={184}
          height={184}
          className="h-[184px] w-[184px]"
        />
      </div>
      <button
        onClick={() => handlePlayButtonCLick()}
        className="absolute right-4 top-4"
      >
        <Image
          alt="moetar"
          src="/images/icon/post-play-button.svg"
          width={25}
          height={25}
        />
      </button>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 2000 }}
      />
    </motion.div>
  );
};

export default ResultCard;
