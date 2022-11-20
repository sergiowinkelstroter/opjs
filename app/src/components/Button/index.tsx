import { ActivityIndicator } from "react-native";
import { Text } from "../Text";
import * as C from "./styles";

interface ButtonProps {
  title: string;
  disabled?: boolean;
  onPress: () => void;
  loading?: boolean;
}

export const Button = ({ title, disabled, onPress, loading }: ButtonProps) => {
  return (
    <C.Container disabled={disabled || loading} onPress={onPress}>
      {!loading && (
        <Text weight="600" color="#fff">
          {title}
        </Text>
      )}

      {loading && <ActivityIndicator color="#fff" />}
    </C.Container>
  );
};
