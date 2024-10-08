import styled from "styled-components/native";
import { Platform, StatusBar } from "react-native";

const isAndroid = Platform.OS === "android";

export const Container = styled.SafeAreaView`
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : 0};
  flex: 1;
  background: #fafafa;
`;

export const ContainerHeader = styled.View`
  margin: 24px 24px 0;
  flex-direction: row;
  justify-content: space-between;
`;

export const CenteredContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  padding: 24px;
  /* justify-content: center; */
  align-items: center;
`;

export const Avatar = styled.View`
  align-items: center;
  justify-content: center;

  width: 120px;
  height: 120px;

  border-radius: 60px;
  background: #ed7b7b;
`;

export const Form = styled.View`
  width: 90%;

  margin-top: 14px;
  gap: 12px;
  flex-direction: column;
`;
