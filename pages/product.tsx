import React from "react";
import ProductPage from "components/products/ProductPage";
import { GetServerSideProps, NextPage } from "next";

type IndividualProductProps = {
  individualProductData: any[];
};

const IndividualProduct: NextPage<IndividualProductProps> = ({
  individualProductData,
}) => {
  console.log(individualProductData, "individualProductData");
  // Rest of your component code...
  return (
    <main>
      <ProductPage productData={individualProductData} />
    </main>
  );
};

export const getServerSideProps: GetServerSideProps<
  IndividualProductProps
> = async (context) => {
  const { query, req } = context;
  const { id } = query;
  const host = req.headers.host;

  let productInfo;
  try {
    const response = await fetch(`http://${host}/api/product?id=${id}`);
    if (response.ok) {
      productInfo = await response.json();
    } else {
      throw new Error("API request failed");
    }
  } catch (e) {
    console.log("CAUGHT ERROR ON PRODUCT, requested by URL");
  }

  return {
    props: {
      individualProductData: productInfo,
    },
  };
};

export default IndividualProduct;
