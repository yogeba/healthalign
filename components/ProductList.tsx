import React, { useState } from "react";
import { Product } from "../types";
import { CREATE_CART, ADD_CART_ITEMS } from "../graphql/cart.graphql";
import { useMutation } from "@apollo/client";
import { fetchProduct } from "../lib/fetchProduct";

interface ProductListProps {
  products?: Product[];
}
const ProductList: React.FC<ProductListProps> = ({ products = [] }) => {
  const [cartId, setCartId] = useState<string | null>(null);
  const [createCart, { loading: createCartLoading, error: createCartError }] =
    useMutation(CREATE_CART);
  const [
    addCartItems,
    { loading: addCartItemsLoading, error: addCartItemsError },
  ] = useMutation(ADD_CART_ITEMS);

  const handleBuyNow = async (product: Product) => {
    const input = {
      items: {
        amazonCartItemsInput: [],
        shopifyCartItemsInput: [],
      },
    };

    const { marketplace } = await fetchProduct(product.id);

    console.log(marketplace);
    if (marketplace === "AMAZON") {
      input.items.amazonCartItemsInput = [
        { productId: product.id, quantity: 1 },
      ];
    }

    if (marketplace === "SHOPIFY") {
      input.items.shopifyCartItemsInput = [
        { variantId: product.id, quantity: 1 },
      ];
    }

    console.log("here");
    console.log(input);
    if (!cartId) {
      const { data: createCartData } = await createCart({
        variables: { input },
      });
      setCartId(createCartData.createCart.cart.id);
    } else {
      await addCartItems({ variables: { input: { ...input, cartId } } });
    }
  };

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
            <h3 className="text-xl font-semibold mb-2 flex-1 truncate">
              {product.title}
            </h3>
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
