import React from "react";
import { Toaster, toast } from "react-hot-toast";
import Image from "next/image";
import useReadMore from "../hooks/ReadMore";
import AudioPlayer from "./AudioPlayer";

interface ResultCardProps {
  generatedBio: string;
}

const initialWordCount = 230;

const ResultCard: React.FC<ResultCardProps> = ({ generatedBio }) => {
  const { limit, isExpanded, handleReadMore, handleReadLess } =
    useReadMore(initialWordCount);

  return (
    <div className="relative mx-5 xs:mx-0 md:mx-[50px] h-full rounded-[28px] md:max-w-5xl lg:w-[900px] px-6 md:px-12 flex md:items-center gap-10 justify-between shadow-[0px_0px_7px_0px_#00000029] bg-white">
      <div className="flex flex-col w-full h-full gap-3 py-6">
        {/* waweform audio data */}
        <div className="flex">
          {/* <AudioPlayer audioFile={"audio/Lorem_ipsum.mp3"} /> */}
        </div>
        <div className="text-sm font-Poppins inline cursor-copy font-normal leading-6 text-[#0000008F] text-justify">
          <span
            onClick={() => {
              navigator.clipboard.writeText(generatedBio);
              toast("Bio copied to clipboard", {
                icon: "✂️",
              });
            }}
            className="text-sm font-Poppins inline cursor-copy font-normal leading-6 text-[#0000008F] text-justify"
          >
            {isExpanded
              ? generatedBio?.replace(/^\d+\.\s*/, "")
              : generatedBio?.replace(/^\d+\.\s*/, "").slice(0, limit)}
          </span>
          {generatedBio?.replace(/^\d+\.\s*/, "").length > initialWordCount &&
            (isExpanded ? (
              <button onClick={handleReadLess}>
                <span className="inline-block px-2 font-bold">Read Less</span>
              </button>
            ) : (
              <button onClick={handleReadMore}>
                ......{" "}
                <span className="inline-block px-2 font-bold">Read More</span>
              </button>
            ))}
        </div>
      </div>

      <div className="flex justify-end flex-shrink-0 ">
        <Image
          alt="moetar"
          src="/images/image/flower-pana-1.png"
          width={184}
          height={184}
          className="h-[90px] w-[90px] md:h-[184px] md:w-[184px]"
        />
      </div>
      <button className="absolute hidden md:block right-4 top-4">
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
    </div>
  );
};

export default ResultCard;
