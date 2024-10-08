import bcrypt from "bcrypt";
import { Response, Request } from "express";
import { User } from "../../models/Users";
import { AuthenticatedRequest } from "../../middlewares/authenticateToken";

export async function createUsers(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const restaurantId = req.user.restaurantId;

    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(409).json({ error: "Usuário já existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      restaurantId,
    });

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
