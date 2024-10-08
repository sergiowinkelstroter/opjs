import { Response, Request } from "express";
import { User } from "../../models/Users";

export async function deleteUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    console.log(userId);
    await User.findByIdAndDelete(userId);
    const users = await User.find();
    console.log(users);
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
