import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1216px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1268px) {
    padding: 20px;
    margin: 20px auto;
  }
`;

export const ContainerHeader = styled.header`
  background: #d73035;
  display: flex;
  justify-content: center;
  height: 198px;
  align-items: center;

  @media (max-width: 1268px) {
    padding: 20px;
  }
`;

export const Image = styled.img`
  @media (max-width: 1268px) {
    display: none;
  }
`;

export const ContentHeader = styled.div`
  width: 100%;
  max-width: 1216px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;

  @media (max-width: 1268px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

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

export const Title = styled.h3`
  font-size: 24px;
  margin-bottom: 32px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 30%;

  @media (max-width: 1268px) {
    width: 50%;
  }

  @media (max-width: 768px) {
    width: 80%;
  }
`;

export const ButtonBack = styled(NavLink)`
  position: absolute;
  left: 0;
  top: 30;
  margin: 24px;
  color: #fff;
  text-decoration: none;
`;
