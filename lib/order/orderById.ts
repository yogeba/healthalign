import client from "../apolloClient";
import { ORDER_BY_ID } from "graphql/order.graphql";

export async function getOderByID(id: string) {
  const variables = {
    id,
  };
  const query = ORDER_BY_ID;
  const { data } = await client.query({ variables, query });
  return data;
}
