import { Response, Request } from "express";
import { Product } from "../../models/Product";

export async function AddIngredients(req: Request, res: Response) {
  try {
    const { productId } = req.params;
    const { ingredient } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.sendStatus(404);
    }
    product.ingredients = ingredient;
    await product.save();
    console.log(product);
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
