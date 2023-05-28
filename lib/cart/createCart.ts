import client from "../apolloClient";
import { CREATE_CART } from "graphql/cart.graphql";
import { CartCreateInput } from "./inputs";

export async function createCart(input: CartCreateInput) {
  const variables = {
    input,
  };
  const mutation = CREATE_CART;
  const { data } = await client.mutate({ variables, mutation });
  return data;
}
