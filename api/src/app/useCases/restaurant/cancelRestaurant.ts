import { Restaurant } from "./../../models/Restaurant";
import { Response, Request } from "express";

export async function cancelRestaurant(req: Request, res: Response) {
  try {
    const { restaurantId } = req.params;
    await Restaurant.findByIdAndDelete(restaurantId);

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
