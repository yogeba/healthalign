import React, { useEffect, useState } from "react";
import Image from "next/image";

import PerformanceCircle from "../common/PerformanceCircle";
import CommonHeader from "../common/Header";
import { motion } from "framer-motion";
import PerformanceFill from "../common/PerformanceFill";
import Link from "next/link";
import { MARKETPLACE } from "constants/marketplace";
import { fetchProduct } from "lib/products";
import { addCartItems, createCart } from "lib/cart";
import { Product } from "types/searchProduct";
import { Toaster, toast } from "react-hot-toast";

const alphabetTabData = [
  { title: "A", isSelected: true, value: "47" },
  { title: "B", isSelected: false, value: "35" },
  { title: "C", isSelected: false, value: "34" },
  { title: "D", isSelected: false, value: "30" },
  { title: "E", isSelected: false, value: "35" },
  { title: "F", isSelected: false, value: "30" },
];

interface ProductPageProps {
  productData: any;
}

const ProductPage: React.FC<ProductPageProps> = ({ productData }) => {
  const [isSelectedTabCertification, setSelectedTabCertification] =
    useState<Boolean>(false);

  const [imageData, setimageData] = useState(
    productData.images.length > 0 && productData.images.map((i: any) => i.url)
  );

  const [selectedImage, setselectedImage] = useState<string>(imageData[0]);

  const handleProductImageClick = (image: string) => {
    setselectedImage(image);
  };

  const [cartId, setCartId] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCartId = localStorage.getItem("cartId");
      if (savedCartId) {
        setCartId(savedCartId);
      }
    }
  }, []);

  const buttonVariants = {
    initial: { x: -1 },
    animate: { x: 0 },
  };

  const performanceData = Object.entries(productData.properties).map(
    ([key, value], index) => {
      const { found } = value as { found: any };
      // parseFloat(uspLimit)
      return {
        index,
        title: key,
        quantity: found ?? found,
        performance: 15,
      };
    }
  );

  // Calculate the number of divs needed based on the data length
  const numDivs = Math.ceil(performanceData.length / 4);

  const addToCart = async (product: Product) => {
    console.log(product, "product this is product data new");
    const input = {
      items: {
        amazonCartItemsInput: [],
        shopifyCartItemsInput: [],
      },
    };

    const marketplace =
      product?.marketplace === "AMAZON"
        ? MARKETPLACE.AMAZON
        : MARKETPLACE.SHOPIFY;
    const productDetails = await fetchProduct(product.identifier, marketplace);

    if (marketplace === MARKETPLACE.AMAZON) {
      input.items.amazonCartItemsInput = [
        { productId: product.identifier, quantity: 1 },
      ];
    }

    if (marketplace === MARKETPLACE.SHOPIFY) {
      input.items.shopifyCartItemsInput = [
        { variantId: product?.variants[0]?.id, quantity: 1 },
      ];
    }

    if (!cartId) {
      // const { data: createCartData } = await createCart(input);
      const createCartData = await createCart(input);
      localStorage.setItem("cartId", createCartData.createCart.cart.id);
      setCartId(createCartData.createCart.cart.id);
    } else {
      await addCartItems({ id: cartId, items: input.items });
    }

    toast.success("Product added to cart");

    console.log(productDetails, "productDetails");
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="">
        <CommonHeader />
      </div>
      <div className="h-full ">
        <div className="flex flex-col items-center w-full h-full gap-10 lg:gap-0 lg:flex-row">
          <div className="relative flex items-center justify-center w-full h-full py-4 md:py-10 xl:py-10">
            <div className="shadow-[0px_0px_7px_0px_#00000029] bg-white rounded-[28px] max-w-[900px] h-full  w-full">
              <div className="flex flex-col py-10 md:py-0 md:gap-0 md:flex-row w-full h-full  md:max-h-[410px] border-b border-[#00000017]">
                {/* upper div */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="flex justify-center items-center md:w-[90%] flex-col gap-5 md:border-r border-[#00000017]"
                >
                  <div className="">
                    {/* main image */}
                    <motion.div
                      initial={{ boxShadow: "none" }}
                      animate={{
                        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)",
                      }}
                      transition={{ duration: 2 }}
                      className=" h-[180px] w-[180px] md:h-[230px] md:w-[240px] flex justify-center items-center rounded-full"
                    >
                      <Image
                        alt="moetar"
                        src={`${selectedImage ?? ""}`}
                        // src={`/images/${selectedImage ?? ""}`}
                        width={214}
                        height={214}
                        className="rounded-full h-[170px] w-[170px] md:h-[214px] md:w-[214px]"
                      />
                    </motion.div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    {/* Image slider */}
                    {productData?.images.length > 0 &&
                      productData?.images
                        .map((i: any) => {
                          return i.url;
                        })
                        .splice(0, 4)
                        .map((item: string, index: number) => {
                          return (
                            <motion.button
                              key={index}
                              initial={{ boxShadow: "none" }}
                              animate={{
                                boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)",
                              }}
                              transition={{ duration: 2 }}
                              onClick={() => handleProductImageClick(item)}
                              className="h-[58px] relative w-[58px] flex justify-center items-center rounded-full"
                            >
                              <Image
                                alt="moetar"
                                src={`${item}`}
                                // src={`/images/${item}`}
                                width={54}
                                height={54}
                                className="rounded-full h-[54px] w-[54px]"
                              />
                              {selectedImage === item && (
                                <div className="absolute w-full -bottom-5">
                                  <Image
                                    alt="moetar"
                                    src="/images/icon/selected-product-icon.svg"
                                    width={60}
                                    height={60}
                                  />
                                </div>
                              )}
                            </motion.button>
                          );
                        })}
                  </div>
                </motion.div>
                <div className="flex flex-col justify-around w-full py-10">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="flex w-full max-w-[200px] mx-auto border rounded-[33px]  shad-w-[0px_0px_4px_0px_#00000040] my-3 gap-1"
                  >
                    <motion.button
                      initial="initial"
                      animate={isSelectedTabCertification ? "animate" : "exit"}
                      variants={buttonVariants}
                      transition={{ duration: 0.5 }}
                      onClick={() => setSelectedTabCertification(false)}
                      className={`h-10 rounded-full flex justify-center items-center w-full text-xs transition-all duration-300 font-semibold font-Poppins  ${
                        !isSelectedTabCertification
                          ? "bg-[#00A02C] text-white"
                          : "text-[#ABABAB] bg-white"
                      }`}
                    >
                      Lab Test Score
                    </motion.button>
                  </motion.div>
                  <div className="flex justify-center w-full ">
                    <PerformanceCircle performance={productData?.score} />
                  </div>
                  <div className="flex items-end justify-center gap-3">
                    {alphabetTabData.map((item, index) => {
                      const { title, isSelected, value } = item;
                      return (
                        <motion.div
                          initial={{ opacity: 0, y: 45 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 1.5 }}
                          key={index}
                          style={{ height: `${value}px` }}
                          className={`w-[22px] text-[8px] cursor-pointer font-semibold font-Poppins flex items-end justify-center py-1.5  rounded-full ${
                            productData.grade.split("")[0] === title
                              ? "bg-[#00A02C] text-white"
                              : "bg-[#F3F3F3] text-[#A8A8A8]"
                          }`}
                        >
                          {title}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="py-8 md:py-16 flex  justify-center items-center gap-[25px] w-full flex-col sm:flex-row"
              >
                <button
                  onClick={() => addToCart(productData)}
                  className="text-xs hover:underline border border-black rounded-full font-Poppins font-medium py-2.5 px-[60px] "
                >
                  Add to Cart
                </button>
                <Link
                  href="/checkout"
                  className="text-xs hover:underline border border-black rounded-full font-Poppins font-medium py-2.5 px-[60px] "
                >
                  Buy Now
                </Link>
              </motion.div>
              <div className="border-t w-full flex-col md:flex-row h-full border-[#00000017] flex justify-center">
                {Array(numDivs)
                  .fill("")
                  .map((_, index) => (
                    <div
                      key={index}
                      className="w-full h-full flex md:border-r items-start py-5 max-h-[250px]"
                    >
                      <div className="w-full  flex flex-col border-[#00000017] gap-5  px-10">
                        {performanceData
                          .slice(index * 4, (index + 1) * 4) // Get the data for the current div
                          .map((data, idx) => {
                            const { title, performance, quantity } = data;
                            return (
                              <PerformanceFill
                                title={title}
                                performance={+performance}
                                quantity={quantity}
                                key={idx}
                              />
                            );
                          })}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="absolute top-0 left-0 items-center hidden h-full lg:flex -z-10"
            >
              <Image
                alt="moetar"
                src="/images/left-blob.png"
                width={1257}
                height={707}
                className="w-auto h-auto"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="absolute top-0 right-0 items-center hidden h-full lg:flex -z-10"
            >
              <Image
                alt="moetar"
                src="/images/right-blob.png"
                width={1257}
                height={707}
                className="w-auto h-auto"
              />
            </motion.div>
          </div>
        </div>
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 2000 }}
      />
    </div>
  );
};

export default ProductPage;
