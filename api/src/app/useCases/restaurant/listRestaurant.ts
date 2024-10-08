import { Response, Request } from "express";
import { Restaurant } from "../../models/Restaurant";

export async function listRestaurant(req: Request, res: Response) {
  try {
    const { restaurantId } = req.params;
    const restaurant = await Restaurant.find()
      .where("restaurantId")
      .equals(restaurantId);
    res.json(restaurant);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
