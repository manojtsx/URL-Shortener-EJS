import mongoose, { Schema } from "mongoose";

const urlSchema = new Schema({
  url: { type: String, required: true },
  urlId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

const URL = mongoose.model("url", urlSchema);
export default URL;
