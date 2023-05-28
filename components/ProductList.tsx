import React, { useEffect, useState } from "react";
import { Product } from "../types";
import { fetchProduct } from "../lib/products/fetchProduct";
import { MARKETPLACE } from "../constants/marketplace";
import { useRouter } from "next/router";
import { addCartItems, createCart } from "lib/cart";

interface ProductListProps {
  products?: Product[];
}
const ProductList: React.FC<ProductListProps> = ({ products = [] }) => {
  const [cartId, setCartId] = useState<string | null>(null);
  const router = useRouter();

  const getProductMarketplace = (product: Product) => {
    return product?.request_domain === "amazon.com"
      ? MARKETPLACE.AMAZON
      : MARKETPLACE.SHOPIFY;
  };

  const handleBuyNow = async (product: Product) => {
    const input = {
      items: {
        amazonCartItemsInput: [],
        shopifyCartItemsInput: [],
      },
    };

    const marketplace =
      product?.request_domain === "amazon.com"
        ? MARKETPLACE.AMAZON
        : MARKETPLACE.SHOPIFY;
    const productDetails = await fetchProduct(product.id, marketplace);

    if (marketplace === MARKETPLACE.AMAZON) {
      input.items.amazonCartItemsInput = [
        { productId: product.id, quantity: 1 },
      ];
    }

    if (marketplace === MARKETPLACE.SHOPIFY) {
      input.items.shopifyCartItemsInput = [
        { variantId: product?.variants[0]?.id, quantity: 1 },
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

  const getProductUrl = (product: Product) => {
    console.log("TODO", product?.marketplace);
    return getProductMarketplace(product) === MARKETPLACE.SHOPIFY
      ? product.store_canonical_url + product.url
      : product?.url;
  };

  useEffect(() => {
    const cartId = localStorage.getItem("cartId");
    if (cartId) {
      setCartId(cartId);
    }
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="product-card bg-white shadow-md rounded p-4 flex flex-col"
        >
          <img
            className="w-full h-64 object-cover mb-4 rounded"
            src={product.image_url}
            alt={product.title}
          />
          <div className="flex-grow">
            <button
              onClick={() =>
                router.push(
                  `/pdp?id=` +
                    product.id +
                    "&marketplace=" +
                    getProductMarketplace(product) +
                    "&url=" +
                    encodeURIComponent(getProductUrl(product))
                )
              }
              className="text-xl font-semibold mb-2 flex-1 truncate"
            >
              {product.title}
            </button>
            {/* <p className="text-gray-700 mb-4">{product.description}</p> */}
            <p className="text-lg font-bold mb-4 flex-1">
              Price: ${product.formatted_price}
            </p>
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 mt-auto hover:bg-black/80 w-full"
              onClick={() => handleBuyNow(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
