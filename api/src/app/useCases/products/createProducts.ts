import { Response, Request } from "express";
import { Product } from "../../models/Product";
import { AuthenticatedRequest } from "../../middlewares/authenticateToken";
import { User } from "../../models/Users";

export async function createProduct(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const userId = req.user.userId;
    const restaurantId = req.user.restaurantId;
    const user = await User.findOne({ _id: userId });

    if (user?.role !== "manager") {
      return res.status(401).json({
        error: "Apenas gerentes podem criar produtos",
      });
    }

    const imagePath = req.file?.filename;
    const { name, description, price, category, ingredients } = req.body;

    const product = await Product.create({
      name,
      description,
      imagePath,
      price: Number(price),
      category,
      restaurantId,
      ingredients: ingredients ? JSON.parse(ingredients) : [],
    });

    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
