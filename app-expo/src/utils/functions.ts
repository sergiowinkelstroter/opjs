// import { format } from "date-fns";
// import { toZonedTime } from "date-fns-tz";
import AsyncStorage from "@react-native-async-storage/async-storage";

// export function formatDate(dateString: string): string {
//   const date = new Date(dateString);
//   const zonedDate = toZonedTime(date, "UTC");
//   return format(zonedDate, "dd/MM/yyyy");
// }

// Função para armazenar o token
export const storeToken = async (token_name: string, token: string) => {
  try {
    await AsyncStorage.setItem(token_name, token);
  } catch (error) {
    console.error("Erro ao salvar o token", error);
  }
};

// Função para recuperar o token
export const getToken = async (token_name: string) => {
  try {
    const token = await AsyncStorage.getItem(token_name);
    return token;
  } catch (error) {
    console.error("Erro ao buscar o token", error);
    return null;
  }
};

export const deleteToken = async (token_name: string) => {
  try {
    AsyncStorage.removeItem(token_name);
  } catch (error) {
    console.error("Erro ao deletar o token", error);
  }
};
