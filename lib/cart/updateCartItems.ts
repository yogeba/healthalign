import client from "../apolloClient";
import { UPDATE_CART_ITEMS } from "graphql/cart.graphql";
import { CartItemsUpdateInput } from "./inputs";

export async function updateCartItems(input: CartItemsUpdateInput) {
  const variables = {
    input,
  };
  const mutation = UPDATE_CART_ITEMS;
  const { data } = await client.mutate({ variables, mutation });
  return data;
}
