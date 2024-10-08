import { Text } from "@/src/components/Text";
import * as C from "./styles";
import { ActivityIndicator, FlatList, View } from "react-native";
import { useEffect, useState } from "react";
import { getUserProfile } from "@/src/utils/getUserProfile";
import { api } from "@/src/utils/api";
import { Product } from "@/src/types/Product";
import { formatCurrency } from "@/src/utils/formatCurrency";
import { Button } from "@/src/components/Button";
import { OrderCancelModal } from "@/src/components/OrderCancelModal";
import { Order } from "@/src/types/Order";
import Toast from "react-native-toast-message";
import { OrderConfimedDeliveryModal } from "@/src/components/OrderConfirmedDeliveryMode";
import { Empty } from "@/src/components/Icons/Empty";

export default function Orders() {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleDelivery, setIsModalVisibleDelivery] = useState(false);

  const fetch = async () => {
    setIsLoading(true);
    const profile = await getUserProfile();
    const response = await api.get(
      `/orders/${profile.restaurantId}/waiter/${profile._id}`
    );
    setOrders(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  async function handleCancelOrder(id: string) {
    try {
      await api.delete(`/orders/${id}`);
      const newOrders = orders.filter((order) => order._id !== id);
      setOrders(newOrders);
      Toast.show({
        text1: "Pedido cancelado com sucesso",
        type: "success",
      });
      fetch();
    } catch (error) {
      Toast.show({
        text1: "Erro ao cancelar pedido",
        type: "error",
      });
    }
  }

  async function handleConfirmDelivery(id: string) {
    try {
      await api.patch(`/orders/${id}`, {
        status: "DELIVERED",
      });
      const newOrders = orders.filter((order) => order._id !== id);
      setOrders(newOrders);
      Toast.show({
        text1: "Entrega confirmada com sucesso",
        type: "success",
      });
      fetch();
    } catch (error) {
      Toast.show({
        text1: "Erro ao confirmar entrega",
        type: "error",
      });
    }
  }

  return (
    <>
      <C.Container>
        <C.ContainerHeader>
          <Text size={24} weight="600">
            Pedidos
          </Text>
        </C.ContainerHeader>
        {isLoading && (
          <C.CenteredContainer>
            <ActivityIndicator color="#D73035" size="large" />
          </C.CenteredContainer>
        )}
        <C.Content>
          {!isLoading && (
            <>
              {orders.length > 0 ? (
                <FlatList
                  data={orders}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => {
                    const total = item.products.reduce((acc, ProductItem) => {
                      // console.log("Product", ProductItem.product);
                      return (
                        acc + ProductItem.quatity * ProductItem.product.price
                      );
                    }, 0);
                    return (
                      <>
                        <C.OrderCard>
                          <C.OrderHeader>
                            <C.OrderTable>
                              <Text
                                style={{ fontWeight: "bold", color: "#fff" }}
                              >
                                {item.table}
                              </Text>
                            </C.OrderTable>
                            <C.OrderHeaderDesc>
                              <Text style={{ fontWeight: "bold" }}>
                                Mesa: {item.table}
                              </Text>
                              <Text
                                style={{
                                  fontWeight: "ultralight",
                                  color: "#666",
                                }}
                              >
                                Status:{" "}
                                {item.status === "WAITING"
                                  ? "Fila de espera"
                                  : item.status === "IN_PRODUCTION"
                                  ? "Em preparação"
                                  : item.status === "DELIVERED"
                                  ? "Entregue"
                                  : "Pronto"}
                              </Text>
                            </C.OrderHeaderDesc>
                          </C.OrderHeader>
                          <Text style={{ fontWeight: "bold" }}>Itens</Text>
                          <FlatList
                            data={item.products}
                            keyExtractor={(item) => item.product._id}
                            renderItem={({ item }) => (
                              <Text>
                                {item.quatity}x - {item.product.name}
                              </Text>
                            )}
                          />

                          <C.OrderTotal>
                            <Text style={{ fontWeight: "bold" }}>Total</Text>
                            <Text
                              style={{
                                marginTop: 8,
                                fontWeight: "bold",
                              }}
                            >
                              {formatCurrency(total)}
                            </Text>
                          </C.OrderTotal>

                          <View
                            style={{
                              marginTop: 16,
                              flexDirection: "column",
                              gap: 8,
                            }}
                          >
                            <Button
                              title="Confirmar entrega"
                              onPress={() => setIsModalVisibleDelivery(true)}
                              disabled={item.status !== "DONE"}
                            />
                            <Button
                              title="Cancelar Pedido"
                              onPress={() => setIsModalVisible(true)}
                            />
                          </View>
                        </C.OrderCard>
                        <OrderConfimedDeliveryModal
                          Order={item}
                          onClose={() => setIsModalVisibleDelivery(false)}
                          visible={isModalVisibleDelivery}
                          onSave={handleConfirmDelivery}
                        />
                        <OrderCancelModal
                          Order={item}
                          onClose={() => setIsModalVisible(false)}
                          visible={isModalVisible}
                          onSave={handleCancelOrder}
                        />
                      </>
                    );
                  }}
                />
              ) : (
                <C.CenteredContainer>
                  <Empty />
                  <Text color="#6666" style={{ marginTop: 24 }}>
                    Nenhum pedido foi encontrado!
                  </Text>
                </C.CenteredContainer>
              )}
            </>
          )}
        </C.Content>
      </C.Container>
    </>
  );
}
