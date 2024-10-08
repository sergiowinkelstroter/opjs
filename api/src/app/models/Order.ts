import { model, Schema } from "mongoose";

export const Order = model(
  "Order",
  new Schema({
    table: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["WAITING", "IN_PRODUCTION", "DONE", "DELIVERED"],
      default: "WAITING",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    restaurantId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Restaurant",
    },
    waiterId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    products: {
      required: true,
      type: [
        {
          product: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Product",
          },
          quatity: {
            type: Number,
            default: 1,
          },
        },
      ],
    },
  })
);
