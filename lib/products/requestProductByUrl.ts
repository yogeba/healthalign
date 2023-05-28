import client from "../apolloClient";
import { MARKETPLACE } from "constants/marketplace";
import { REQUEST_PRODUCT_BY_URL } from "graphql/product.graphql";

export async function requestProductByURL(
  url: string,
  marketplace: MARKETPLACE
) {
  const variables = {
    input: {
      url,
      marketplace,
    },
  };
  const mutation = REQUEST_PRODUCT_BY_URL;
  const { data } = await client.mutate({ variables, mutation });
  return data;
}
