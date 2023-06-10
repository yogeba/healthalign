import CustomInputField from "components/common/CustomInputFiels";
import CommonHeader from "components/common/Header";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface formDataType {
  country: string;
  firstName: string;
  lastName: string;
  address: string;
  appartment: string;
  city: string;
  postal: string;
  phone: string;
}

interface CardFormState {
  cardNumber: string;
  expireDate: any;
  cvv: string;
  fullName: string;
}

const cartData = [
  {
    id: 0,
    name: "Nature's Bounty B-Complex With Folic Acid",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris.",
    price: "$45.00",
    image: "product-option.png",
  },
  {
    id: 1,
    name: "Nature's Bounty B-Complex With Folic Acid",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris.",
    price: "$45.00",
    image: "product-option.png",
  },
];

function CheckOutPage() {
  const [selectedProductData, setSelectedProductData] = useState(cartData);
  const [coupenCode, setCoupenCode] = useState("");
  const [formData, setFormData] = useState<formDataType>({
    country: "",
    firstName: "",
    lastName: "",
    address: "",
    appartment: "",
    city: "",
    postal: "",
    phone: "",
  });

  const {
    country,
    firstName,
    lastName,
    address,
    appartment,
    city,
    postal,
    phone,
  } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value.trim() === "") {
      setFormData((prevAddress) => ({ ...prevAddress, [name]: "" }));
    }
  };

  const [cardForm, setCardForm] = useState<CardFormState>({
    cardNumber: "",
    expireDate: "",
    cvv: "",
    fullName: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      // Remove any non-digit characters from the input value
      const cleanedValue = value.replace(/\D/g, "");

      // Group the digits in sets of four with spaces
      let formattedValue = "";
      for (let i = 0; i < cleanedValue.length; i++) {
        if (i > 0 && i % 4 === 0) {
          formattedValue += " ";
        }
        formattedValue += cleanedValue[i];
      }

      setCardForm((prevForm) => ({ ...prevForm, [name]: formattedValue }));
    } else if (name === "cvv") {
      value.length < 4 &&
        setCardForm((prevForm) => ({ ...prevForm, [name]: value }));
    } else {
      setCardForm((prevForm) => ({ ...prevForm, [name]: value }));
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const handleDeleteClick = (productId: number) => {
    setSelectedProductData((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };
  const handleCoupenCode = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setCoupenCode("");
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="sticky top-0 z-20 bg-white">
        <CommonHeader />
      </div>
      <div className="w-full flex flex-col lg:flex-row h-full py-6 mx-auto md:py-6 px-4 md:px-5 sm:px-0 max-w-[500px] lg:max-w-[1020px] xl:max-w-[55vw] justify-center">
        <div className="shadow-[0px_0px_7px_0px_#00000029] z-10 bg-white flex-grow rounded-[28px] py-6 px-5 md:px-9 flex flex-col gap-9 max-w-[650px]">
          {/* shipping address */}
          <div className="flex flex-col">
            <h2 className="text-xs font-bold text-black capitalize font-Inter">
              Shipping Address
            </h2>

            <div className="flex flex-col gap-4 pt-4">
              <CustomInputField
                name={"country"}
                value={country}
                handleChange={handleChange}
                handleBlur={handleBlur}
                placeholder="Country / Region"
              />
              <div className="flex flex-col w-full gap-4 md:flex-row">
                <CustomInputField
                  name={"firstName"}
                  value={firstName}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  placeholder="First Name"
                />
                <CustomInputField
                  name={"lastName"}
                  value={lastName}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  placeholder="Last Name"
                />
              </div>

              <CustomInputField
                name={"address"}
                value={address}
                handleChange={handleChange}
                handleBlur={handleBlur}
                placeholder="Address"
              />
              <CustomInputField
                name={"appartment"}
                value={appartment}
                handleChange={handleChange}
                handleBlur={handleBlur}
                placeholder="Appartments, Suits, Etc"
              />
              <div className="flex flex-col w-full gap-4 md:flex-row">
                <CustomInputField
                  name={"city"}
                  value={city}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  placeholder="City"
                />
                <CustomInputField
                  name={"postal"}
                  value={postal}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  placeholder="Postal"
                />
              </div>
              <CustomInputField
                name={"phone"}
                value={phone}
                handleChange={handleChange}
                handleBlur={handleBlur}
                placeholder="Phone"
                type="number"
              />
            </div>
          </div>
          {/* card details */}
          <div className="flex flex-col">
            <h2 className="text-xs font-bold text-black capitalize font-Inter">
              Card Details
            </h2>

            <div className="flex flex-col gap-4 pt-3">
              <CustomInputField
                name={"fullName"}
                value={cardForm.fullName}
                handleChange={handleInputChange}
                handleBlur={handleBlur}
                placeholder="Full Name"
              />
              <div className="relative w-full">
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={cardForm.cardNumber}
                  onChange={handleInputChange}
                  maxLength={19} // Including spaces, the maximum length is 19
                  className="flex w-full px-3.5 pt-4 pb-3 border border-gray-300 rounded-[9px] outline-none focus:ring-black focus:border-black focus:shadow-none text-[13px] font-bold font-Inter text-black"
                />
                <label
                  className={`absolute left-4 text-[#909090] transition-all text-[10px] font-medium duration-300 ${
                    cardForm.cardNumber.trim() !== "" ? "top-1" : "top-[22px]"
                  }`}
                >
                  {"Card Number"}
                </label>
              </div>
              <div className="flex flex-col w-full gap-4 md:flex-row">
                {/* expDate */}
                <div className="relative w-full">
                  <input
                    id="expiration"
                    type="month"
                    name="expireDate"
                    value={cardForm.expireDate}
                    ref={inputRef}
                    onChange={(e) => handleInputChange(e)}
                    onBlur={(e) => handleBlur(e)}
                    onKeyDown={(e) => e.preventDefault()}
                    onWheel={(e) => e.currentTarget.blur()}
                    className="flex w-full border border-gray-300 rounded-[9px] outline-none focus:border-black focus:ring-black focus:shadow-none text-[13px] font-bold font-Inter text-black px-3.5 pt-4 pb-2.5 placeholder-white"
                  />

                  <label
                    className={`absolute left-4 text-[#909090] transition-all text-[10px] font-medium duration-300 ${
                      cardForm.expireDate.trim() !== "" ? "top-1" : "top-1"
                    }`}
                  >
                    {"Expire Date"}
                  </label>
                </div>
                {/* CVV */}
                <CustomInputField
                  name={"cvv"}
                  value={cardForm.cvv}
                  handleChange={handleInputChange}
                  handleBlur={handleBlur}
                  placeholder="CVV"
                  type="number"
                />
              </div>
            </div>
          </div>
          {/* submit button */}
          <button className="w-full bg-[#4DAF00] rounded-lg py-[20px] text-white font-bold font-Inter text-[10px]">
            Continue to Shipping
          </button>
        </div>
        {selectedProductData.length > 0 && (
          <>
            <motion.div
              initial={{ x: -400, y: 48 }}
              animate={{ x: 0, y: 48 }}
              transition={{ duration: 0.8 }}
              className="max-w-[420px] bg-white  shadow-[3px_0px_7px_0px_#0000001F] h-full  rounded-r-[28px] py-7 px-6 hidden lg:flex flex-col gap-7 "
            >
              <div className="flex flex-col w-full gap-2">
                {selectedProductData.map((item, index) => {
                  const { name, description, image, price, id } = item;
                  return (
                    <div
                      key={index}
                      className="border relative border-[#0000001A] rounded-lg py-3 px-4"
                    >
                      <h2 className="absolute font-bold top-2 right-3 text-[#00A02C] font-Poppins text-[10px]">
                        {price}
                      </h2>
                      <button
                        onClick={() => handleDeleteClick(id)}
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
                      <div className="flex flex-shrink-0 h-full gap-4">
                        <Image
                          alt="moetar"
                          src={`/images/${image}`}
                          // src={image}
                          width={38}
                          height={38}
                          className=""
                        />
                        <div className="flex flex-col justify-around pr-7">
                          <h1 className="text-[#00A02C] font-bold text-[10px]">
                            None
                          </h1>
                          <h2 className="text-[9px] text-[#595959] font-bold font-InaiMathi">
                            {name ?? ""}
                          </h2>
                          <p className="text-[6px] font-InaiMathi font-medium text-[#888888]">
                            {description ?? ""}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* coupen code */}
              <form
                onSubmit={(e) => handleCoupenCode(e)}
                className="relative w-full"
              >
                <input
                  className="border border-[#0000001A] rounded-lg placeholder-[#ABABAB]  text-[13px] font-bold w-full pr-[72px] py-3 px-3 font-Inter text-black"
                  name=""
                  id=""
                  placeholder="Discount Code Here"
                  value={coupenCode}
                  onChange={(e) => {
                    setCoupenCode(e.target.value);
                  }}
                />
                <button className="bg-[#4DAF00] absolute right-1.5 top-1.5 text-white font-Poppins font-semibold text-[8px] py-2.5 px-4 rounded-lg">
                  Apply
                </button>
              </form>
              {/* total */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-[#595959] font-bold  font-InaiMathi text-[10px]">
                  <p>Sub Total</p>
                  <p>Rs 10000.00</p>
                </div>
                <hr className="border-[#E9E9E9]" />
                <div className="flex justify-between py-1  font-InaiMathi text-[10px]">
                  <p className="font-bold text-[#595959]">Sub Total</p>
                  <p className="font-medium text-[#B8B8B8]">
                    Calculated at Next Step
                  </p>
                </div>
                <hr className="border-[#E9E9E9] " />
                <div className="flex justify-between pt-3 text-[#595959] font-InaiMathi font-bold">
                  <p className="text-[14px]">Total</p>
                  <p className="text-[12px]">PKR Rs 10000.00</p>
                </div>
              </div>
            </motion.div>
            {/* mobile card data */}
            <div className="max-w-[380px] mx-auto bg-white  shadow-[0.009999999776482582px_4px_4.692098140716553px_0px_#0000001F] h-full  rounded-b-[28px] py-4 px-4 flex flex-col gap-7 lg:hidden -translate-y-4 pt-8">
              <div className="flex flex-col w-full gap-2">
                {selectedProductData.map((item, index) => {
                  const { name, description, image, price, id } = item;
                  return (
                    <div
                      key={index}
                      className="border relative border-[#0000001A] rounded-lg py-2 px-4"
                    >
                      <h2 className="absolute font-bold top-2 right-3 text-[#00A02C] font-Poppins text-[8px] md:text-[10px]">
                        {price}
                      </h2>
                      <button
                        onClick={() => handleDeleteClick(id)}
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
                      <div className="flex flex-shrink-0 h-full gap-4">
                        <Image
                          alt="moetar"
                          src={`/images/${image}`}
                          // src={image}
                          width={38}
                          height={38}
                          className=""
                        />
                        <div className="flex flex-col justify-around pr-7">
                          <h1 className="text-[#00A02C] font-bold text-[8px] md:text-[10px]">
                            None
                          </h1>
                          <h2 className="text-[7px] md:text-[9px] text-[#595959] font-bold font-InaiMathi">
                            {name ?? ""}
                          </h2>
                          <p className="text-[6px] font-InaiMathi font-medium text-[#888888]">
                            {description ?? ""}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* coupen code */}
              <form
                onSubmit={(e) => handleCoupenCode(e)}
                className="relative w-full"
              >
                <input
                  className="border border-[#0000001A] rounded-lg placeholder-[#ABABAB]  text-[13px] font-bold w-full pr-[72px] py-3 px-3 font-Inter text-black"
                  name=""
                  id=""
                  placeholder="Discount Code Here"
                  value={coupenCode}
                  onChange={(e) => {
                    setCoupenCode(e.target.value);
                  }}
                />
                <button className="bg-[#4DAF00] absolute right-1.5 top-1 text-white font-Poppins font-semibold text-[8px] py-2.5 px-4 rounded-lg">
                  Apply
                </button>
              </form>
              {/* total */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-[#595959] font-bold  font-InaiMathi text-[10px]">
                  <p>Sub Total</p>
                  <p>Rs 10000.00</p>
                </div>
                <hr className="border-[#E9E9E9]" />
                <div className="flex justify-between py-1  font-InaiMathi text-[10px]">
                  <p className="font-bold text-[#595959]">Sub Total</p>
                  <p className="font-medium text-[#B8B8B8]">
                    Calculated at Next Step
                  </p>
                </div>
                <hr className="border-[#E9E9E9] " />
                <div className="flex justify-between pt-3 text-[#595959] font-InaiMathi font-bold">
                  <p className="text-[14px]">Total</p>
                  <p className="text-[12px]">PKR Rs 10000.00</p>
                </div>
              </div>
            </div>
          </>
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-0 left-0 items-center hidden h-full lg:flex -z-10"
        >
          <Image
            alt="left"
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
            alt="right"
            src="/images/right-blob.png"
            width={1257}
            height={707}
            className="w-auto h-auto"
          />
        </motion.div>
      </div>
    </div>
  );
}

export default CheckOutPage;
