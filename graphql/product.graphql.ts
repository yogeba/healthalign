import gql from "graphql-tag";

export const SHOPIFY_PRODUCT_BY_ID = gql`
  query DemoShopifyProductByID($input: ProductByIDInput!) {
    product: productByID(input: $input) {
      title
      vendor
      marketplace
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

export const AMAZON_PRODUCT_BY_ID = gql`
  query DemoAmazonProductFetch($input: ProductByIDInput!) {
    product: productByID(input: $input) {
      title
      vendor
      marketplace
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

export const REQUEST_PRODUCT_BY_URL = gql`
  mutation RequestProductByURL($input: RequestProductByURLInput!) {
    requestProductByURL(input: $input) {
      productID
    }
  }
`;
