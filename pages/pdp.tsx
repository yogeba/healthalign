import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductCard from "../components/ProductCard";
import { fetchProduct } from "../lib/products/fetchProduct";
import { MARKETPLACE } from "../constants/marketplace";
import ProductList from "../components/ProductList";
import { requestProductByURL } from "lib/products";
import axios from "axios";

const PDPPage: React.FC = () => {
  const router = useRouter();
  const query = router.query;
  const { id, marketplace, url } = query;
  const [product, setProduct] = useState<any>();
  const [productRecommendations, setProductRecommendations] = useState<any>();

  const fetchProductDetails = async () => {
    if (!id || !marketplace || !url) return;

    let productInfo;
    try {
      productInfo = await fetchProduct(id.toString(), marketplace.toString());
    } catch (e) {
      console.log("CAUGHT ERROR ON PRODUCT, request by URL");
      const res = await requestProductByURL(url, marketplace);
      //TODO this might be a loop
      // refresh will work if product is not available
    }
    const recommendationsData = await fetch(`/api/recommendations?pid=${id}`);
    const recommendations = await recommendationsData.json();

    setProduct(productInfo);
    setProductRecommendations(recommendations?.recommended_products);
  };

  useEffect(() => {
    if (!router.query) {
      return;
    }
    fetchProductDetails();
  }, [query]);

  if (!product || !productRecommendations) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Your Product</h1>
      {product && <ProductCard product={product} />}
      <h1>Recommended Products {productRecommendations?.length}</h1>
      {productRecommendations && (
        <div>
          <h1 className="text-2xl font-bold mb-4">Products</h1>
          <ProductList products={productRecommendations} />
        </div>
      )}
    </div>
  );
};

export default PDPPage;
