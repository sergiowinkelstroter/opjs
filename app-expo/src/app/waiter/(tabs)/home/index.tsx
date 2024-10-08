import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { Button } from "../../../../components/Button";
import { Cart } from "../../../../components/Cart";
import { Categories } from "../../../../components/Categories";
import { Header } from "../../../../components/Header";
import { Menu } from "../../../../components/Menu";
import { TableModal } from "../../../../components/TableModal";
import { CartItem } from "../../../../types/CartItem";
import { Product } from "../../../../types/Product";
import { Empty } from "../../../../components/Icons/Empty";
import { Text } from "../../../../components/Text";
import { Category } from "../../../../types/Category";

import * as C from "./styles";
import { api } from "../../../../utils/api";
import { getUserProfile } from "@/src/utils/getUserProfile";

export default function Main() {
  const [isLoading, setIsLoading] = useState(true);
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingProducts, setisLoadingProducts] = useState(false);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const fetch = async () => {
      const profile = await getUserProfile();
      setUser(profile);
      Promise.all([
        api.get(`/categories/${profile.restaurantId}`),
        api.get(`/products/${profile.restaurantId}`),
      ]).then(([categoriesResponse, productsResponse]) => {
        setCategories(categoriesResponse.data);
        setProducts(productsResponse.data);
        setIsLoading(false);
      });
    };

    fetch();
  }, []);

  async function handleSelectCategory(categoryId: string) {
    const route = !categoryId
      ? `/products/${user.restaurantId}`
      : `/categories/${categoryId}/products`;

    setisLoadingProducts(true);

    const { data } = await api.get(route);
    setProducts(data);

    setisLoadingProducts(false);
  }

  function handleSaveTable(table: string) {
    setSelectedTable(table);
    setIsTableModalVisible(false);
  }

  function handleResetOrder() {
    setSelectedTable("");
    setCartItems([]);
  }

  function handleAddCart(product: Product) {
    if (!selectedTable) {
      setIsTableModalVisible(true);
    }

    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(
        (cartItems) => cartItems.product._id === product._id
      );

      if (itemIndex < 0) {
        return prevState.concat({
          quantity: 1,
          product,
        });
      }

      const newCartItems = [...prevState];
      const item = newCartItems[itemIndex];

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity + 1,
      };

      return newCartItems;
    });
  }

  function handleDecrementCartItem(product: Product) {
    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(
        (cartItems) => cartItems.product._id === product._id
      );

      const item = prevState[itemIndex];
      const newCartItems = [...prevState];

      if (item.quantity === 1) {
        newCartItems.splice(itemIndex, 1);
        return newCartItems;
      }

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity - 1,
      };

      return newCartItems;
    });
  }

  return (
    <>
      <C.Container>
        <Header selectedTable={selectedTable} cancelOrder={handleResetOrder} />
        {isLoading && (
          <C.CenteredContainer>
            <ActivityIndicator color="#D73035" size="large" />
          </C.CenteredContainer>
        )}
        {!isLoading && (
          <>
            <C.CategoriesContainer>
              <Categories
                categories={categories}
                onProductByCategory={handleSelectCategory}
              />
            </C.CategoriesContainer>

            {isLoadingProducts ? (
              <C.CenteredContainer>
                <ActivityIndicator color="#D73035" size="large" />
              </C.CenteredContainer>
            ) : (
              <>
                {products.length > 0 ? (
                  <C.MenuContainer>
                    <Menu products={products} onAddToCart={handleAddCart} />
                  </C.MenuContainer>
                ) : (
                  <C.CenteredContainer>
                    <Empty />
                    <Text color="#6666" style={{ marginTop: 24 }}>
                      Nenhum produto foi encontrado!
                    </Text>
                  </C.CenteredContainer>
                )}
              </>
            )}
          </>
        )}
      </C.Container>
      <C.Footer>
        <C.FooterContainer>
          {!selectedTable && (
            <Button
              title="Novo Pedido"
              onPress={() => setIsTableModalVisible(true)}
              disabled={isLoading}
            />
          )}

          {selectedTable && (
            <Cart
              cartItems={cartItems}
              onAdd={handleAddCart}
              onDecrement={handleDecrementCartItem}
              onConfirmOrder={handleResetOrder}
              selectedTable={selectedTable}
            />
          )}
        </C.FooterContainer>
      </C.Footer>

      <TableModal
        visible={isTableModalVisible}
        onClose={() => setIsTableModalVisible(false)}
        onSave={handleSaveTable}
      />
    </>
  );
}
