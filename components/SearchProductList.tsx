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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product, index) => (
        <div
          key={product.identifier + index}
          className="flex flex-col p-4 bg-white rounded shadow-md product-card"
        >
          <img
            className="object-cover w-full h-64 mb-4 rounded"
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
              className="flex-1 mb-2 text-xl font-semibold truncate"
            >
              {product.title}
            </button>
            {/* <p className="mb-4 text-gray-700">{product.description}</p> */}
            <p className="flex-1 mb-4 text-lg font-bold">
              {product.price.displayValue
                ? "Price: $" + product.price.displayValue
                : "Price Unavailable"}
            </p>
            {/* {product.price.displayValue && (
              <button
                className="w-full px-4 py-2 mt-auto font-medium text-white bg-black rounded-xl hover:bg-black/80"
                onClick={() => handleBuyNow(product)}
                disabled={!product.price.displayValue}
              >
                Add to Cart
              </button>
            )}
            {!product.price.displayValue && (
              <button
                className="w-full px-4 py-2 mt-auto font-medium text-black bg-yellow-200 rounded-xl"
                onClick={() => handleBuyNow(product)}
                disabled={!product.price.displayValue}
              >
                Product Unavailable
              </button>
            )} */}
            <button
              className="w-full px-4 py-2 mt-auto font-medium text-black rounded-xl"
              onClick={() => router.push(product.url)}
            >
              Buy Now\
            </button>
            <button
              className="w-full px-4 py-2 mt-auto font-medium text-black rounded-xl"
              onClick={() => router.push(`/product?id=${product.identifier}`)}
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchProductList;
