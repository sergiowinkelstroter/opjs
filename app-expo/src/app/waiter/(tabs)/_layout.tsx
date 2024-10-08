import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { Text, View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: "flex",
          paddingBottom: 10,
          paddingTop: 10,
          height: 60,
        },
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#979090",
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders/index"
        options={{
          title: "Pedidos",
          tabBarIcon: ({ color }) => (
            <Entypo name="shopping-cart" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil/index"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
