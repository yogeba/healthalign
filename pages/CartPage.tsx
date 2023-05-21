import React from "react";
import { useRouter } from "next/router";
import Cart from "../components/Cart";

const CartPage: React.FC = () => {
  const router = useRouter();
  const { cartId } = router.query;

  return (
    <div>
      <h1>Your Cart</h1>
      {cartId && <Cart cartId={cartId as string} />}
    </div>
  );
};

export default CartPage;
