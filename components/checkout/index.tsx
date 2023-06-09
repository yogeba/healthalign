import CommonHeader from "components/common/Header";
import React, { useState } from "react";

function CheckOutPage() {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    if (inputValue.trim() === "") {
      setInputValue("");
    }
  };
  return (
    <div className="flex flex-col w-full h-full">
      <div className="">
        <CommonHeader />
      </div>
      <div className="h-full py-8 mx-auto md:py-16">
        <div className="shadow-[0px_0px_7px_0px_#00000029] rounded-[28px] py-6 px-9 md:w-[40vw]">
          <h2 className="text-xs font-bold text-black capitalize font-Inter">
            Shipping Address
          </h2>
          <div className="pt-4">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                onBlur={handleBlur}
                className="flex w-full px-3.5 pt-5 pb-3 border border-gray-300 rounded-[9px] outline-none focus:border-black focus:shadow-none text-[13px] font-bold font-Inter text-black"
              />
              <label
                className={`absolute  left-4 text-[#909090] transition-all text-[10px] font-medium duration-300 ${
                  inputValue.trim() !== "" ? "top-1" : "top-[22px]"
                }`}
              >
                {"Country / Region"}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOutPage;
