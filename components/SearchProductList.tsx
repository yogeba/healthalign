import React, { useEffect, useState } from "react";
import { fetchProduct } from "../lib/products/fetchProduct";
import { MARKETPLACE } from "../constants/marketplace";
import { useRouter } from "next/router";
import { addCartItems, createCart } from "lib/cart";
import { ProductById } from "types";
import { Marketplace } from "@rye-api/rye-pay";

interface ProductListProps {
  products?: ProductById[];
}
const SearchProductList: React.FC<ProductListProps> = ({ products = [] }) => {
  const [cartId, setCartId] = useState<string | null>(null);
  const router = useRouter();

  const handleBuyNow = async (product: ProductById) => {
    const input: any = {
      items: {
        amazonCartItemsInput: [],
        shopifyCartItemsInput: [],
      },
    };

    const marketplace =
      product.marketplace === MARKETPLACE.SHOPIFY
        ? MARKETPLACE.SHOPIFY
        : MARKETPLACE.AMAZON;
    const productDetails = await fetchProduct(product.identifier, marketplace);

    if (marketplace === MARKETPLACE.AMAZON) {
      input.items.amazonCartItemsInput = [
        { productId: product.identifier, quantity: 1 },
      ];
    }

    if (marketplace === MARKETPLACE.SHOPIFY) {
      input.items.shopifyCartItemsInput = [
        { variantId: product.identifier, quantity: 1 },
      ];
    }

    if (!cartId) {
      const { data: createCartData } = await createCart(input);
      localStorage.setItem("cartId", createCartData.createCart.cart.id);
      setCartId(createCartData.createCart.cart.id);
    } else {
      await addCartItems({ id: cartId, items: input.items });
    }
  };

  useEffect(() => {
    const cartId = localStorage.getItem("cartId");
    if (cartId) {
      setCartId(cartId);
    }
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product, index) => (
        <div
          key={product.identifier + index}
          className="product-card bg-white shadow-md rounded p-4 flex flex-col"
        >
          <img
            className="w-full h-64 object-cover mb-4 rounded"
            src={product?.images[0]?.url}
            alt={product.title}
          />
          <div className="flex-grow">
            key={product.identifier + index}
            <button
              onClick={() =>
                router.push(
                  `/pdp?id=` +
                    product.identifier +
                    "&marketplace=" +
                    product.marketplace +
                    "&url=" +
                    encodeURIComponent(product.url)
                )
              }
              className="text-xl font-semibold mb-2 flex-1 truncate"
            >
              {product.title}
            </button>
            {/* <p className="text-gray-700 mb-4">{product.description}</p> */}
            <p className="text-lg font-bold mb-4 flex-1">
              {product.price.displayValue
                ? "Price: $" + product.price.displayValue
                : "Price Unavailable"}
            </p>
            {/* {product.price.displayValue && (
              <button
                className="bg-black rounded-xl text-white font-medium px-4 py-2 mt-auto hover:bg-black/80 w-full"
                onClick={() => handleBuyNow(product)}
                disabled={!product.price.displayValue}
              >
                Add to Cart
              </button>
            )}
            {!product.price.displayValue && (
              <button
                className="rounded-xl text-black font-medium px-4 py-2 mt-auto w-full bg-yellow-200"
                onClick={() => handleBuyNow(product)}
                disabled={!product.price.displayValue}
              >
                Product Unavailable
              </button>
            )} */}
            <button
              className="rounded-xl text-black font-medium px-4 py-2 mt-auto w-full bg-yellow-200"
              onClick={() => router.push(product.url)}
            >
              Buy Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchProductList;
