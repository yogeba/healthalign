import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_CART,
  ADD_CART_ITEMS,
  REMOVE_CART_ITEMS,
} from "../graphql/cart.graphql";
import { CartProps } from "../types";
// ...

const Cart: React.FC<CartProps> = ({ cartId }) => {
  // ...

  const [addCartItems] = useMutation(ADD_CART_ITEMS);
  const [removeCartItems] = useMutation(REMOVE_CART_ITEMS);

  const updateQuantity = (
    productId: string,
    variantId: string,
    quantity: number
  ) => {
    const input = {
      id: cartId,
      items: {
        amazonCartItemsInput: [{ productId, quantity }],
        shopifyCartItemsInput: [{ variantId, quantity }],
      },
    };

    addCartItems({ variables: { input } });
  };

  const removeItem = (productId: string, variantId: string) => {
    const input = {
      id: cartId,
      items: {
        amazonCartItemsInput: [{ productId }],
        shopifyCartItemsInput: [{ variantId }],
      },
    };

    removeCartItems({ variables: { input } });
  };

  const proceedToCheckout = () => {
    // Implement your checkout logic here
    console.log("Proceeding to checkout...");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const cart = data.getCart.cart;

  return (
    <div>
      <h2>Items in your cart:</h2>
      <ul>
        {cart.stores.map((store: any) => {
          return store.cartLines.map((item: any) => (
            <li key={item.product?.id || item.variant?.id}>
              {item.product?.id || item.variant?.id}: {item.quantity}
              <button
                onClick={() =>
                  updateQuantity(
                    item.product?.id,
                    item.variant?.id,
                    item.quantity + 1
                  )
                }
              >
                +
              </button>
              <button
                onClick={() =>
                  updateQuantity(
                    item.product?.id,
                    item.variant?.id,
                    item.quantity - 1
                  )
                }
              >
                -
              </button>
              <button
                onClick={() => removeItem(item.product?.id, item.variant?.id)}
              >
                Remove
              </button>
            </li>
          ));
        })}
      </ul>
      <button onClick={proceedToCheckout}>Proceed to Checkout</button>
    </div>
  );
};

export default Cart;
