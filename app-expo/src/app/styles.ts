import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding-top: 24px;
  background-color: #d73035;
`;

export const Header = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin-top: 60px;
`;

export const Content = styled.View`
  width: 100%;
  margin-top: 96px;
  background-color: #fff;
  padding-horizontal: 24px;
  flex: 1;
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  padding-top: 32px;
  text-align: center;
  margin-bottom: 30px;
  color: #000;
`;

export const ForgotPasswordText = styled.Text`
  font-size: 14px;
  margin-top: 4px;
  color: #6b7280;
`;

export const SignupText = styled.Text`
  font-size: 14px;
  margin-top: 4px;
  color: #6b7280;
  text-align: center;
`;

export const VersionText = styled.Text`
  font-size: 12px;
  margin-top: 208px;
  color: #6b7280;
  width: 100%;
  text-align: center;
`;

export const LinkText = styled.Text`
  font-weight: bold;
  color: #000;
`;

export const Image = styled.Image`
  width: 220px;
  height: 96px;
  border-radius: 8px;
`;
