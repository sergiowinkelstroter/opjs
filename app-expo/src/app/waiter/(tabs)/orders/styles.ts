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
`;

export const CenteredContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  padding: 24px;
`;

export const OrderCard = styled.View`
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  /* background: #fff; */
  border: 1px solid #e6e6e6;
`;

export const OrderHeader = styled.View`
  flex-direction: row;
  gap: 16px;
  margin-bottom: 10px;
`;

export const OrderTable = styled.View`
  width: 30%;
  height: 60px;
  align-items: center;
  justify-content: center;
  color: #fff;
  border-radius: 10px;
  background-color: #d73035;
`;

export const OrderHeaderDesc = styled.View`
  flex-direction: column;
  gap: 2px;
  align-items: flex-start;
  justify-content: center;
`;

export const OrderTotal = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-top: 10px;
`;
