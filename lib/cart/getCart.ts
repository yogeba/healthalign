import gql from "graphql-tag";
import client from "../apolloClient";
import { GET_CART } from "graphql/cart.graphql";

export async function getCartById(id: string) {
  const variables = {
    id,
  };
  const query = GET_CART;
  const { data } = await client.query({ variables, query });
  return data?.getCart?.cart;
}
