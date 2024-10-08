import { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { CartItem } from "../../types/CartItem";
import { Product } from "../../types/Product";
import { api } from "../../utils/api";
import { formatCurrency } from "../../utils/formatCurrency";
import { Button } from "../Button";
import { MinusCircle } from "../Icons/MinusCircle";
import { PlusCircle } from "../Icons/PlusCircle";
import { OrderConfirmedModal } from "../OrderConfirmedModal";
import { Text } from "../Text";

import * as C from "./styles";

interface CartProps {
  cartItems: CartItem[];
  onAdd: (product: Product) => void;
  onDecrement: (product: Product) => void;
  onConfirmOrder: () => void;
  selectedTable: string;
}

export function Cart({
  cartItems,
  onAdd,
  onDecrement,
  onConfirmOrder,
  selectedTable,
}: CartProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const total = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.quantity * cartItem.product.price;
  }, 0);

  async function handleConfirmOrder() {
    setIsLoading(true);
    const payload = {
      table: selectedTable,
      products: cartItems.map((cartItem) => ({
        product: cartItem.product._id,
        quatity: cartItem.quantity,
      })),
    };

    await api.post("/orders", payload);

    setIsLoading(false);
    setIsModalVisible(true);
  }

  function handleOk() {
    onConfirmOrder();
    setIsModalVisible(false);
  }

  return (
    <>
      <OrderConfirmedModal onOk={handleOk} visible={isModalVisible} />
      {cartItems.length > 0 && (
        <FlatList
          data={cartItems}
          keyExtractor={(cartItem) => cartItem.product._id}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20, maxHeight: 150 }}
          renderItem={({ item: cartItem }) => (
            <C.Item>
              <C.ProductContainer>
                <C.Image
                  source={{
                    uri: `${process.env.EXPO_PUBLIC_API_URL}/uploads/${cartItem.product.imagePath}`,
                  }}
                />

                <C.QuantityContainer>
                  <Text size={14} color="#666">
                    {cartItem.quantity}x
                  </Text>
                </C.QuantityContainer>

                <C.ProductDetails>
                  <Text size={14} weight="600">
                    {cartItem.product.name}
                  </Text>
                  <Text size={14} color="#666" style={{ marginTop: 14 }}>
                    {formatCurrency(cartItem.product.price)}
                  </Text>
                </C.ProductDetails>
              </C.ProductContainer>
              <C.Actions>
                <TouchableOpacity onPress={() => onAdd(cartItem.product)}>
                  <PlusCircle />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginLeft: 20 }}
                  onPress={() => onDecrement(cartItem.product)}
                >
                  <MinusCircle />
                </TouchableOpacity>
              </C.Actions>
            </C.Item>
          )}
        />
      )}
      <C.Sumary>
        <C.TotalContainer>
          {cartItems.length > 0 ? (
            <>
              <Text color="#66666">Total</Text>
              <Text size={20} weight="600">
                {formatCurrency(total)}
              </Text>
            </>
          ) : (
            <Text color="#9999">Seu carrinho esta vazio</Text>
          )}
        </C.TotalContainer>

        <Button
          title="Confirmar pedido"
          disabled={cartItems.length === 0}
          onPress={handleConfirmOrder}
          loading={isLoading}
        />
      </C.Sumary>
    </>
  );
}
