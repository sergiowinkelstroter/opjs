import { model, Schema } from "mongoose";

export const User = model(
  "User",
  new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    restaurantId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Restaurant",
    },
    role: {
      type: String,
      enum: ["admin", "manager", "kitchen", "waiter"],
      default: "waiter",
    },
  })
);
