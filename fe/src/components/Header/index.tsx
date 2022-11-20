import LogoImg from "../../assets/images/logo.svg";

import * as C from "./styles";

export const Header = () => {
  return (
    <C.Container>
      <C.Content>
        <div className="page-details">
          <h1>Pedidos</h1>
          <h2>Acompanhe os pedidos dos clientes</h2>
        </div>
        <img src={LogoImg} alt="WAITERAPP" />
      </C.Content>
    </C.Container>
  );
};
