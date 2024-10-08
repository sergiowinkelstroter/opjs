import React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "../Text";

import * as C from "./styles";

interface HeaderProps {
  selectedTable: string;
  cancelOrder: () => void;
}

export function Header({ selectedTable, cancelOrder }: HeaderProps) {
  return (
    <C.Container>
      {!selectedTable && (
        <>
          <Text size={14} opacity={0.9}>
            Bem vindo(a) ao
          </Text>
          <Text weight="700" size={24}>
            WAITER
            <Text size={24}>APP</Text>
          </Text>
        </>
      )}

      {selectedTable && (
        <C.Content>
          <C.OrderHeader>
            <Text size={24} weight="600">
              Pedidos
            </Text>
            <TouchableOpacity onPress={cancelOrder}>
              <Text color="#D73035" weight="600" size={14}>
                cancelar pedido
              </Text>
            </TouchableOpacity>
          </C.OrderHeader>
          <C.Table>
            <Text color="#666">Mesa {selectedTable}</Text>
          </C.Table>
        </C.Content>
      )}
    </C.Container>
  );
}
