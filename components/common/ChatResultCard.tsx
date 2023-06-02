import Image from "next/image";
import React from "react";
import AudioPlayer from "./AudioPlayer";
import useReadMore from "components/hooks/ReadMore";

interface ResultCardProps {
  generatedBio: string;
}

const initialWordCount = 200;

const ChatResultCard: React.FC<ResultCardProps> = ({ generatedBio }) => {
  const { limit, isExpanded, handleReadMore, handleReadLess } =
    useReadMore(initialWordCount);
  return (
    <div className="flex items-start justify-start w-[90vw] gap-3">
      <Image
        alt="moetar"
        src="/images/user.png"
        width={25}
        height={25}
        className="flex-shrink-0 rounded-full"
      />
      <div className="shadow-[0px_0px_4.086124897003174px_0px_#00000029] p-1.5 rounded-[16px] w-full max-w-[250px] sm:max-w-[300px] flex flex-col gap-2.5">
        <div className="w-full py-1">
          <AudioPlayer audioFile={"audio/Lorem_ipsum.mp3"} />
        </div>
        <div className="px-2.5 text-[10px] font-normal font-Poppins text-justify">
          {isExpanded
            ? generatedBio?.replace(/^\d+\.\s*/, "")
            : generatedBio?.replace(/^\d+\.\s*/, "").slice(0, limit)}

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
    </div>
  );
};

export default ChatResultCard;
