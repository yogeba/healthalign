// pages/products.tsx

import React, { useEffect, useState } from "react";
import SearchProductList from "components/SearchProductList";
import { useRouter } from "next/router";

const ProductPage = () => {
  const router = useRouter();
  const query = router.query;
  const [product, setProduct] = useState([]);

  const fetchData = async () => {
    if (!query.id) return;
    const res = await fetch(`/api/product?id=${query.id}`);
    const product = await res.json();
    setProduct(product);
  };

  useEffect(() => {
    if (!query) return;

    fetchData();
  }, [query]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Product Page</h1>
      <h1 className="text-2xl font-bold mb-4">{JSON.stringify(product)}</h1>

      {/* <SearchProductList products={products} /> */}
    </div>
  );
};

export default ProductPage;
