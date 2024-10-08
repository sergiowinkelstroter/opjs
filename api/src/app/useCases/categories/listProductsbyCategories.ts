import { Response, Request } from "express";
import { Product } from "../../models/Product";
import { AuthenticatedRequest } from "../../middlewares/authenticateToken";

export async function listProductsbyCategories(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    const { categoryId } = req.params;
    const restaurantId = req.user?.restaurantId;
    const products = await Product.find()
      .where("category")
      .equals(categoryId)
      .where("restaurantId")
      .equals(restaurantId);

    res.json(products);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
