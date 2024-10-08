import { Response, Request } from "express";
import { User } from "../../models/Users";

export async function listUsersbyRestaurant(req: Request, res: Response) {
  try {
    const { restaurantId } = req.params;
    const Users = await User.find().where("restaurantId").equals(restaurantId);

    res.json(Users);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
