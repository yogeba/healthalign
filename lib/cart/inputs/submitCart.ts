import { BillingAddressInput, SelectedShippingOption } from "./common";

export type CartSubmitInput = {
  id: string | number;
  token: string;
  billingAddress: BillingAddressInput;
  selectedShippingOptions: SelectedShippingOption[];
};
