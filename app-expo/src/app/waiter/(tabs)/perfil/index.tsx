import { Text } from "@/src/components/Text";
import * as C from "./styles";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { getUserProfile } from "@/src/utils/getUserProfile";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Input } from "@/src/components/Input";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Button } from "@/src/components/Button";
import { router } from "expo-router";
import { deleteToken } from "@/src/utils/functions";
import Toast from "react-native-toast-message";
import { api } from "@/src/utils/api";
import { AlterarPasswordModal } from "@/src/components/AlterarPasswordModal";

export default function Perfil() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<any>({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Função para buscar o perfil do usuário
  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const profileData = await getUserProfile();

      // Verifica se os dados foram recebidos corretamente
      if (profileData) {
        setProfile(profileData);
        setName(profileData.name || ""); // Atualiza o estado 'name' com o valor da API
        setEmail(profileData.email || ""); // Atualiza o estado 'email' com o valor da API
      }
    } catch (error) {
      Toast.show({
        text1: "Erro ao buscar o perfil",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Efeito para buscar os dados ao carregar o componente
  useEffect(() => {
    fetchProfile();
  }, []);

  // Função para logout
  async function handleLogout() {
    await deleteToken("token");
    router.push("/");
  }

  // Função para editar o perfil
  async function handleEditProfile() {
    try {
      await api.put(`/users/${profile._id}`, {
        name,
        email,
      });

      Toast.show({
        text1: "Perfil editado com sucesso",
        type: "success",
      });

      fetchProfile(); // Atualiza o perfil após a edição
    } catch (error) {
      Toast.show({
        text1: "Erro ao editar perfil",
        type: "error",
      });
    }
  }

  // Função para alterar a senha
  async function handleEditPassword(pastPassword: string, newPassword: string) {
    try {
      if (!pastPassword || !newPassword) {
        Toast.show({
          text1: "Preencha todos os campos",
          type: "error",
        });
        return;
      }

      await api.put(`/users/update-password/${profile._id}`, {
        pastPassword,
        newPassword,
      });

      Toast.show({
        text1: "Senha alterada com sucesso",
        type: "success",
      });

      setIsModalVisible(false);
    } catch (error) {
      Toast.show({
        text1: "Erro ao editar senha",
        type: "error",
      });

      setIsModalVisible(false);
    }
  }

  return (
    <>
      <C.Container>
        <C.ContainerHeader>
          <Text size={24} weight="600">
            Perfil
          </Text>
          <MaterialIcons
            name="logout"
            size={24}
            color="#D73035"
            onPress={handleLogout}
          />
        </C.ContainerHeader>

        {/* Exibe o loading enquanto os dados estão sendo carregados */}
        {isLoading ? (
          <C.CenteredContainer>
            <ActivityIndicator color="#D73035" size="large" />
          </C.CenteredContainer>
        ) : (
          <C.Content>
            <C.Avatar>
              <AntDesign name="user" size={44} color="#fff" />
            </C.Avatar>
            <C.Form>
              {/* Input para Nome */}
              <Input
                label="Nome"
                value={name} // Sincroniza o estado 'name' com o valor do input
                onChangeText={setName}
                style={{ borderColor: "#e5e7eb", color: "black" }}
              />
              {/* Input para Email */}
              <Input
                label="Email"
                value={email} // Sincroniza o estado 'email' com o valor do input
                onChangeText={setEmail}
                style={{ borderColor: "#e5e7eb", color: "black" }}
              />
              {/* Input de Cargo */}
              <Input
                label="Cargo"
                value={profile?.role === "waiter" ? "Garçom" : ""} // Campo não editável
                editable={false}
                style={{ borderColor: "#e5e7eb", color: "black" }}
              />
              {/* Botões */}
              <View style={{ marginTop: 8 }}>
                <Button title="Atualizar" onPress={handleEditProfile} />
              </View>
              <View>
                <Button
                  title="Alterar Senha"
                  onPress={() => setIsModalVisible(true)}
                />
              </View>
            </C.Form>
          </C.Content>
        )}
      </C.Container>
      <AlterarPasswordModal
        onClose={() => setIsModalVisible(false)}
        onSave={handleEditPassword}
        visible={isModalVisible}
      />
    </>
  );
}
