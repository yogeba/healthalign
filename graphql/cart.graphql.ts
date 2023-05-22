// graphql/cart.graphql.ts
import { gql } from "@apollo/client";

export const CREATE_CART = gql`
  mutation createCart($input: CartCreateInput!) {
    createCart(input: $input) {
      id
      stores {
        ... on AmazonStore {
          store
          cartLines {
            quantity
            product {
              id
            }
          }
          offer {
            subtotal {
              value
              currency
              displayValue
            }
            margin {
              value
              currency
              displayValue
            }
            notAvailableIds
            shippingMethods {
              id
              label
              taxes {
                value
                currency
                displayValue
              }
              price {
                value
                currency
                displayValue
              }
              total {
                value
                currency
                displayValue
              }
            }
          }
        }
        ... on ShopifyStore {
          store
          cartLines {
            quantity
            variant {
              id
            }
          }
          offer {
            subtotal {
              value
              currency
              displayValue
            }
            margin {
              value
              currency
              displayValue
            }
            notAvailableIds
            shippingMethods {
              id
              label
              taxes {
                value
                currency
                displayValue
              }
              price {
                value
                currency
                displayValue
              }
              total {
                value
                currency
                displayValue
              }
            }
          }
        }
      }
    }
  }
`;

export const ADD_CART_ITEMS = gql`
  mutation ($input: CartItemsAddInput!) {
    addCartItems(input: $input) {
      cart {
        id
        stores {
          ... on AmazonStore {
            store
            cartLines {
              quantity
              product {
                id
              }
            }
          }
          ... on ShopifyStore {
            store
            cartLines {
              quantity
              variant {
                id
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_CART = gql`
  query ($id: ID!) {
    getCart(id: $id) {
      cart {
        id
        stores {
          ... on AmazonStore {
            store
            cartLines {
              quantity
              product {
                id
              }
            }
            offer {
              errors {
                code
                message
                details {
                  ... on AmazonOfferErrorDetails {
                    productIds
                  }
                }
              }
              subtotal {
                value
                displayValue
                currency
              }
              margin {
                value
                displayValue
                currency
              }
              shippingMethods {
                id
                label
                price {
                  value
                  displayValue
                  currency
                }
                taxes {
                  value
                  displayValue
                  currency
                }
                total {
                  value
                  displayValue
                  currency
                }
              }
            }
          }
          ... on ShopifyStore {
            store
            cartLines {
              quantity
              variant {
                id
              }
            }
            offer {
              errors {
                code
                message
                details {
                  ... on ShopifyOfferErrorDetails {
                    variantIds
                  }
                }
              }
              subtotal {
                value
                displayValue
                currency
              }
              margin {
                value
                displayValue
                currency
              }
              shippingMethods {
                id
                label
                price {
                  value
                  displayValue
                  currency
                }
                taxes {
                  value
                  displayValue
                  currency
                }
                total {
                  value
                  displayValue
                  currency
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const REMOVE_CART_ITEMS = gql`
  mutation ($input: CartItemsRemoveInput!) {
    removeCartItems(input: $input) {
      cart {
        id
        stores {
          ... on AmazonStore {
            store
            cartLines {
              quantity
              product {
                id
              }
            }
          }
          ... on ShopifyStore {
            store
            cartLines {
              quantity
              variant {
                id
              }
            }
          }
        }
      }
    }
  }
`;
