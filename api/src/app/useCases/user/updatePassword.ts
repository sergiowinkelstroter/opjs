import bcrypt from "bcrypt";
import { Response, Request } from "express";
import { User } from "../../models/Users";

export async function UpdatePassword(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const { pastPassword, newPassword } = req.body;

    // Verificação básica dos campos obrigatórios
    if (!pastPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Senha antiga e nova são obrigatórias." });
    }

    const users = await User.find();

    const user = users.find((user) => String(user._id) === userId);

    // Verifica se o usuário existe
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    // Verifica se a senha antiga está correta
    const isPasswordCorrect = await bcrypt.compare(pastPassword, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Senha antiga incorreta." });
    }

    // Atualiza a senha com a nova
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    // Retorna sucesso
    return res.status(200).json({ message: "Senha atualizada com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar senha:", error);
    return res
      .status(500)
      .json({ message: "Erro no servidor. Tente novamente mais tarde." });
  }
}
