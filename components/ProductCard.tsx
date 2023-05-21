// components/ProductCard.tsx

import React from 'react';

type Product = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
};

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <img className="w-full h-48 object-cover mb-4" src={product.imageUrl} alt={product.name} />
      <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <p className="font-bold text-lg">${product.price}</p>
    </div>
  );
};

export default ProductCard;
