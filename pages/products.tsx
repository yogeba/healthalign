import React, { useEffect, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import ProductsPage from "components/products";

interface ProductsProps {
  products: any[]; // Adjust the type of products based on your API response
}
interface APIData {
  _id: string;
  identifier: string;
  title: string;
  vendor: string;
  marketplace: string;
  description: string;
  url: string;
  isAvailable: boolean;
  images: { url: string }[];
  variants: { title: string; image: { url: string } }[];
  price: {
    displayValue: string;
    currency: string;
    value: number;
  };
  ASIN: string;
  manufacturer: null | string;
  tags: string[];
  categories: { name: string; categoryID: string }[];
  grade: string;
  properties: {
    [key: string]: {
      found: string;
      claimed: string;
    };
  };
  ingredients: string[];
  score: number;
  parentCategory: string;
}

const Products: NextPage<ProductsProps> = ({ products }) => {
  useEffect(() => {
    sortByGrade(products);
  }, [products]);

  const sortByGrade = (apiData: APIData[]) => {
    // Update the parameter type to an array of APIData objects
    const sortedData = apiData.sort((a, b) => {
      const gradeA = a.grade;
      const gradeB = b.grade;

      // Extract grade values without the positive/negative symbols
      const processedGradeA = gradeA.replace(/[+-]/, "");
      const processedGradeB = gradeB.replace(/[+-]/, "");

      // Compare grades alphabetically
      if (processedGradeA < processedGradeB) {
        return -1;
      } else if (processedGradeA > processedGradeB) {
        return 1;
      }

      // If grades are the same, consider positive/negative symbols
      const positiveA = gradeA.includes("+");
      const positiveB = gradeB.includes("+");

      if (positiveA && !positiveB) {
        return -1;
      } else if (!positiveA && positiveB) {
        return 1;
      }

      return 0; // Grades are equal
    });

    // Update the state with the sorted data, if needed
    return sortedData;
  };
  const [supplymentData, setSupplymentData] = useState<string[]>([]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const suplymentData = localStorage.getItem("supplementNames");
      if (suplymentData) {
        console.log(supplymentData);
        setSupplymentData(JSON.parse(suplymentData || ""));
      }
    }
  }, []);

  return (
    <main className="h-screen">
      <ProductsPage productsData={products} supplymentData={supplymentData} />
    </main>
  );
};

export const getServerSideProps: GetServerSideProps<ProductsProps> = async ({
  req,
}) => {
  const host = req.headers.host;
  // const apiUrl = `http://${host}/api/search?searchQuery=supplement`;
  const apiUrl = `http://${host}/api/search?searchQuery=supplement`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    return {
      props: {
        products: data,
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
