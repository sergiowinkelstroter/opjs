import { Response, Request } from "express";

import { Category } from "../../models/Category";

export async function listCategories(req: Request, res: Response) {
  try {
    const { restaurantId } = req.params;
    const categories = await Category.find()
      .where("restaurantId")
      .equals(restaurantId);

    res.json(categories);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
