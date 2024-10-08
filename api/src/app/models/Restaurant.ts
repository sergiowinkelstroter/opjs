import { model, Schema } from "mongoose";

export const Restaurant = model(
  "Restaurant",
  new Schema({
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  })
);
