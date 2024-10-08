import { useEffect, useState } from "react";
import { Order } from "../../types/Order";
import { api } from "../../utils/api";
import { OrdersBoard } from "../../components/OrdersBoard";
import socketIo from "socket.io-client";
import * as C from "./styles";
import { Header } from "@/components/Header";
import { getUserProfile } from "@/utils/getUserProfile";
import { OrdersBoardDelivered } from "@/components/OrdersBoardDelivered";

export const Oders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const socket = socketIo("http://localhost:3001", {
      transports: ["websocket"],
    });
    socket.on("orders@new", (order) => {
      setOrders((prevState) => prevState.concat(order));
    });
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const profile = await getUserProfile();

      api
        .get(`/orders/${profile.restaurant._id}`)
        .then(({ data }) => setOrders(data));
    };

    fetchUser();
  }, []);

  const waiting = orders.filter((order) => order.status === "WAITING");
  const inProduction = orders.filter(
    (order) => order.status === "IN_PRODUCTION"
  );
  const done = orders.filter((order) => order.status === "DONE");
  const delivered = orders.filter((order) => order.status === "DELIVERED");

  function handleCancelOrder(orderId: string) {
    setOrders((prevState) =>
      prevState.filter((order) => order._id !== orderId)
    );
  }

  function handleOrderStatusChange(orderId: string, status: Order["status"]) {
    setOrders((prevState) =>
      prevState.map((order) =>
        order._id === orderId ? { ...order, status } : order
      )
    );
  }

  return (
    <>
      <Header title="Pedidos" description="Acompanhe os pedidos dos clientes" />
      <C.Container>
        <OrdersBoard
          icon="🕑"
          title="Fila de espera"
          orders={waiting}
          onCancelOrder={handleCancelOrder}
          onChangeOrderStatus={handleOrderStatusChange}
        />

        <OrdersBoard
          icon="👩‍🍳"
          title="Em produção"
          orders={inProduction}
          onCancelOrder={handleCancelOrder}
          onChangeOrderStatus={handleOrderStatusChange}
        />

        <OrdersBoard
          icon="✅"
          title="Pronto!"
          orders={done}
          onCancelOrder={handleCancelOrder}
          onChangeOrderStatus={handleOrderStatusChange}
        />
      </C.Container>
      <OrdersBoardDelivered
        icon="🛵"
        title="Entregue!"
        orders={delivered}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
    </>
  );
};
