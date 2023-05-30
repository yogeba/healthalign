import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import PerformanceCircle from "../common/PerformanceCircle";
import CommonHeader from "../common/Header";
import { motion } from "framer-motion";

const productImageData = [
    "product-image-1.png",
    "product-image-2.png",
    "product-image-3.png",
    "product-image-4.png",
];

const alphabetTabData = [
    { title: "A", isSelected: true, value: "47", },
    { title: "B", isSelected: false, value: "35", },
    { title: "C", isSelected: false, value: "34", },
    { title: "D", isSelected: false, value: "30", },
    { title: "E", isSelected: false, value: "35", },
    { title: "F", isSelected: false, value: "30", }
]

const buttonData = [
    { index: 0, title: "iHerb (International)", linkTo: "iHerb" },
    { index: 0, title: "Amazon CAN", linkTo: "amazon-can" },
    { index: 0, title: "Amazon USA", linkTo: "amazon-usa" },
]

function ProductPage() {
    const [isSelectedTabCertification, setSelectedTabCertification] = useState<Boolean>(false);

    const [selectedImage, setselectedImage] = useState<string>("selected-image.png");

    const handleProductImageClick = (image: string) => {
        console.log(image);
        setselectedImage(image);
    };

    const buttonVariants = {
        initial: { x: -1 },
        animate: { x: 0 },

    };
    return (
        <div className="flex flex-col w-full h-full">
            <div className="">
                <CommonHeader />
            </div>
            <div className="h-full mx-7 md:mx-14 lg:mx-auto lg:container">
                <div className="flex flex-col items-center w-full h-full gap-10 lg:gap-0 lg:flex-row">
                    <div className="relative lg:h-[90vh] flex items-center justify-center w-full h-full py-4">
                        <div className=" shadow-[0px_0px_7px_0px_#00000029] rounded-[28px] max-w-[900px] h-full max-h-[825px] w-full">
                            <div className="flex w-full h-full max-h-[410px] border-b border-[#00000017]">
                                {/* upper div */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1 }}
                                    className="flex justify-center items-center w-[90%] flex-col gap-5 border-r border-[#00000017]">
                                    <div className="">
                                        {/* main image */}
                                        <motion.div
                                            initial={{ boxShadow: "none" }}
                                            animate={{
                                                boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)",
                                            }}
                                            transition={{ duration: 2 }}
                                            className="h-[230px] w-[240px] flex justify-center items-center rounded-full"
                                        >
                                            <Image
                                                alt="moetar"
                                                src={`/images/${selectedImage ?? ""}`}
                                                width={214}
                                                height={214}
                                            />
                                        </motion.div>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        {/* Image slider */}
                                        {productImageData.map((item, index) => {
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
                                                        src={`/images/${item}`}
                                                        width={54}
                                                        height={54}
                                                    />
                                                    {selectedImage === item && (
                                                        <div className="absolute -bottom-6 w-full">
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
                                <div className="flex w-full flex-col justify-around py-6">
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 1.5 }}
                                        className="flex w-full max-w-[400px] p-1.5 mx-auto border rounded-[33px]  shad-w-[0px_0px_4px_0px_#00000040] my-3 gap-1">
                                        <motion.button
                                            initial="initial"
                                            animate={isSelectedTabCertification ? "animate" : "exit"}

                                            variants={buttonVariants}
                                            transition={{ duration: 0.5 }}
                                            onClick={() => setSelectedTabCertification(false)}
                                            className={`h-10 rounded-full flex justify-center items-center  w-full text-xs transition-all duration-300 font-semibold font-Poppins  ${!isSelectedTabCertification
                                                ? "bg-[#00A02C] text-white"
                                                : "text-[#ABABAB] bg-white"
                                                }`}
                                        >
                                            Labdoor Score
                                        </motion.button>
                                        <motion.button
                                            initial="initial"
                                            animate={isSelectedTabCertification ? "animate" : "exit"}
                                            transition={{ duration: 0.5 }}
                                            variants={buttonVariants}
                                            onClick={() => setSelectedTabCertification(true)}
                                            className={`h-10 transition-color rounded-full flex justify-center items-center  w-full text-xs font-semibold font-Poppins first-letter:capitalize  ${isSelectedTabCertification
                                                ? "bg-[#00A02C] text-white"
                                                : "text-[#ABABAB] bg-white"
                                                }`}
                                        >
                                            certifications
                                        </motion.button>
                                    </motion.div>
                                    <div className="w-full flex justify-center ">
                                        <PerformanceCircle performance={52} />
                                    </div>
                                    <div className="flex gap-3 items-end justify-center">
                                        {alphabetTabData.map((item, index) => {
                                            const { title, isSelected, value } = item;
                                            return <motion.div
                                                initial={{ opacity: 0, y: 45 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 1.5 }}
                                                key={index} className={`h-[${value}px] w-[22px]  text-[8px] cursor-pointer font-semibold font-Poppins flex items-end justify-center py-1.5  rounded-full ${isSelected ? "bg-[#00A02C] text-white" : "bg-[#F3F3F3] text-[#A8A8A8]"}`}>{title}</motion.div>
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="py-8 flex flex-col gap-[25px] w-full">
                                <h2 className="uppercase text-base font-bold text-[#4E4E4E] font-InaiMathi text-center w-full">BUY FROM THESE SELLERS</h2>
                                <div className="flex gap-5 items-center justify-center">
                                    {buttonData.map((item, index) => {
                                        const { title, linkTo } = item
                                        return <Link href={linkTo} key={index} className="text-xs hover:underline border border-black rounded-full font-Poppins font-medium py-4 px-[37px] ">{title ?? ""}</Link>

                                    })}
                                </div>
                            </div>
                            <div className="border-t border-[#00000017] flex justify-center items-center">
                                <h2 className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ex nulla perspiciatis a porro obcaecati debitis, provident architecto voluptatibus tempore nostrum deleniti eum alias ab. Minima vitae sunt eligendi natus!</h2>
                            </div>

                        </div>
                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 1 }}
                            className="absolute top-0 left-0 flex items-center h-full -z-10"
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
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 1 }}
                            className="absolute top-0 right-0 flex items-center h-full -z-10"
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
        </div>
    );
}

export default ProductPage;
