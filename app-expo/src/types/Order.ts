import { Product } from "./Product";

interface OrderProduct {
  product: Product;
  quatity: number;
}

export interface Order {
  _id: string;
  table: string;
  status: "WAITING" | "IN_PRODUCTION" | "DONE" | "DELIVERED";
  createdAt: Date;
  restaurantId: string;
  waiterId: string;
  products: OrderProduct[];
}
