import { useState, useEffect } from "react";
import Head from "next/head";
import { RyePay, SubmitStoreResult, SubmitCartResult } from "@rye-api/rye-pay";

const CheckoutPage = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");

  const ryePay = new RyePay();

  // Initialize RyePay object
  const loadSpreedly = () => {
    ryePay.init({
      apiKey: "RYE-2a5cbfe5698d4fa1a244",
      numberEl: "spreedly-number",
      cvvEl: "spreedly-cvv",
      environment: "stage", // Replace with your environment
      onReady: () => {
        // Customize card number field and cvv field
        console.log("INTI RYE", ryePay.initialized);
        ryePay.setStyle(
          "number",
          "display:inline; width: 30%; border-radius: 3px; border: 1px solid #ccc;"
        );
        ryePay.setStyle(
          "cvv",
          "display: inline; width: 30%; border-radius: 3px; border: 1px solid #ccc;"
        );
      },
      onErrors: (errors) => {
        for (const { key, message, attribute } of errors) {
          console.log(`new error: ${key}-${message}-${attribute}`);
        }
      },
      enableLogging: true,
      onIFrameError: (err) => {
        console.log(`frameError: ${JSON.stringify(err)}`);
      },
    });
  };

  // Submit cart function
  const submitCart = () => {
    console.log("SUBMIT RYE", ryePay.initialized);

    ryePay.submit({
      first_name: "John",
      last_name: "Doe",
      month: "04",
      year: "2025",
      cartId: "cartId", // Replace with your cartId
      address1: "address1",
      address2: "address2",
      zip: "zip",
      city: "city",
      country: "country",
      state: "state",
      selectedShippingOptions: [],
      shopperIp: "xxx.xxx.x.x", // Replace with the correct shopper IP
    });
  };

  // const { loadRye, submitCart, ryePay } = initializeRyePay();

  useEffect(() => {
    // Call the submitCart function when you want to submit the payment
    loadSpreedly();
    // return () => {
    //   // Clean up RyePay instance if needed
    //   ryePay.;
    // };
  }, []);

  return (
    <div>
      <label htmlFor="spreedly-number">Card Number:</label>
      <input
        type="text"
        id="spreedly-number"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
      />

      <label htmlFor="spreedly-cvv">CVV:</label>
      <input
        type="text"
        id="spreedly-cvv"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
      />
      <button onClick={() => submitCart()}>Submit</button>
    </div>
  );
};

export default CheckoutPage;
