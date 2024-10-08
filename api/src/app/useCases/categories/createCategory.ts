import { Response, Request } from "express";

import { Category } from "../../models/Category";
import { AuthenticatedRequest } from "../../middlewares/authenticateToken";
import { User } from "../../models/Users";

export async function createCategory(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const userId = req.user.userId;

    const user = await User.findOne({ _id: userId });

    if (user?.role !== "manager") {
      return res.status(401).json({
        error: "Apenas gerentes podem criar categorias",
      });
    }
    const { icon, name } = req.body;

    const category = await Category.create({
      icon,
      name,
      restaurantId: user?.restaurantId,
    });

    res.status(201).json(category);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
