import React, { useEffect, useState } from "react";
import { CartProps } from "../types";
import { getCartById } from "../lib/cart/getCart";
import { useRouter } from "next/router";
import {
  deleteCartItems,
  updateCartBuyerIdentity,
  updateCartItems,
  updateCartSelectedShippingOptions,
} from "lib/cart";

// ...
const Cart: React.FC<CartProps> = ({ cartId }) => {
  // ...
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState<any>();
  const router = useRouter();

  const updateQuantity = async (
    productId: string,
    variantId: string,
    quantity: number
  ) => {
    const input = {
      id: cartId,
      items: {
        amazonCartItemsInput: productId ? [{ productId, quantity }] : [],
        shopifyCartItemsInput: variantId ? [{ variantId, quantity }] : [],
      },
    };
    await updateCartItems(input);
    fetchCartDetails();
  };

  const removeItem = async (productId: string, variantId: string) => {
    const input = {
      id: cartId,
      items: {
        amazonProducts: productId ? [{ productId }] : [],
        shopifyProducts: variantId ? [{ variantId }] : [],
      },
    };

    await deleteCartItems(input);
    fetchCartDetails();
  };

  const updateBuyerIdentity = async () => {
    // add form or anything to update customer details
    const input = {
      id: cartId,
      buyerIdentity: {
        firstName: "akash",
        lastName: "mathwani",
        email: "ak@ak.com",
        phone: "9888927389",
        address1: "mansarovar",
        address2: "singh",
        city: "Jaipur",
        provinceCode: "RJ",
        countryCode: "IN",
        postalCode: "302020",
      },
    };
    await updateCartBuyerIdentity(input);
    fetchCartDetails();
  };

  const updateShippingOptions = async () => {
    // add  custom logic  to update shipping options
    //TODO mao store and cart types
    const stores = cart?.stores;
    if (stores?.length) {
      const shippingOptionsNotUpdated = stores
        .map((storeInfo: any) => {
          if (
            !storeInfo?.offer?.selectedShippingMethod &&
            storeInfo?.offer?.shippingMethods?.length
          ) {
            return {
              store: storeInfo?.store,
              shippingId: storeInfo?.offer?.shippingMethods[0]?.id,
            };
          }
        })
        .filter(Boolean);
      if (shippingOptionsNotUpdated.length > 0)
        await updateCartSelectedShippingOptions({
          id: cartId,
          shippingOptions: shippingOptionsNotUpdated,
        });
      fetchCartDetails();
    } else {
      console.log("no products stores to update shipping options");
    }
  };

  const fetchCartDetails = async () => {
    const cartId = localStorage.getItem("cartId");

    if (cartId) {
      setLoading(true);
      const cart = await getCartById(cartId);
      setLoading(false);
      setCart(cart);
    }
  };

  useEffect(() => {
    fetchCartDetails();
  }, [cart]);

  const proceedToCheckout = async () => {
    // Implement your checkout logic here
    console.log("Proceeding to checkout...");
    router.push("/checkout");
  };

  if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  // const cart = data.getCart.cart;
  return (
    <div className="flex flex-col pb-3">
      <h2>Items in your cart:</h2>
      <h2>Subtotal Cost: {cart?.cost?.subtotal?.displayValue}</h2>
      <h2>Shipping Cost {cart?.cost?.shipping?.displayValue || "$0"}</h2>
      <h2>Buyer: {JSON.stringify(cart?.buyerIdentity)}</h2>

      <ul className="max-w-md space-y-1 text-gray-500 list-none list-inside dark:text-gray-400">
        {cart &&
          cart.stores.map((store: any) => {
            return store.cartLines.map((item: any) => {
              return (
                <li key={item.product?.id || item.variant?.id}>
                  {item.product?.id || item.variant?.id}: {item.quantity}
                  <img
                    className="w-full h-48 object-cover mb-4"
                    src={
                      item?.product?.images[0]?.url || item?.variant?.image?.url
                    }
                    alt={item?.product?.title}
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() =>
                      removeItem(item.product?.id, item.variant?.id)
                    }
                  >
                    Remove
                  </button>
                </li>
              );
            });
          })}
      </ul>

      <h2>Total Cost {cart?.cost?.total?.displayValue || "$0"}</h2>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => updateBuyerIdentity()}
      >
        Update Customer Details
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => updateShippingOptions()}
      >
        Update Shipping Options
      </button>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={proceedToCheckout}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;
