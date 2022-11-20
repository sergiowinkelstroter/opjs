import { Modal } from "react-native";
import { CheckCircle } from "../Icons/CheckCircle";
import { Text } from "../Text";

import * as C from "./styles";

interface OrderConfirmedModalProps {
  visible: boolean;
  onOk: () => void;
}

export function OrderConfirmedModal({
  visible,
  onOk,
}: OrderConfirmedModalProps) {
  return (
    <Modal visible={visible} animationType="fade">
      <C.Container>
        <CheckCircle />
        <Text
          size={20}
          weight="600"
          color="#FFFFFF"
          style={{ marginTop: 12, marginBottom: 4 }}
        >
          Pedido confirmado
        </Text>
        <Text color="#FFFFFF" opacity={0.9}>
          O pedido já entrou na fila de produção!
        </Text>
        <C.OkButton onPress={onOk}>
          <Text weight="600" color="#D73035">
            OK
          </Text>
        </C.OkButton>
      </C.Container>
    </Modal>
  );
}
