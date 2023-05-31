import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

//Map the query to the Rye API

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // console.log(req.query, "query");
  // if (req.query.query == "") {
  //   throw new Error("fail");
  // }

  // let query = req.query.query! as string;

  // if (!query.toLowerCase().includes("id")) {
  //   query = query.trim() + " id";
  // }

  // console.log({ query });
  const { pid } = req.query;
  // res.end(`Post: ${pid}`);

  const { data } = await axios.get(`https://search.api.rye.com/product/${pid}`);

  return res.json(data);
};

type Product = {
  tags: string[];
  category: string;
};
