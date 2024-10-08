import { api } from "./api";

export async function getUserProfile() {
  try {
    const response = await api.get("/profile");
    return response.data.user;
  } catch (error) {
    // console.error("Erro ao buscar perfil do usuário:", error);
    throw error;
  }
}
