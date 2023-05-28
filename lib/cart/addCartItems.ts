import client from "../apolloClient";
import { ADD_CART_ITEMS } from "graphql/cart.graphql";
import { CartItemsAddInput } from "./inputs";

export async function addCartItems(input: CartItemsAddInput) {
  const variables = {
    input,
  };
  const mutation = ADD_CART_ITEMS;
  const { data } = await client.mutate({ variables, mutation });
  return data;
}
