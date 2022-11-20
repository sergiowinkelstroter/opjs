import { useState } from "react";
import { Modal, TouchableOpacity, Platform } from "react-native";
import { Button } from "../Button";
import { Close } from "../Icons/Close";
import { Text } from "../Text";

import * as C from "./styles";

interface TableModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (table: string) => void;
}

export function TableModal({ visible, onClose, onSave }: TableModalProps) {
  const [table, setTable] = useState("");

  function handleSave() {
    setTable("");
    onSave(table);
    onClose();
  }

  return (
    <Modal transparent visible={visible} animationType="fade">
      <C.Overlay behavior={Platform.OS === "android" ? "height" : "padding"}>
        <C.ModalBody>
          <C.Header>
            <Text weight="600">Informe a mesa</Text>

            <TouchableOpacity onPress={onClose}>
              <Close color="#666" />
            </TouchableOpacity>
          </C.Header>
          <C.Form>
            <C.Input
              placeholder="Número da mesa"
              placeholderTextColor="#666"
              keyboardType="number-pad"
              onChangeText={setTable}
            />

            <Button
              onPress={handleSave}
              title="Salvar"
              disabled={table.length === 0}
            />
          </C.Form>
        </C.ModalBody>
      </C.Overlay>
    </Modal>
  );
}
