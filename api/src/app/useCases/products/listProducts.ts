import { Response, Request } from "express";
import { Product } from "../../models/Product";

export async function listProducts(req: Request, res: Response) {
  try {
    const { restaurantId } = req.params;
    const products = await Product.find()
      .where("restaurantId")
      .equals(restaurantId);

    res.json(products);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
