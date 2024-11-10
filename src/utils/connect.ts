import mongoose from "mongoose";
import { config } from "dotenv";
config();
const uri = process.env.MONGODB_URI;

export default async function connect() {
  if (uri) {
    const connection = await mongoose.connect(uri);
    if (!connection) {
      throw new Error("Couldnot connect to database");
    }
    return connection;
  }
  throw new Error("Could not find database connection");
}
