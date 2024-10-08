import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
  max-width: 1216px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;

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
    height: 150px;
    padding: 20px;
  }
`;

export const ContentHeader = styled.div`
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

      @media (max-width: 768px) {
        font-size: 24px;
      }
    }

    h2 {
      font-weight: 400;
      font-size: 16px;
      opacity: 0.9;

      @media (max-width: 768px) {
        font-size: 14px;
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Title = styled.h3`
  font-size: 24px;
  margin-bottom: 22px;

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 16px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 30%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ContentDesc = styled.div`
  width: 100%;
  background-color: #d73035;
  padding: 26px;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.25);
  border-radius: 8px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const ContentDescLinha = styled.div`
  display: flex;
  align-items: center;
  gap: 82px;
  margin-bottom: 8px;

  @media (max-width: 1200px) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const TextDesc = styled.p`
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const ImageDesc = styled.img`
  width: 524px;
  height: 224px;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

export const ContainerButtonDesc = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ButtonDesc = styled(NavLink)`
  width: 350px;
  height: 40px;
  background-color: #fff;
  border: 1px solid #d73035;
  border-radius: 8px;
  color: #d73035;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  margin-top: 10px;

  &:hover {
    opacity: 90%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Button = styled(NavLink)`
  width: 150px;
  height: 40px;
  background-color: #fff;
  border: 1px solid #d73035;
  border-radius: 8px;
  color: #d73035;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  margin-top: 10px;

  &:hover {
    opacity: 90%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
