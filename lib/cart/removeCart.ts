import client from "../apolloClient";
import { REMOVE_CART } from "graphql/cart.graphql";

export async function removeCart(cartID: string) {
  const variables = {
    input: {
      id: cartID,
    },
  };
  const mutation = REMOVE_CART;
  const { data } = await client.mutate({ variables, mutation });
  return data;
}
