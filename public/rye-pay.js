import { RyePay } from "@rye-api/rye-pay";

const ryePay = new RyePay();

const loadSpreedly = () => {
  ryePay.init({
    apiKey,
    numberEl: "spreedly-number",
    cvvEl: "spreedly-cvv",
    environment: "prod",
    onReady: () => {
      // Customize card number field and cvv field
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

loadSpreedly();

const submit = () => {
  ryePay.submit({
    first_name: "John",
    last_name: "Doe",
    month: "04",
    year: "2025",
    cartId: "cartId", // IMPORTANT! Make sure the cartId is valid
    address1: "address1",
    address2: "address2",
    zip: "zip",
    city: "city",
    country: "country",
    state: "state",
    selectedShippingOptions: [],
    shopperIp: "xxx.xxx.x.x", // IMPORTANT! Make sure this is set correctly
  });
};

submit();

window.submitRyePayment = submit;
