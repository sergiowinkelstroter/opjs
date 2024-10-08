import bcrypt from "bcrypt";
import { Response, Request } from "express";
import { Restaurant } from "../../models/Restaurant";
import { User } from "../../models/Users";

export async function createRestaurant(req: Request, res: Response) {
  try {
    const { name_restaurant, address, phone, name, email, password } = req.body;

    const restaurant = await Restaurant.create({
      name: name_restaurant,
      address,
      phone,
    });

    const user = await User.findOne({ email });

    if (user) {
      return res.status(401).json({ error: "E-mail ja cadastrado" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: passwordHash,
      role: "manager",
      restaurantId: restaurant._id,
    });

    res.json(restaurant);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
