import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

//Map the query to the Rye API

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.query == "") {
    throw new Error("fail");
  }

  let query = req.query.query! as string;

  if (!query.toLowerCase().includes("supplement")) {
    query = query.trim() + " supplement";
  }

  const { data } = await axios.get(
    "https://search.api.rye.com/search?query=" +
      encodeURIComponent(query as string)
  );

  data.products = data.products.filter(
    (x: Product) =>
      x.category === "accessory" &&
      x.tags.filter((y) => !!y.match(/supplement/i))
  );

  return res.json(data);
};

type Product = {
  tags: string[];
  category: string;
};
