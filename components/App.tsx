import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import { Product } from "types/searchProduct";

function App() {
  const [product, setProduct] = useState<any | null>(null);

  /*  async function handleResponse(response: any) {
    // Extract the product ID and marketplace from the response
    const productId = "B09H6T8LTR"; // Replace with the extracted product ID
    const marketplace = "AMAZON"; // Replace with the extracted marketplace

    // Fetch the product information using the RPC protocol
    const fetchedProduct = await fetchProduct(productId, marketplace);

    // Update the state with the fetched product information
    setProduct(fetchedProduct);
  } */

  return (
    <div className="App">
      {/* Your application code */}
      {product && <ProductCard product={product} />}
    </div>
  );
}

export default App;
