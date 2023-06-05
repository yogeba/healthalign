import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Get the file buffer from the request body
    const body = req.body;

    // Set the API endpoint and headers
    const apiUrl = "https://api.openai.com/v1/audio/transcriptions";
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    };

    // Send the request to the Whisper API
    const apiResponse = await axios.post(apiUrl, body, { headers });

    // Handle the API response
    return res.status(apiResponse.status).json({ text: apiResponse.data });
  } catch (error) {
    // Handle any errors
    console.error(error);
    console.error(error?.response?.data);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
