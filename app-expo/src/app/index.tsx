import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { View, Text, Image } from "react-native";
import { Button } from "../components/Button";
import { useEffect, useState } from "react";
import * as C from "./styles";
import { Input } from "../components/TableModal/styles";
import { router } from "expo-router";
import { api } from "../utils/api";
import { getToken, storeToken } from "../utils/functions";
import Toast from "react-native-toast-message";
import { getUserProfile } from "../utils/getUserProfile";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken("token");
      if (!token) {
        return;
      }
      const profile = await getUserProfile();

      if (profile.role === "waiter") {
        router.push("/waiter");
      }
    };
    fetchToken();
  }, []);

  async function handleLogin() {
    try {
      console.log(email, password);
      const response = await api.post("/login", {
        email,
        password,
      });
      console.log(response.data);
      const { token, role } = response.data;
      if (role !== "waiter") {
        Toast.show({
          text1: "Apenas garçons tem permissão para acessar",
          type: "error",
        });
        return;
      }
      if (token) {
        storeToken("token", token);
      }
      router.push("/waiter");
    } catch (error) {
      Toast.show({
        text1: "Erro ao fazer login",
        type: "error",
      });
    }
  }

  return (
    <C.Container>
      <C.Header>
        <C.Image source={require("../../assets/images/logo.png")} />
      </C.Header>
      <C.Content>
        <C.Title>Autenticação</C.Title>
        <Input
          placeholder="E-mail"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Senha"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        {/* <ForgotPasswordText>Esqueceu sua senha?</ForgotPasswordText> */}
        <Button title="Entrar" onPress={handleLogin} />

        <C.VersionText>Versão 0.0.1</C.VersionText>
      </C.Content>
    </C.Container>
  );
}
