import { useState } from "react";
import { toast } from "react-toastify";
import { Order } from "../../types/Order";
import { api } from "../../utils/api";
import { OrderModal } from "../OrderModal";
import * as C from "./styles";

interface OrdersBoardProps {
  icon: string;
  title: string;
  orders: Order[];
  onCancelOrder: (orderid: string) => void;
  onChangeOrderStatus: (orderId: string, status: Order["status"]) => void;
}

export const OrdersBoardDelivered = ({
  icon,
  title,
  orders,
  onCancelOrder,
  onChangeOrderStatus,
}: OrdersBoardProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleOpenOrder(order: Order) {
    setIsModalVisible(true);
    setSelectedOrder(order);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
    setSelectedOrder(null);
  }

  async function handleChangeOrderStatus() {
    setIsLoading(true);

    const status =
      selectedOrder?.status === "WAITING" ? "IN_PRODUCTION" : "DONE";

    await api.patch(`/orders/${selectedOrder?._id}`, { status });

    toast.success(
      `O pedido da mesa ${selectedOrder?.table} teve o status alterado!`
    );

    onChangeOrderStatus(selectedOrder!._id, status);
    setIsLoading(false);
    setIsModalVisible(false);
  }

  async function handleCancelOrder() {
    setIsLoading(true);
    await api.delete(`/orders/${selectedOrder?._id}`);

    toast.success(
      `O pedido da mesa ${selectedOrder?.table} foi cancelado com sucesso!`
    );

    onCancelOrder(selectedOrder!._id);
    setIsLoading(false);
    setIsModalVisible(false);
  }

  return (
    <C.Board>
      <OrderModal
        visible={isModalVisible}
        order={selectedOrder}
        handleCloseModal={handleCloseModal}
        onCancelOrder={handleCancelOrder}
        isLoading={isLoading}
        onChangeOrderStatus={handleChangeOrderStatus}
      />

      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      {orders.length > 0 && (
        <C.OrdersContainer>
          {orders.map((order) => (
            <button
              type="button"
              key={order._id}
              onClick={() => handleOpenOrder(order)}
            >
              <strong>Mesa {order.table}</strong>
              <span>
                {order.products.length}{" "}
                {order.products.length > 1 ? "itens" : "item"}
              </span>
            </button>
          ))}
        </C.OrdersContainer>
      )}
    </C.Board>
  );
};
