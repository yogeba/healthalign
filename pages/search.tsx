// pages/products.tsx

import React, { useEffect, useState } from "react";
import SearchProductList from "components/SearchProductList";
import { useRouter } from "next/router";

const SearchProducts = () => {
  const router = useRouter();
  const query = router.query;
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    if (!query.query) return;
    const res = await fetch(`/api/search?searchQuery=${query.query}`);
    const products = await res.json();
    setProducts(products);
  };

  useEffect(() => {
    if (!query) return;

    fetchData();
  }, [query]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <SearchProductList products={products} />
    </div>
  );
};

export default SearchProducts;
