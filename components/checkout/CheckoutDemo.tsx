import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";

import { RyePay, SubmitCartResult, SubmitStoreResult } from "@rye-api/rye-pay";
import { SelectedShippingOption } from "lib/cart/inputs";

// import { apiKey, environment } from '../const';
// import { SelectedShippingOption } from '../shared/types';

const ryePay = new RyePay();

const styles = {
  height: "30px",
};

// Represents Spreedly error object
interface SpreedlyError {
  attribute: string;
  key: string;
  message: string;
}

// Represents error object thrown by iFrame
interface FrameError {
  msg: string;
  url: string;
  line: number;
  col: number;
}

export interface PromoCode {
  store: string;
  code: string;
}

export enum SubmitStoreStatus {
  COMPLETED = "COMPLETED",
  PAYMENT_FAILED = "PAYMENT_FAILED",
  FAILED = "FAILED",
}

export enum Marketplace {
  AMAZON = "AMAZON",
  SHOPIFY = "SHOPIFY",
}

type Params = {
  cartId: string;
  promoCodes: PromoCode[];
  selectedShippingOptions?: SelectedShippingOption[];
};

function RyePaymentForm({
  cartId,
  selectedShippingOptions,
  promoCodes,
}: Params) {
  const [email, setEmail] = useState("dev@rye.com");
  const [firstName, setName] = useState("John");
  const [month, setMonth] = useState("04");
  const [year, setYear] = useState("2025");
  const [lastName, setLastName] = useState("Doe");
  const [address1, setAddress1] = useState("7662 159th NE");
  const [address2, setAddress2] = useState("1");
  const [city, setCity] = useState("Redmond");
  const [state, setState] = useState("WA");
  const [country, setCountry] = useState("US");
  const [zip, setZip] = useState("98052");
  const [stores, setStores] = useState<SubmitStoreResult[] | null>(null);

  useEffect(() => {
    loadSpreedly();
  }, []);

  const submit = () => {
    console.log({
      first_name: firstName,
      last_name: lastName,
      month,
      year,
      cartId,
      phone_number: "1234567890",
      // promoCodes, TODO: uncomment once promo codes are supported by backend
      address1,
      address2,
      zip,
      city,
      country,
      state,
      selectedShippingOptions,
      shopperIp: "192.168.0.1",
    });
    ryePay.submit({
      first_name: firstName,
      last_name: lastName,
      month,
      year,
      cartId,
      phone_number: "1234567890",
      // promoCodes, TODO: uncomment once promo codes are supported by backend
      address1,
      address2,
      zip,
      city,
      country,
      state,
      selectedShippingOptions,
      shopperIp: "192.168.0.1",
    });
  };

  const loadSpreedly = () => {
    ryePay.init({
      // apiKey: "zXYzvid2v4",
      apiKey: process.env.NEXT_PUBLIC_RYE_API_KEY,
      numberEl: "new-spreedly-number",
      environment: "prod",
      cvvEl: "spreedly-cvv",
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
        /*  ryePay.setValue("number", 4242424242424242);
        ryePay.setValue("cvv", 123); */
      },
      onErrors: (errors: SpreedlyError[]) => {
        console.log(errors);
        for (const { key, message, attribute } of errors) {
          console.log(`new error: ${key}-${message}-${attribute}`);
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

  const validate = () => {
    ryePay.validate();
  };

  const reload = () => {
    ryePay.reload();
  };

  const [cardata, setcardData] = useState("");

  const showResult = () => {
    if (!stores?.length) {
      return false;
    }
    return stores.map((res) => (
      <div className="results" key={res.requestId}>
        <span className="result-status">[{res.status}]</span>{" "}
        <span>[{res.store.store}]</span> <span>requestId: {res.requestId}</span>
      </div>
    ));
  };

  return (
    <Box className="form">
      <Box>4242424242424242</Box>

      <Box className="payment-form">
        <Box
          display="flex"
          gap={2}
          my={1}
          alignItems="center"
          className="field"
          style={styles}
          id="new-spreedly-number"
        >
          card number
        </Box>

        <input
          type="text"
          id="checkout-card-number"
          name="cardNumber"
          value={cardata}
          onChange={(e) => setcardData(e.target.value)}
          maxLength={19} // Including spaces, the maximum length is 19
          className="flex w-full px-3.5 pt-4 pb-3 border border-gray-300 rounded-[9px] outline-none focus:ring-black focus:border-black focus:shadow-none text-[13px] font-bold font-Inter text-black"
        />

        <Box
          display="flex"
          gap={2}
          my={1}
          alignItems="center"
          className="field"
          style={styles}
          id="spreedly-cvv"
        >
          cvv
        </Box>
        <Box display="flex" gap={2} my={1} alignItems="center">
          <span>month</span>
          <TextField
            size="small"
            type="text"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </Box>
        <Box display="flex" gap={2} my={1} alignItems="center">
          <span>year</span>
          <TextField
            size="small"
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </Box>
        <Box display="flex" gap={2} my={1} alignItems="center">
          <span>first name</span>
          <TextField
            size="small"
            type="text"
            value={firstName}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
        <Box display="flex" gap={2} my={1} alignItems="center">
          <span>last name</span>
          <TextField
            size="small"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Box>

        <Box display="flex" gap={2} my={1} alignItems="center">
          <span>email</span>
          <TextField
            size="small"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box display="flex" gap={2} my={1} alignItems="center">
          <span>address</span>
          <TextField
            size="small"
            type="text"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
          />
        </Box>
        <Box display="flex" gap={2} my={1} alignItems="center">
          <span>address2</span>
          <TextField
            size="small"
            type="text"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
          />
        </Box>
        <Box display="flex" gap={2} my={1} alignItems="center">
          <span>city</span>
          <TextField
            size="small"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Box>
        <Box display="flex" gap={2} my={1} alignItems="center">
          <span>state</span>
          <TextField
            size="small"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </Box>
        <Box display="flex" gap={2} alignItems="center">
          <span>country</span>
          <TextField
            size="small"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Box>
        <Box display="flex" gap={2} my={1} alignItems="center">
          <span>zip</span>
          <TextField
            size="small"
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </Box>

        <Button variant="contained" size="small" onClick={() => submit()}>
          submit
        </Button>
      </Box>
      {showResult()}
    </Box>
  );
}

export default RyePaymentForm;
