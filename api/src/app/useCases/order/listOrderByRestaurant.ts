import { Response, Request } from "express";
import { Order } from "../../models/Order";

export async function listOrdersByRestaurant(req: Request, res: Response) {
  try {
    const { restaurantId } = req.params;
    const orders = await Order.find()
      .where("restaurantId")
      .equals(restaurantId);

    res.json(orders);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
