import React from "react";
import ProductPage from "../../components/products/ProductPage";
import { GetServerSideProps, NextPage } from "next";
import { fetchProduct } from "lib/products";
import { MARKETPLACE } from "constants/marketplace";

type IndividualProductProps = {
  individualProductData: any[];
};

const IndividualProduct: NextPage<IndividualProductProps> = ({
  individualProductData,
}) => {
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
  const { query } = context;
  const { id, type } = query;

  let productInfo;
  try {
    productInfo = await fetchProduct(id as string, type as MARKETPLACE); // Cast the `type` parameter to `MARKETPLACE`
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
