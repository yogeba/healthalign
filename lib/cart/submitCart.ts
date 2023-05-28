import client from "../apolloClient";
import { SUBMIT_CART } from "graphql/cart.graphql";
import { CartSubmitInput } from "./inputs";

export async function submitCart(input: CartSubmitInput) {
  const variables = {
    input,
  };
  const mutation = SUBMIT_CART;
  const { data } = await client.mutate({ variables, mutation });
  return data;
}
