import client from "../apolloClient";
import { UPDATE_CART_BUYER_IDENTITY } from "graphql/cart.graphql";
import { CartBuyerIdentityUpdateInput } from "./inputs/updateCart";

export async function updateCartBuyerIdentity(
  input: CartBuyerIdentityUpdateInput
) {
  const variables = {
    input,
  };
  const mutation = UPDATE_CART_BUYER_IDENTITY;
  const { data } = await client.mutate({ variables, mutation });
  return data;
}
