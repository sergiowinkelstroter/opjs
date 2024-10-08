import { FlatList, Modal } from "react-native";
import { Product } from "../../types/Product";
import { formatCurrency } from "../../utils/formatCurrency";
import { Button } from "../Button";
import { Close } from "../Icons/Close";
import { Text } from "../Text";

import * as C from "./styles";

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  product: null | Product;
  onAddToCart: (product: Product) => void;
}

export function ProductModal({
  visible,
  onClose,
  product,
  onAddToCart,
}: ProductModalProps) {
  if (!product) {
    return null;
  }

  function handleAddToCart(product: Product) {
    onAddToCart(product);
    onClose();
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <C.Image
        source={{
          uri: `${process.env.EXPO_PUBLIC_API_URL}/uploads/${product.imagePath}`,
        }}
      >
        <C.CloseButton onPress={onClose}>
          <Close />
        </C.CloseButton>
      </C.Image>

      <C.ModalBody>
        <C.Header>
          <Text size={24} weight="600">
            {product.name}
          </Text>
          <Text color="#666" style={{ marginTop: 8 }}>
            {product.description}
          </Text>
        </C.Header>

        {product.ingredients.length > 0 && (
          <C.IngredientsContainer>
            <Text weight="600" color="#666">
              Ingredientes
            </Text>
            <FlatList
              data={product.ingredients}
              keyExtractor={(ingredients) => ingredients._id}
              showsVerticalScrollIndicator={false}
              style={{ marginTop: 16 }}
              renderItem={({ item: ingredient }) => (
                <C.Ingredient>
                  <Text>{ingredient.icon}</Text>
                  <Text size={14} color="#666" style={{ marginLeft: 20 }}>
                    {ingredient.name}
                  </Text>
                </C.Ingredient>
              )}
            />
          </C.IngredientsContainer>
        )}
      </C.ModalBody>

      <C.Footer>
        <C.FooterContainer>
          <C.PriceContainer>
            <Text color="#666">Preço</Text>
            <Text size={20} weight="600">
              {formatCurrency(product.price)}
            </Text>
          </C.PriceContainer>
          <Button
            title="Adicionar ao pedido"
            onPress={() => handleAddToCart(product)}
          />
        </C.FooterContainer>
      </C.Footer>
    </Modal>
  );
}
