import { useState } from "react";
import { FlatList } from "react-native";

import { Category } from "../../types/Category";
import { Text } from "../Text";

import * as C from "./styles";

interface CategoriesProps {
  categories: Category[];
  onProductByCategory: (categoryId: string) => Promise<void>;
}

export function Categories({
  categories,
  onProductByCategory,
}: CategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState("");

  function handleSelectCategory(categoryId: string) {
    const category = selectedCategory === categoryId ? "" : categoryId;
    onProductByCategory(category);
    setSelectedCategory(category);
  }

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      contentContainerStyle={{ paddingLeft: 24 }}
      keyExtractor={(category) => category._id}
      renderItem={({ item: category }) => {
        const isSeleted = selectedCategory === category._id;
        return (
          <C.Category onPress={() => handleSelectCategory(category._id)}>
            <C.Icon>
              <Text opacity={isSeleted ? 1 : 0.5}>{category.icon}</Text>
            </C.Icon>
            <Text size={14} weight="600" opacity={isSeleted ? 1 : 0.5}>
              {category.name}
            </Text>
          </C.Category>
        );
      }}
    />
  );
}
