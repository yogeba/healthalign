import client from "../apolloClient";
import { DELETE_CART_ITEMS } from "graphql/cart.graphql";
import { CartItemsDeleteInput } from "./inputs";

export async function deleteCartItems(input: CartItemsDeleteInput) {
  const variables = {
    input,
  };
  const mutation = DELETE_CART_ITEMS;
  const { data } = await client.mutate({ variables, mutation });
  return data;
}
