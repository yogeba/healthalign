import { motion } from "framer-motion";

interface PerformanceCircleProps {
  performance: number;
}

const PerformanceCircle: React.FC<PerformanceCircleProps> = ({
  performance,
}) => {
  const checkperfomance = (value: number) => {
    return value > 20 ? value - 9 : value;
  };
  const circleSize = 100;
  const circleRadius = circleSize / 2;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const progress = checkperfomance(performance) / 100;
  const dashOffset = circleCircumference * (1 - progress);

  return (
    <div className="relative w-[164px] h-[164px] ">
      <svg
        className="absolute top-0 left-0 "
        viewBox={`0 0 ${circleSize} ${circleSize}`}
      >
        <circle
          cx={circleRadius}
          cy={circleRadius}
          r={circleRadius - 5}
          fill="transparent"
          stroke="#F3F3F3"
          strokeWidth="10"
        />
        <motion.circle
          cx={circleRadius}
          cy={circleRadius}
          r={circleRadius - 4.7}
          fill="none"
          stroke="#00A02C"
          strokeWidth="10"
          strokeLinecap="round"
          initial={{
            strokeDasharray: circleCircumference,
            strokeDashoffset: circleCircumference,
          }}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </svg>
      <div className="absolute top-0 left-0 flex justify-center  items-center w-full h-full">
        <div className="flex flex-col gap-2.5 justify-center items-center">
          <span className="text-2xl font-semibold font-Poppins text-[#3C3C3C]">
            {performance}%
          </span>
          <span className="font-Poppins text-[10px] font-semibold text-[#3C3C3C]">
            Out of 100
          </span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceCircle;
