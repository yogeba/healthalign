import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function CommonHeader() {
  const [isBackButtonShow, setIsBackButtonShow] = useState(true);

  const router = useRouter();
  const currentPath = router.asPath;

  useEffect(() => {
    const isBasePath = currentPath === "/new" || currentPath === "/";
    setIsBackButtonShow(!isBasePath);
  }, [currentPath]);

  const goBack = () => {
    router.back();
  };

  return (
    <div className="border-b shadow-[1px_0px_10px_0px_#00000033]">
      {/* <div className="h-[90px] mx-7 md:mx-14 lg:container lg:mx-auto flex justify-between items-center"> */}
      <div className="h-[90px] mx-7 md:mx-14 flex justify-between items-center z-[1111]">
        <div className="flex items-center gap-4">
          {isBackButtonShow && (
            <button
              onClick={() => goBack()}
              className="flex md:hidden gap-1.5 items-center justify-center"
            >
              <Image
                alt="moetar"
                src="/images/icon/mobile-back-icon.svg"
                width={23}
                height={23}
                className="h-[19px] w-[19px] xs:h-[23px] xs:w-[23px]"
              />
            </button>
          )}
          <Link href="/" className="flex gap-1.5 items-center justify-center">
            <Image
              alt="moetar"
              src="/images/icon/mortar-icon.svg"
              width={25}
              height={25}
            />
            <h1 className="tracking-tight capitalize font-bold text-[10px] md:text-sm text-[#4E4E4E]">
              Health Align
            </h1>
          </Link>
        </div>
        <div className={`flex gap-3 items-center`}>
          {/* <div className="flex items-start justify-end">
            <div className="border flex border-[#5F5F5F] rounded-md">
              <div className="px-[10px] flex justify-center items-center border-r border-[#5F5F5F]">
                <Image
                  alt="moetar"
                  src="/images/icon/users-icon.svg"
                  width={15}
                  height={15}
                  className="cursor-pointer"
                />
              </div>
              <Link
                href="/about"
                className="capitalize cursor-pointer text-[10px] font-semibold text-[#5F5F5F] py-2.5 px-[13px]"
              >
                About Us
              </Link>
            </div>
          </div> */}
          <div className="w-[35px] md:w-[40px] h-[35px] md:h-[40px] border rounded-full flex justify-center items-center flex-shrink-0">
            <Link href="/products">
              <Image
                alt="moetar"
                src="/images/icon/header-shop.svg"
                width={16}
                height={16}
                className="cursor-pointer"
              />
            </Link>
          </div>
          <div className="w-[35px] md:w-[40px] h-[35px] md:h-[40px] border rounded-full flex justify-center items-center flex-shrink-0">
            <Link href="/about">
              <Image
                alt="moetar"
                src="/images/icon/header-user.svg"
                width={18}
                height={18}
                className="cursor-pointer"
              />
            </Link>
          </div>
          <Image
            alt="moetar"
            src="/images/user.png"
            className="flex-shrink-0 w-[35px] rounded-full h-[35px] cursor-pointer"
            width={35}
            height={35}
          />
        </div>
      </div>
    </div>
  );
}

export default CommonHeader;
