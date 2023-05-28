import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cart from "../components/Cart";

const CartPage: React.FC = () => {
  const [cartId, setCartId] = useState<any>();

  useEffect(() => {
    const cartId = localStorage.getItem("cartId");
    if (cartId) setCartId(cartId);
  }, []);

  return (
    <div>
      <h1>Your Product</h1>
      <div>
        <h1>Your Cart</h1>
        {cartId && <Cart cartId={cartId} />}
      </div>
    </div>
  );
};

export default CartPage;
