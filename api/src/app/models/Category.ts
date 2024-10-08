import { model, Schema } from "mongoose";

export const Category = model(
  "Category",
  new Schema({
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    restaurantId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Restaurant",
    },
  })
);
