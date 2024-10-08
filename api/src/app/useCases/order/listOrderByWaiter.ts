import { Response, Request } from "express";
import { Order } from "../../models/Order";

export async function listOrdersByWaiter(req: Request, res: Response) {
  try {
    const { waiterId } = req.params;

    const orders = await Order.find()
      .where("waiterId")
      .equals(waiterId)
      .populate("products.product");

    const ordersFiltered = orders.filter((order) => {
      return order.status !== "DELIVERED";
    });

    res.json(ordersFiltered);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
