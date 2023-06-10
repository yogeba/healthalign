import React from "react";

interface CustomDataFieldProps {
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
}
const CustomInputField: React.FC<CustomDataFieldProps> = ({
  name = "",
  value = "",
  handleChange,
  handleBlur,
  placeholder = "",
  type = "",
}) => {
  return (
    <div className="relative w-full">
      <input
        type={type ?? ""}
        name={name}
        value={value}
        maxLength={name === "cvv" ? 3 : undefined}
        onChange={(e) => handleChange(e)}
        onBlur={(e) => handleBlur(e)}
        className={`flex w-full border border-gray-300 rounded-[9px] outline-none focus:border-black focus:ring-black focus:shadow-none text-[10px] md:text-[13px] font-bold font-Inter text-black ${
          type === "number" ? "px-3.5 pt-4 pb-2.5" : "px-3.5 pt-5 pb-3"
        }`}
      />
      <label
        className={`absolute left-4 text-[#909090] transition-all text-[10px] font-medium duration-300 ${
          value.trim() !== "" ? "top-1" : "top-[22px]"
        }`}
      >
        {placeholder ?? ""}
      </label>
    </div>
  );
};

export default CustomInputField;
