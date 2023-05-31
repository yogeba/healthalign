import { BuyerIdentityInput, CartItemsInput } from "./common";

export type CartCreateInput = {
  items: CartItemsInput;
  buyerIdentity?: BuyerIdentityInput;
  isEmailMarketingAllowed?: boolean;
};
