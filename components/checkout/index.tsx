import CustomInputField from "components/common/CustomInputFiels";
import React, { useEffect, useRef, useState } from "react";
import { deleteCartItems, getCartById } from "lib/cart";
import CommonHeader from "components/common/Header";
import { Toaster, toast } from "react-hot-toast";
import { motion } from "framer-motion";
import Image from "next/image";
import CheckoutProductCard from "./CheckoutProductCard";
import { RyePay, SubmitCartResult, SubmitStoreResult } from "@rye-api/rye-pay";
import { SelectedShippingOption } from "lib/cart/inputs";
interface formDataType {
  country: string;
  firstName: string;
  lastName: string;
  address: string;
  appartment: string;
  city: string;
  postal: string;
  phone: string;
  state: string;
}
interface CardFormState {
  cardNumber: string;
  expireDate: any;
  cvv: string;
  fullName: string;
}

const ryePay = new RyePay();

interface SpreedlyError {
  attribute: string;
  key: string;
  message: string;
}

interface FrameError {
  msg: string;
  url: string;
  line: number;
  col: number;
}

interface CheckoutPageProps {
  selectedShippingOptions?: SelectedShippingOption[];
}

const CheckOutPage: React.FC<CheckoutPageProps> = ({
  selectedShippingOptions,
}) => {
  const [isCartAvailable, setIsCartAvailable] = useState(false);
  const [coupenCode, setCoupenCode] = useState("");
  const [cartId, setCartId] = useState<string>("");
  const [cart, setCart] = useState<any>();
  const [stores, setStores] = useState<SubmitStoreResult[] | null>(null);
  const [formData, setFormData] = useState<formDataType>({
    country: "",
    firstName: "",
    lastName: "",
    address: "",
    appartment: "",
    city: "",
    postal: "",
    phone: "",
    state: "",
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
    state,
  } = formData;

  const fetchCartDetails = async () => {
    const cartId = localStorage.getItem("cartId");

    if (cartId) {
      const cart = await getCartById(cartId);
      setCart(cart);
    }
  };

  useEffect(() => {
    fetchCartDetails();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const existingCartId = localStorage.getItem("cartId");
      if (existingCartId) {
        setCartId(existingCartId);
      }
    }
  }, []);

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

  useEffect(() => {
    setIsCartAvailable(cart?.stores?.length > 0);
    console.log(cart);
  }, [cart]);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleCoupenCode = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setCoupenCode("");
  };

  const removeItem = async (productId: string, variantId: string) => {
    const input = {
      id: cartId,
      items: {
        amazonProducts: productId ? [{ productId }] : [],
        shopifyProducts: variantId ? [{ variantId }] : [],
      },
    };

    toast.promise(
      deleteCartItems(input),
      {
        loading: "Removing product from cart...",
        success: () => {
          fetchCartDetails();
          return "Product removed from cart";
        },
        error: (error) => {
          return "An error occurred while removing the product";
        },
      },
      {
        loading: {
          duration: 2000,
        },
      }
    );
  };

  useEffect(() => {
    loadSpreedly();
  }, []);

  const loadSpreedly = () => {
    console.log(cardForm.cardNumber);
    ryePay.init({
      // apiKey: "zXYzvid2v4",
      apiKey: process.env.NEXT_PUBLIC_RYE_API_KEY,
      numberEl: "checkout-card-number",
      environment: "prod",
      cvvEl: "checkout-cvv-number",
      onReady: () => {
        // Customize card number field and cvv field
        ryePay.setStyle(
          "number",
          "display:inline; width: 93.8%; border-radius: 9px; border: 1px solid #ccc; padding-left: 17px; padding-right: 17px;padding-top: 18px; padding-bottom: 18px; font-size: 13px; font-weight: bold; "
        );
        ryePay.setStyle(
          "cvv",
          "display:inline; width: 85%; border-radius: 9px; border: 1px solid #ccc; padding-left: 17px; padding-right: 17px;padding-top: 18px; padding-bottom: 18px; font-size: 13px; font-weight: bold; "
        );

        ryePay.setPlaceholder("number", "Card Number");

        /* ryePay.setValue("number", +cardForm.cardNumber);
        ryePay.setValue("cvv", +cardForm.cvv); */
      },
      onErrors: (errors: SpreedlyError[]) => {
        console.log(errors);
        for (const { key, message, attribute } of errors) {
          console.log(`new error: ${key}-${message}-${attribute}`);
          toast.error(`${message}`);
        }
      },
      enableLogging: true,
      onIFrameError: (err: FrameError) => {
        console.log(`frameError: ${JSON.stringify(err)}`);
      },
      onCartSubmitted: (result: SubmitCartResult) => {
        console.log({ result });
        setStores(result?.cart?.stores);
      },
    });
  };
  const validateForm = () => {
    const [year, month] = cardForm.expireDate.split("-");
    // Define an array of required fields

    // Check if any required field is empty
    const isValid =
      formData.country !== "" &&
      formData.firstName !== "" &&
      formData.lastName !== "" &&
      formData.address !== "" &&
      formData.city !== "" &&
      formData.postal !== "" &&
      formData.state !== "" &&
      formData.phone !== "" &&
      cartId !== "";

    return isValid;
  };

  const submit = () => {
    const [year, month] = cardForm.expireDate.split("-");

    if (validateForm()) {
      ryePay.submit({
        first_name: firstName,
        last_name: lastName,
        month,
        year,
        cartId,
        phone_number: phone,
        // promoCodes, TODO: uncomment once promo codes are supported by backend
        address1: address,
        address2: appartment,
        zip: postal,
        city,
        country,
        state,
        selectedShippingOptions,
        shopperIp: "192.168.0.1",
      });
    } else {
      toast.error("Enter valid Data");
    }
    // Convert month to a number
  };

  useEffect(() => {
    console.log(cardForm.cardNumber);
    const cardInput = document.getElementById("card_number");
    console.log(cardInput);
  }, [cardForm]);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="sticky top-0 z-20 bg-white">
        <CommonHeader />
      </div>
      <div className="w-full flex flex-col lg:flex-row h-full py-6 mx-auto md:py-6 px-4 md:px-5 sm:px-0 max-w-[500px] lg:max-w-[1020px] 2xl:max-w-[60vw] justify-center">
        <div className="shadow-[0px_0px_7px_0px_#00000029] z-10 bg-white flex-grow rounded-[28px] py-6 px-5 md:px-9 flex flex-col gap-9 max-w-[650px]">
          {/* shipping address */}
          <div className="flex flex-col">
            <h2 className="text-xs font-bold text-black capitalize font-Inter">
              Shipping Address
            </h2>

            <div className="flex flex-col gap-4 pt-4">
              <div className="flex flex-col w-full gap-4 md:flex-row">
                <CustomInputField
                  name={"country"}
                  value={country}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  placeholder="Country / Region"
                />
                <CustomInputField
                  name={"state"}
                  value={state}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  placeholder="STate"
                />
              </div>
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
              <div className="relative">
                <CustomInputField
                  name={"fullName"}
                  value={cardForm.fullName}
                  handleChange={handleInputChange}
                  handleBlur={handleBlur}
                  placeholder="Full Name"
                />
                <label
                  htmlFor={`custom-input-fullName`}
                  className="absolute top-1.5 flex items-center justify-center w-10 h-[80%]   right-3 bg-white"
                >
                  <Image
                    alt="username"
                    src="/images/username-icon.jpeg"
                    width={16}
                    height={16}
                    className="cursor-pointer"
                  />
                </label>
              </div>
              <div className="relative w-full" id="checkout-card-number">
                <input
                  type="text"
                  name="cardNumber"
                  value={cardForm.cardNumber}
                  onChange={handleInputChange}
                  maxLength={19} // Including spaces, the maximum length is 19
                  className=" w-full px-3.5 pt-4 pb-3 border border-gray-300 rounded-[9px] outline-none focus:ring-black focus:border-black hidden focus:shadow-none text-[13px] font-bold font-Inter text-black"
                />
                {/*  <label
                  className={`absolute left-4 text-[#909090] transition-all text-[10px] font-medium duration-300 ${
                    cardForm.cardNumber.trim() !== "" ? "top-1" : "top-[22px]"
                  }`}
                >
                  {"Card Number"}
                </label> */}
                <label
                  htmlFor="checkout-card-number"
                  className="absolute flex items-center justify-center w-10 bg-white top-4 right-3"
                >
                  <Image
                    alt="username"
                    src="/images/card-number-icon.jpeg"
                    width={18}
                    height={18}
                    className="cursor-pointer"
                  />
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
                <div className="relative w-full" id="checkout-cvv-number">
                  {/* <CustomInputField
                    name={"cvv"}
                    value={cardForm.cvv}
                    handleChange={handleInputChange}
                    handleBlur={handleBlur}
                    placeholder="CVV"
                    type="number"
                    id="checkout-cvv-number"
                  /> */}
                  <label
                    htmlFor="checkout-cvv-number"
                    className="absolute top-1.5 flex items-center justify-center w-10 h-[80%] right-3 bg-white"
                  >
                    <Image
                      alt="username"
                      src="/images/cvv-icon.jpeg"
                      width={22}
                      height={22}
                      className="cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* submit button */}
          <button
            onClick={() => submit()}
            className="w-full bg-[#4DAF00] rounded-lg py-[20px] text-white font-bold font-Inter text-[10px]"
          >
            Continue to Shipping
          </button>
        </div>
        {isCartAvailable && (
          <>
            <motion.div
              initial={{ x: -400, y: 48 }}
              animate={{ x: 0, y: 48 }}
              transition={{ duration: 0.8 }}
              className="max-w-[420px] bg-white  shadow-[3px_0px_7px_0px_#0000001F] h-full  rounded-r-[28px] py-7 px-6 hidden lg:flex flex-col gap-7 "
            >
              <div className="flex flex-col w-full gap-2 max-h-[45vh] overflow-auto scrollbar-thin">
                {cart &&
                  cart.stores.map((store: any) => {
                    return store.cartLines.map((item: any, index: number) => {
                      let cleanedImageUrl =
                        item?.product?.images[0]?.url ||
                        item?.variant?.image?.url;
                      if (cleanedImageUrl.startsWith("//")) {
                        cleanedImageUrl = cleanedImageUrl.replace(/^\/\//, "");
                      }
                      if (!cleanedImageUrl.startsWith("https://")) {
                        cleanedImageUrl = `https://${cleanedImageUrl}`;
                      } else {
                        cleanedImageUrl = cleanedImageUrl;
                      }
                      return (
                        <CheckoutProductCard
                          key={index}
                          item={item}
                          removeItem={removeItem}
                          cleanedImageUrl={cleanedImageUrl}
                          isMobile={false}
                        />
                      );
                    });
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
                  <p>
                    {cart?.cost?.subtotal?.displayValue?.length > 0
                      ? cart.cost.subtotal.displayValue
                      : "0"}
                  </p>
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
                  <p className="text-[12px]">
                    {cart?.cost?.subtotal?.displayValue?.length > 0
                      ? cart.cost.subtotal.displayValue
                      : "0"}
                  </p>
                </div>
              </div>
            </motion.div>
            {/* mobile card data */}
            <div className="max-w-[380px] mx-auto bg-white  shadow-[0.009999999776482582px_4px_4.692098140716553px_0px_#0000001F] h-full  rounded-b-[28px] py-4 px-4 flex flex-col gap-7 lg:hidden -translate-y-4 pt-8">
              <div className="flex flex-col w-full gap-2 max-h-[45vh] overflow-auto">
                {cart &&
                  cart.stores.map((store: any) => {
                    return store.cartLines.map((item: any, index: number) => {
                      let cleanedImageUrl =
                        item?.product?.images[0]?.url ||
                        item?.variant?.image?.url;
                      if (cleanedImageUrl.startsWith("//")) {
                        cleanedImageUrl = cleanedImageUrl.replace(/^\/\//, "");
                      }
                      if (!cleanedImageUrl.startsWith("https://")) {
                        cleanedImageUrl = `https://${cleanedImageUrl}`;
                      } else {
                        cleanedImageUrl = cleanedImageUrl;
                      }
                      return (
                        <CheckoutProductCard
                          key={index}
                          item={item}
                          removeItem={removeItem}
                          cleanedImageUrl={cleanedImageUrl}
                          isMobile={true}
                        />
                      );
                    });
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
                  <p>
                    {" "}
                    {cart?.cost?.subtotal?.displayValue?.length > 0
                      ? cart.cost.subtotal.displayValue
                      : "0"}
                  </p>
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
                  <p className="text-[12px]">
                    {" "}
                    {cart?.cost?.subtotal?.displayValue?.length > 0
                      ? cart.cost.subtotal.displayValue
                      : "0"}
                  </p>
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
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 2000 }}
      />
    </div>
  );
};

export default CheckOutPage;
