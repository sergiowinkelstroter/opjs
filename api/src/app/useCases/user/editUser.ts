import { Response, Request } from "express";
import { User } from "../../models/Users";

export async function editUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const { name, email } = req.body;

    const user = await User.findByIdAndUpdate(userId, { name, email });

    res.json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
