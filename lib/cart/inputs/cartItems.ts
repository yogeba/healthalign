import { CartItemsInput } from "./common";

export type CartItemsAddInput = {
  //cart id
  id: string | number;
  items: CartItemsInput;
};

export type CartItemsUpdateInput = {
  id: string | number;
  items: CartItemsInput;
};
