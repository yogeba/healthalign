import useReadMore from "components/hooks/ReadMore";
import Image from "next/image";
import React from "react";

interface CheckoutProductCardProps {
  item: any;
  removeItem: (productId: string, variantId: string) => Promise<void>;
  cleanedImageUrl: string;
  isMobile: boolean;
}

const initialWordCount = 220;

const CheckoutProductCard: React.FC<CheckoutProductCardProps> = ({
  item,
  removeItem,
  cleanedImageUrl,
  isMobile = false,
}) => {
  const { limit, isExpanded, handleReadMore, handleReadLess } =
    useReadMore(initialWordCount);
  return (
    <div
      className={`border h-full relative border-[#0000001A] rounded-lg  px-4 ${
        isMobile ? " py-2" : " py-3"
      }`}
    >
      <h2
        className={`absolute font-bold top-2 right-3 text-[#00A02C] font-Poppins ${
          isMobile ? "text-[8px]" : "text-[10px]"
        }`}
      >
        {item?.product?.price?.displayValue || "0"}
      </h2>
      <button
        onClick={() => removeItem(item.product?.id, item.variant?.id)}
        className="absolute bottom-2 right-3"
      >
        {" "}
        <Image
          alt="moetar"
          src="/images/icon/bin-icon.svg"
          width={10}
          height={10}
        />
      </button>
      {/* image */}
      {isMobile ? (
        <div className="flex flex-shrink-0 h-full gap-4">
          <Image
            alt="moetar"
            src={cleanedImageUrl}
            // src={image}
            width={38}
            height={38}
            className="h-[60px] min-w-[30px] object-cover max-w-[30px]"
          />
          <div className="flex flex-col justify-around pr-7">
            {/* <h1 className="text-[#00A02C] font-bold text-[8px] md:text-[10px]">
                                None
                              </h1> */}
            <h2 className="text-[7px] md:text-[9px] text-[#595959] font-bold font-InaiMathi line-clamp-3">
              {item.product.title || ""}
            </h2>
            <p className="text-[6px] font-InaiMathi font-medium text-[#888888]">
              {isExpanded
                ? item?.product?.description
                : item?.product?.description?.slice(0, limit)}

              {item?.product?.description?.length > initialWordCount &&
                (isExpanded ? (
                  <button onClick={handleReadLess}>
                    <span className="inline-block px-2 font-bold text-black">
                      Read Less
                    </span>
                  </button>
                ) : (
                  <button onClick={handleReadMore}>
                    ......{" "}
                    <span className="inline-block px-2 font-bold text-black">
                      Read More
                    </span>
                  </button>
                ))}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex gap-4">
          <div className="flex items-center h-full">
            <Image
              alt="moetar"
              src={cleanedImageUrl}
              // src={image}
              width={35}
              height={60}
              className="h-[60px] min-w-[30px] object-cover max-w-[30px]"
            />
          </div>
          <div className="flex flex-col justify-around pr-7">
            {/* <h1 className="text-[#00A02C] font-bold text-[10px]">
                                None
                              </h1> */}
            <h2 className="text-[9px] text-[#595959] line-clamp-3 font-bold font-InaiMathi">
              {item.product.title || ""}
            </h2>
            <p className="text-[6px] font-InaiMathi font-medium text-[#888888] ">
              {isExpanded
                ? item?.product?.description
                : item?.product?.description?.slice(0, limit)}

              {item?.product?.description?.length > initialWordCount &&
                (isExpanded ? (
                  <button onClick={handleReadLess}>
                    <span className="inline-block px-2 font-bold text-black">
                      Read Less
                    </span>
                  </button>
                ) : (
                  <button onClick={handleReadMore}>
                    ......{" "}
                    <span className="inline-block px-2 font-bold text-black">
                      Read More
                    </span>
                  </button>
                ))}
              {/* {item.product.description || ""} */}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutProductCard;
