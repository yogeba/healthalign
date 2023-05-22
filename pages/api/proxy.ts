//pages/api/proxy.ts

const express = require("express");
const axios = require("axios");
const cors = require("cors");
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const app = express();

app.use(cors());

app.post("/proxy", async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const encodedKey = Buffer.from(process.env.RYE_API_KEY || "").toString(
      "base64"
    );
    const authHeader = `Basic ${encodedKey}`;

    const response = await axios.post(
      "https://graphql.api.rye.com/v1/query",
      req.body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${authHeader}`,
        },
      }
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred." });
    }
  }
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
