// components/ProductCard.tsx

import React from "react";
import { MARKETPLACE } from "../constants/marketplace";

//TODO reshape
type ShopifyProduct = {
  id: string;
  name: string;
  imageUrl: string;
  marketplace: string;
  price: number;
  description: string;
};

//TODO reshape
type AmazonProduct = {
  id: string;
  name: string;
  images: any[];
  marketplace: string;
  price: number;
  description: string;
};

interface ProductCardProps {
  product: AmazonProduct | ShopifyProduct;
}

//TODO check Types with yogesh
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  console.log(product, "this is new individual product");
  if (product.marketplace === MARKETPLACE.AMAZON) {
    return (
      <div className="bg-white rounded-lg shadow p-4 flex flex-col">
        <img
          className="w-full h-48 object-cover mb-4"
          src={product?.images[0]?.url}
          alt={product?.title}
        />
        <h2 className="text-lg font-semibold mb-2">{product?.title}</h2>
        <p className="text-gray-600 mb-2">{product?.vendor}</p>
        <p className="font-bold text-lg">${product.price?.displayValue}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <img
        className="w-full h-48 object-cover mb-4"
        src={product.images[0]?.url}
        alt={product.name}
      />
      <h2 className="text-lg font-semibold mb-2">{product.vendor}</h2>
      <p className="text-gray-600 mb-2">{product.title}</p>
      <p className="font-bold text-lg">${product.price?.displayValue}</p>
    </div>
  );
};

export default ProductCard;
