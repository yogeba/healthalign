import React, { useEffect, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import ProductsPage from "../../components/products";

interface ProductsProps {
  products: any[]; // Adjust the type of products based on your API response
}

const Products: NextPage<ProductsProps> = ({ products }) => {
  console.log(products, "products products");
  const [supplymentData, setSupplymentData] = useState<string[]>([]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const suplymentData = localStorage.getItem("supplementNames");
      if (suplymentData) {
        setSupplymentData(JSON.parse(suplymentData || ""));
      }
    }
  }, []);

  return (
    <main>
      <ProductsPage productsData={products} supplymentData={supplymentData} />
    </main>
  );
};

export const getServerSideProps: GetServerSideProps<ProductsProps> = async ({
  req,
}) => {
  const host = req.headers.host;
  const apiUrl = `http://${host}/api/rye?query=supplement`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    return {
      props: {
        products: data.products,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        products: [],
      },
    };
  }
};

export default Products;
