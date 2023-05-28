import client from "../apolloClient";
import { MARKETPLACE } from "../../constants/marketplace";
import {
  AMAZON_PRODUCT_BY_ID,
  SHOPIFY_PRODUCT_BY_ID,
} from "graphql/product.graphql";

export async function fetchAmazonProduct(id: string) {
  const variables = {
    input: {
      id,
      marketplace: "AMAZON",
    },
  };
  const query = AMAZON_PRODUCT_BY_ID;
  const { data } = await client.query({ variables, query });
  return data?.product;
}

export async function fetchShopifyProduct(id: string) {
  const variables = {
    input: {
      id,
      marketplace: "SHOPIFY",
    },
  };
  const query = SHOPIFY_PRODUCT_BY_ID;
  const { data } = await client.query({ variables, query });
  return data?.product;
}

export async function fetchProduct(id: string, marketplace: MARKETPLACE) {
  switch (marketplace) {
    case MARKETPLACE.AMAZON:
      return await fetchAmazonProduct(id);
    case MARKETPLACE.SHOPIFY:
      return await fetchShopifyProduct(id);
    default:
      throw new Error("invalid marketplace");
  }
}
