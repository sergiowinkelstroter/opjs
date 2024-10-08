export interface Order {
  _id: string;
  table: string;
  status: "WAITING" | "IN_PRODUCTION" | "DONE" | "DELIVERED";
  products: {
    _id: string;
    quatity: number;
    product: {
      name: string;
      imagePath: string;
      price: number;
    };
  }[];
}
