import client from "../apolloClient";
import { CHECKOUT_BY_CART_ID } from "graphql/cart.graphql";

export async function checkoutByCartId(cartID: string) {
  const variables = {
    cartID,
  };
  const query = CHECKOUT_BY_CART_ID;
  const { data } = await client.query({ variables, query });
  return data;
}
