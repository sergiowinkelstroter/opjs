import styled from "styled-components";

// Container principal do header
export const Container = styled.header`
  background: #d73035;
  display: flex;
  justify-content: center;
  height: 198px;
  align-items: center;

  @media (max-width: 1268px) {
    height: 130px;
    padding: 20px;
  }
`;

// Conteúdo do header (detalhes da página, logo, etc.)
export const Content = styled.div`
  width: 100%;
  max-width: 1216px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;

  .page-details {
    h1 {
      font-size: 32px;
      margin-bottom: 6px;
    }

    h2 {
      font-weight: 400;
      font-size: 16px;
      opacity: 0.9;
    }
  }
`;

// Estilo da imagem/logo
export const Image = styled.img`
  @media (max-width: 1268px) {
    display: none;
  }
`;

// Ícone de menu (hamburguer ou X) no mobile
export const MenuIcon = styled.div`
  display: none;
  cursor: pointer;
  color: #fff;

  @media (max-width: 768px) {
    display: block;
  }
`;

// Estilo da lista de navegação
export const List = styled.ul<{ isOpen: boolean }>`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 10px;

  li {
    a {
      color: #fff;
      text-decoration: solid underline transparent;
      text-underline-offset: 4px;
    }

    a:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    /* No mobile, esconde a lista inicialmente */
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    flex-direction: column;
    gap: 16px;
    background-color: #d73035;
    padding: 16px;
    position: absolute;
    top: 80px;
    right: 20px;
    z-index: 999;
    border-radius: 8px;
  }
`;
