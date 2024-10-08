import { Slot } from "expo-router";
import { StatusBar } from "react-native";
import Toast from "react-native-toast-message";

export default function HomeLayout() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={"#000"} />
      <Slot />
      <Toast />
    </>
  );
}
