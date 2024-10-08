import { useState } from "react";
import { Modal, TouchableOpacity, Platform } from "react-native";
import { Button } from "../Button";
import { Close } from "../Icons/Close";
import { Text } from "../Text";

import * as C from "./styles";
import { Order } from "@/src/types/Order";

interface OrderCancelModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (orderId: string) => void;
  Order: Order;
}

export function OrderCancelModal({
  visible,
  onClose,
  onSave,
  Order,
}: OrderCancelModalProps) {
  function handleSave() {
    onSave(Order._id);
    onClose();
  }

  return (
    <Modal transparent visible={visible} animationType="fade">
      <C.Overlay behavior={Platform.OS === "android" ? "height" : "padding"}>
        <C.ModalBody>
          <C.Header>
            <Text weight="600">Cancelar pedido</Text>

            <TouchableOpacity onPress={onClose}>
              <Close color="#666" />
            </TouchableOpacity>
          </C.Header>
          <C.Form>
            <Text color="#666" style={{ marginBottom: 22 }}>
              Deseja realmente cancelar o pedido da mesa {Order.table}?
            </Text>
            <Button onPress={handleSave} title="Cancelar" />
          </C.Form>
        </C.ModalBody>
      </C.Overlay>
    </Modal>
  );
}
