import { Response, Request } from "express";
import { Order } from "../../models/Order";
import { io } from "../../..";

export async function changeorderStatus(req: Request, res: Response) {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!["WAITING", "IN_PRODUCTION", "DONE", "DELIVERED"].includes(status)) {
      return res.status(400).json({
        error: "Status should be one of these: WAITING, IN_PRODUCTION, DONE",
      });
    }

    await Order.findByIdAndUpdate(orderId, { status });
    const orderDetails = await Order.findById(orderId).populate(
      "products.product"
    );

    io.emit("orders@new", orderDetails);

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
