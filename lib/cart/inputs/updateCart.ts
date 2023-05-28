import { BuyerIdentityInput, SelectedShippingOption } from "./common";

export type CartBuyerIdentityUpdateInput = {
  id: string | number;
  buyerIdentity: BuyerIdentityInput;
  isEmailMarketingAllowed?: boolean;
};

export type UpdateCartSelectedShippingOptionsInput = {
  id: string | number;
  shippingOptions: SelectedShippingOption[];
};
