// pages/products.tsx

import React, { useEffect, useState } from "react";
import ProductList from "../components/ProductList";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/rye?query=supplement");
      const data = await res.json();
      setProducts(data.products);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <ProductList products={products} />
    </div>
  );
};

export default Products;
