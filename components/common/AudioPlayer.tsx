import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const AudioPlayer = ({ audioFile }: { audioFile: string }) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    let canceled = false;

    const loadWaveSurfer = async () => {
      const WaveSurfer = (await import("wavesurfer.js")).default;

      if (!canceled && waveformRef.current) {
        wavesurfer.current = WaveSurfer.create({
          container: waveformRef.current,
          waveColor: "#c1bbb9",
          progressColor: "#4DAF00",
          autoCenter: true,
          barWidth: 3.2,
          barGap: 2,
          barRadius: 2,
          cursorColor: "white",
          height: 75,
        });
        wavesurfer.current.load(audioFile);
        wavesurfer.current.on("ready", () => {
          if (!canceled) {
            setDuration(wavesurfer.current.getDuration());
          }
        });
      }
    };

    loadWaveSurfer();

    return () => {
      canceled = true;

      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
    };
  }, [audioFile]);

  const togglePlayback = () => {
    if (wavesurfer.current) {
      wavesurfer.current.playPause();
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (duration: number | null) => {
    if (typeof duration === "number") {
      const minutes = Math.floor(duration / 60);
      const seconds = Math.floor(duration % 60);
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    } else {
    }
  };

  return (
    <div className="flex shadow-[0px_0px_3px_0px_#00000040] px-[8px] md:px-[12px] rounded-[15px] h-8 md:h-16 items-center w-full relative gap-3 max-w-[450px] pr-5 md:pr-7 ">
      <h2 className="absolute text-[#0000008F] font-semibold right-0 md:pr-1 text-[8px] md:text-xs -rotate-90 font-Poppins">
        {formatTime(duration)}
      </h2>
      <button
        onClick={togglePlayback}
        className="h-[14px] w-[14px] md:w-8 md:h-8 flex-shrink-0 flex justify-center items-center bg-[#4DAF00] rounded-full"
      >
        {isPlaying ? (
          <Image
            alt="moetar"
            src="/images/icon/play_icon.svg"
            width={20}
            height={20}
            className="w-3 h-3 md:w-5 md:h-5"
          />
        ) : (
          <Image
            alt="moetar"
            src="/images/icon/pause_icon.svg"
            width={20}
            height={20}
            className="w-3 h-3 md:w-5 md:h-5"
          />
        )}
      </button>
      <div ref={waveformRef} className="w-full"></div>
    </div>
  );
};

export default AudioPlayer;
