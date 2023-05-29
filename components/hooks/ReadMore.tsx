import { useState } from "react";

const useReadMore = (initialLimit: number = 100) => {
  const [limit, setLimit] = useState(initialLimit);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleReadMore = () => {
    setIsExpanded(true);
    setLimit(Number.MAX_SAFE_INTEGER);
  };

  const handleReadLess = () => {
    setIsExpanded(false);
    setLimit(initialLimit);
  };

  return { limit, isExpanded, handleReadMore, handleReadLess };
};

export default useReadMore;
