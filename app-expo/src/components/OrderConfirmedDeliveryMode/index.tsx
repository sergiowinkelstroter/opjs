import { useState } from "react";
import { Modal, TouchableOpacity, Platform } from "react-native";
import { Button } from "../Button";
import { Close } from "../Icons/Close";
import { Text } from "../Text";

import * as C from "./styles";
import { Order } from "@/src/types/Order";

interface OrderConfimedDeliveryModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (orderId: string) => void;
  Order: Order;
}

export function OrderConfimedDeliveryModal({
  visible,
  onClose,
  onSave,
  Order,
}: OrderConfimedDeliveryModalProps) {
  function handleSave() {
    onSave(Order._id);
    onClose();
  }

  return (
    <Modal transparent visible={visible} animationType="fade">
      <C.Overlay behavior={Platform.OS === "android" ? "height" : "padding"}>
        <C.ModalBody>
          <C.Header>
            <Text weight="600">Confirmar entrega</Text>

            <TouchableOpacity onPress={onClose}>
              <Close color="#666" />
            </TouchableOpacity>
          </C.Header>
          <C.Form>
            <Text color="#666" style={{ marginBottom: 22 }}>
              Deseja confirmar a entrega da mesa {Order.table}?
            </Text>
            <Button onPress={handleSave} title="Confirmar" />
          </C.Form>
        </C.ModalBody>
      </C.Overlay>
    </Modal>
  );
}
