// pages/api/graphql.js
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

console.log(process.env.RYE_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  if (method !== "POST") {
    res.setHeader("Allow", "POST");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(405).end("Method Not Allowed");
  }

  try {
    const response = await axios.post(
      "https://graphql.api.rye.com/v1/query",
      body,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000/",
          "Access-Control-Allow-Methods": "POST, GET, PUT",
          "Access-Control-Allow-Headers": "Content-Type",
          Authorization: `Bearer ${process.env.RYE_API_KEY}`,
        },
      }
    );

    console.log(response.data);

    res.status(response.status).json(response.data);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred." });
    }
  }
}
