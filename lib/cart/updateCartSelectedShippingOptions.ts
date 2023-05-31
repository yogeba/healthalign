import client from "../apolloClient";
import { UPDATE_CART_SHIPPING_OPTIONS } from "graphql/cart.graphql";
import { UpdateCartSelectedShippingOptionsInput } from "./inputs/updateCart";

export async function updateCartSelectedShippingOptions(
  input: UpdateCartSelectedShippingOptionsInput
) {
  const variables = {
    input,
  };
  const mutation = UPDATE_CART_SHIPPING_OPTIONS;
  const { data } = await client.mutate({ variables, mutation });
  return data;
}
