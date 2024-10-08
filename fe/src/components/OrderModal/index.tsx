import * as C from "./styles";

import closeIcon from "../../assets/images/close-icon.svg";
import { Order } from "../../types/Order";
import { formatCurrency } from "../../utils/formatCurrency";

interface OrderModalProps {
  visible: boolean;
  order: Order | null;
  handleCloseModal: () => void;
  onCancelOrder: () => Promise<void>;
  isLoading: boolean;
  onChangeOrderStatus: () => void;
}

export const OrderModal = ({
  visible,
  order,
  handleCloseModal,
  onCancelOrder,
  isLoading,
  onChangeOrderStatus,
}: OrderModalProps) => {
  if (!visible || !order) {
    return null;
  }

  const total = order.products.reduce((total, { quatity, product }) => {
    return total + product.price * quatity;
  }, 0);

  return (
    <C.Overlay>
      <C.ModalBody>
        <header>
          <strong>Mesa {order.table}</strong>

          <button type="button" onClick={handleCloseModal}>
            <img src={closeIcon} alt="Icone de fechar" />
          </button>
        </header>

        <div className="status-container">
          <small>Status do Pedido</small>
          <div>
            <span>
              {order.status === "WAITING" && "🕑"}
              {order.status === "IN_PRODUCTION" && "👩‍🍳"}
              {order.status === "DONE" && "✅"}
            </span>
            <strong>
              {order.status === "WAITING" && "Fila de espera"}
              {order.status === "IN_PRODUCTION" && "Em produção"}
              {order.status === "DONE" && "Pronto!"}
            </strong>
          </div>
        </div>

        <C.OrderDetails>
          <strong>Itens</strong>
          <div className="order-items">
            {order.products.map(({ _id, quatity, product }) => (
              <div className="item" key={_id}>
                <img
                  src={`${import.meta.env.BACKEND_URL}/uploads/${
                    product.imagePath
                  }`}
                  alt={product.name}
                  width="52"
                  height="28.51"
                />

                <span className="quatity">{quatity}x</span>
                <div className="product-details">
                  <strong>{product.name}</strong>
                  <span>{formatCurrency(product.price)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="total">
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
        </C.OrderDetails>

        <C.Actions>
          {order.status !== "DONE" && (
            <button
              className="primary"
              type="button"
              disabled={isLoading}
              onClick={onChangeOrderStatus}
            >
              <span>
                {order.status === "WAITING" && "👩‍🍳"}
                {order.status === "IN_PRODUCTION" && "✅"}
              </span>
              <strong>
                {order.status === "WAITING" && "Iniciar Produção"}
                {order.status === "IN_PRODUCTION" && "Concluir Pedido"}
              </strong>
            </button>
          )}
          <button
            className="secondary"
            type="button"
            onClick={onCancelOrder}
            disabled={isLoading}
          >
            <strong>
              {order.status === "DONE" ? "Esquecer Pedido" : "Cancelar Pedido"}
            </strong>
          </button>
        </C.Actions>
      </C.ModalBody>
    </C.Overlay>
  );
};
