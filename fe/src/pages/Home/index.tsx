import { Button, Input } from "@/components/ModalCategoryRegister/styles";
import LogoImg from "../../assets/images/logo.svg";
import * as C from "./styles";
import { useNavigation } from "react-router-dom";

export function Home() {
  const {} = useNavigation();
  return (
    <>
      <C.ContainerHeader>
        <C.ContentHeader>
          <div className="page-details">
            <h1>Waiter App</h1>
            <h2>Conheça nosso serviço</h2>
          </div>
          <C.Button to={"/login"}>Entrar</C.Button>
          {/* <Button>Entrar</Button> */}
          {/* <img src={LogoImg} alt="WAITERAPP" /> */}
        </C.ContentHeader>
      </C.ContainerHeader>

      <C.Container>
        <C.Title>Conhecendo o Waiter App</C.Title>
        <C.ContentDesc>
          <C.ContentDescLinha>
            <C.ImageDesc src={LogoImg} alt="WAITERAPP" />
            <C.TextDesc>
              Nosso sistema é projetado para facilitar a interação entre a
              equipe de garçons e a cozinha. Com ele, os garçons podem registrar
              e gerenciar pedidos diretamente de seus dispositivos, e a cozinha
              recebe as solicitações em tempo real, otimizando o fluxo de
              trabalho e reduzindo erros. Esse sistema melhora a comunicação
              entre as equipes, garantindo que os pedidos sejam atendidos de
              maneira rápida e organizada.
            </C.TextDesc>
          </C.ContentDescLinha>
          <C.ContainerButtonDesc>
            <C.ButtonDesc to="/register-restaurant">
              Cadastre seu restaurante
            </C.ButtonDesc>
          </C.ContainerButtonDesc>
        </C.ContentDesc>
      </C.Container>
    </>
  );
}
