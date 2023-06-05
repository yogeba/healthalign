// import { connectDatabase, getDatabase } from "lib/mongoClient";
import { connectToDatabase } from "lib/mongoClient";

export default async (req, res) => {
  try {
    // const client = await clientPromise();
    // console.log({ client });
    // const db = client.db("healthalign_db");

    // const products = await
    //   .collection("products")
    //   .find({})
    //   .sort()
    //   .limit(10)
    //   .toArray();

    const { db } = await connectToDatabase();
    // const db = getDatabase();

    const { id } = req.query;

    // Fetch data or perform any other operations using the MongoDB connection
    const data = await db.collection("products").findOne({ identifier: id });
    res.json(data);
  } catch (e) {
    console.error(e);
  }
};
