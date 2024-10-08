import { Response, Request } from "express";
import { io } from "../../..";

import { Order } from "../../models/Order";
import { AuthenticatedRequest } from "../../middlewares/authenticateToken";

export async function createOrder(req: AuthenticatedRequest, res: Response) {
  try {
    const { table, products } = req.body;

    if (!req.user?.userId) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const userId = req.user.userId;

    const restaurantId = req.user?.restaurantId;

    const order = await Order.create({
      table,
      products,
      restaurantId,
      waiterId: userId,
    });

    const orderDetails = await order.populate("products.product");

    io.emit("orders@new", orderDetails);

    res.status(201).json(order);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
