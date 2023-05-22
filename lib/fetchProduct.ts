import gql from "graphql-tag";
import client from "./apolloClient";

async function fetchAmazonProduct(id: string) {
  const variables = {
    input: {
      id,
      marketplace: "AMAZON",
    },
  };
  const query = gql`
    query DemoAmazonProductFetch($input: ProductByIDInput!) {
      product: productByID(input: $input) {
        title
        vendor
        url
        marketplace
        isAvailable
        images {
          url
        }
        price {
          displayValue
        }
        ... on AmazonProduct {
          ASIN
        }
      }
    }
  `;
  const data = await client.query({ variables, query });
  return data;
}

async function fetchShopifyProduct(id: string) {
  const variables = {
    input: {
      id,
      marketplace: "SHOPIFY",
    },
  };
  const query = gql`
    query DemoShopifyProductByID($input: ProductByIDInput!) {
      product: productByID(input: $input) {
        title
        vendor
        url
        marketplace
        isAvailable
        variants {
          ... on ShopifyVariant {
            id
          }
          title
        }
        images {
          url
        }
        price {
          displayValue
        }
        ... on ShopifyProduct {
          tags
          storeCanonicalURL
        }
      }
    }
  `;
  const data = await client.query({ variables, query });
  console.log(JSON.stringify(data, undefined, 2));

  return data;
}

export async function fetchProduct(id: string) {
  try {
    return await fetchAmazonProduct(id);
  } catch (error) {
    console.log("here");
    console.error(error);
    return await fetchShopifyProduct(id);
  }
}
