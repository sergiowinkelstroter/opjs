import { useState } from "react";
import { Modal, TouchableOpacity, Platform } from "react-native";
import { Button } from "../Button";
import { Close } from "../Icons/Close";
import { Text } from "../Text";

import * as C from "./styles";

interface AlterarPasswordModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (pastPassword: string, newPassword: string) => void;
}

export function AlterarPasswordModal({
  visible,
  onClose,
  onSave,
}: AlterarPasswordModalProps) {
  const [pastPassword, setPastPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  function handleSave() {
    setPastPassword("");
    setNewPassword("");
    onSave(pastPassword, newPassword);
    onClose();
  }

  return (
    <Modal transparent visible={visible} animationType="fade">
      <C.Overlay behavior={Platform.OS === "android" ? "height" : "padding"}>
        <C.ModalBody>
          <C.Header>
            <Text weight="600">Alterar senha</Text>

            <TouchableOpacity onPress={onClose}>
              <Close color="#666" />
            </TouchableOpacity>
          </C.Header>
          <C.Form>
            <C.Input
              placeholder="Senha atual"
              placeholderTextColor="#666"
              onChangeText={setPastPassword}
            />
            <C.Input
              placeholder="Nova senha"
              placeholderTextColor="#666"
              onChangeText={setNewPassword}
            />
            <Button
              onPress={handleSave}
              title="Salvar"
              disabled={pastPassword.length === 0 || newPassword.length === 0}
            />
          </C.Form>
        </C.ModalBody>
      </C.Overlay>
    </Modal>
  );
}
