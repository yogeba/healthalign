import Image from "next/image";
import Link from "next/link";
import React from "react";

function CommonHeader() {
  return (
    <div className="border-b shadow-[1px_0px_10px_0px_#00000033]">
      <div className="h-[90px] mx-7 md:mx-14 lg:container lg:mx-auto flex justify-between items-center">
        <div className="">
          <Link href="/" className="flex items-center gap-3">
            <Image
              alt="moetar"
              src="/images/icon/mortar-icon.svg"
              width={25}
              height={25}
            />
            <h1 className="tracking-tight capitalize font-bold text-sm text-[#4E4E4E]">
              Health Align
            </h1>
          </Link>
        </div>
        <div className={`flex gap-3 items-center`}>
          <div className="flex items-start justify-end">
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
          </div>
          <Image
            alt="moetar"
            src="/images/user.png"
            className="flex-shrink-0 w-[35px] h-[35px] cursor-pointer"
            width={35}
            height={35}
          />
        </div>
      </div>
    </div>
  );
}

export default CommonHeader;
