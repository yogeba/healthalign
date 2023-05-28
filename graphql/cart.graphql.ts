// graphql/cart.graphql.ts
import { gql } from "@apollo/client";

export const CREATE_CART = gql`
  mutation createCart($input: CartCreateInput!) {
    createCart(input: $input) {
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
        buyerIdentity {
          firstName
          lastName
          address1
          address2
          city
          provinceCode
          countryCode
          postalCode
          email
          phone
        }
        cost {
          subtotal {
            displayValue
          }
          shipping {
            displayValue
          }
          total {
            displayValue
          }
        }
        stores {
          ... on AmazonStore {
            store
            cartLines {
              quantity
              product {
                id
                images {
                  url
                }
              }
            }
            offer {
              selectedShippingMethod {
                id
              }
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
                image {
                  url
                }
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
              selectedShippingMethod {
                id
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

export const DELETE_CART_ITEMS = gql`
  mutation ($input: CartItemsDeleteInput!) {
    deleteCartItems(input: $input) {
      cart {
        id
        buyerIdentity {
          firstName
          lastName
          address1
          address2
          city
          provinceCode
          countryCode
          postalCode
          email
          phone
        }
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
                displayValue
                currency
              }
              margin {
                value
                displayValue
                currency
              }
              notAvailableIds
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
              notAvailableIds
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

export const UPDATE_CART_ITEMS = gql`
  mutation ($input: CartItemsUpdateInput!) {
    updateCartItems(input: $input) {
      cart {
        id
        buyerIdentity {
          firstName
          lastName
          address1
          address2
          city
          provinceCode
          countryCode
          postalCode
          email
          phone
        }
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
                displayValue
                currency
              }
              margin {
                value
                displayValue
                currency
              }
              notAvailableIds
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
              notAvailableIds
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

export const UPDATE_CART_BUYER_IDENTITY = gql`
  mutation ($input: CartBuyerIdentityUpdateInput!) {
    updateCartBuyerIdentity(input: $input) {
      cart {
        id
        buyerIdentity {
          firstName
          lastName
          address1
          address2
          city
          provinceCode
          countryCode
          postalCode
          email
          phone
        }
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
                displayValue
                currency
              }
              margin {
                value
                displayValue
                currency
              }
              notAvailableIds
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
              notAvailableIds
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

export const UPDATE_CART_SHIPPING_OPTIONS = gql`
  mutation ($input: UpdateCartSelectedShippingOptionsInput!) {
    updateCartSelectedShippingOptions(input: $input) {
      cart {
        id
        buyerIdentity {
          firstName
          lastName
          address1
          address2
          city
          provinceCode
          countryCode
          postalCode
          email
          phone
        }
        stores {
          ... on AmazonStore {
            errors {
              code
              message
              details {
                productIds
              }
            }
            store
            cartLines {
              quantity
              product {
                id
              }
            }
            offer {
              selectedShippingMethod {
                id
                label
                price {
                  displayValue
                  value
                  currency
                }
                taxes {
                  displayValue
                  value
                  currency
                }
                total {
                  displayValue
                  value
                  currency
                }
              }
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
              notAvailableIds
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
            errors {
              code
              message
              details {
                variantIds
              }
            }
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
              selectedShippingMethod {
                id
                label
                price {
                  displayValue
                  value
                  currency
                }
                taxes {
                  displayValue
                  value
                  currency
                }
                total {
                  displayValue
                  value
                  currency
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
              notAvailableIds
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
      errors {
        code
        message
      }
    }
  }
`;

export const SUBMIT_CART = gql`
  mutation submitCart($input: CartSubmitInput!) {
    submitCart(input: $input) {
      id
      stores {
        status
        requestId
        store {
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

export const REMOVE_CART = gql`
  mutation ($input: CartDeleteInput!) {
    removeCart(input: $input) {
      deletedId
    }
  }
`;

export const CHECKOUT_BY_CART_ID = gql`
  query Checkout($cartID: ID!) {
    checkoutByCartID(cartID: $cartID) {
      status
      orders {
        id
        status
        events {
          __typename
          id
          createdAt
          ... on OrderFailedOrderEvent {
            reason
            id
            createdAt
          }
        }
      }
      cart {
        id
        stores {
          ... on AmazonStore {
            store
            requestId
            cartLines {
              product {
                id
              }
              quantity
            }
            offer {
              shippingMethods {
                id
                total {
                  displayValue
                }
              }
            }
            errors {
              message
            }
            isSubmitted
          }

          ... on ShopifyStore {
            store
            requestId
            cartLines {
              variant {
                id
              }
              quantity
            }
            offer {
              shippingMethods {
                id
                total {
                  displayValue
                }
              }
            }
            errors {
              message
            }
            isSubmitted
          }
        }
        buyerIdentity {
          firstName
          lastName
        }
      }
    }
  }
`;
