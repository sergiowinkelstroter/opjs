import { Response, Request } from "express";
import { User } from "../../models/Users";
import { AuthenticatedRequest } from "../../middlewares/authenticateToken";
import { Restaurant } from "../../models/Restaurant";

export async function getProfile(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const user = await User.findOne({ _id: req.user.userId }).select(
      "-password"
    );

    const restaurant = await Restaurant.findOne({ _id: user?.restaurantId });

    return res.json({ user, restaurant });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
