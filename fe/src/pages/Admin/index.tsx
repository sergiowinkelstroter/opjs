import * as C from "./styles";
import * as M from "../../components/ModalCategoryRegister/styles";
import { ModalCategoryRegister } from "@/components/ModalCategoryRegister";
import { ModalProductRegister } from "@/components/ModalProductRegister";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@/types/Category";
import { Product } from "@/types/Product";
import { Header } from "@/components/Header";
import { ModalWaitersRegister } from "@/components/ModalWaitersRegister";
import { getUserProfile } from "@/utils/getUserProfile";
import { useNavigate } from "react-router-dom";
import { ModalAddIngredients } from "@/components/ModalAddIngredients";
import { PlusCircle, Trash2 } from "lucide-react";
import { ModalDeleteCategory } from "@/components/ModalDeleteCategory";
import { ModalDeleteProduct } from "@/components/ModalDeleteProduct";
import { ModalDeleteWaiter } from "@/components/ModalDeleteWaiter";

export const Admin = () => {
  const [open, setOpen] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [openAddIngredients, setOpenAddIngredients] = useState(false);
  const [openEmployees, setOpenEmployees] = useState(false);
  const [openDeleteCategory, setOpenDeleteCategory] = useState(false);
  const [openDeleteProduct, setOpenDeleteProduct] = useState(false);
  const [openDeleteEmployee, setOpenDeleteEmployee] = useState(false);
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  // Função para abrir o modal com o produto selecionado
  const handleOpenAddIngredients = (product: Product) => {
    setSelectedProduct(product); // Define o produto selecionado
    setOpenAddIngredients(true); // Abre o modal
  };

  // Função para abrir o modal com a categoria selecionada
  const handleOpenDeleteCategory = (category: Category) => {
    setSelectedCategory(category); // Define a categoria selecionada
    setOpenDeleteCategory(true); // Abre o modal
  };

  // Função para abrir o modal com o funcionário selecionado
  const handleOpenDeleteEmployee = (employee: any) => {
    setSelectedEmployee(employee); // Define o funcionário selecionado
    setOpenDeleteEmployee(true); // Abre o modal
  };

  // Função para abrir o modal com o produto selecionado
  const handleOpenDeleteProduct = (product: Product) => {
    setSelectedProduct(product); // Define o produto selecionado
    setOpenDeleteProduct(true); // Abre o modal
  };

  useEffect(() => {
    async function fetch() {
      try {
        const profile = await getUserProfile();
        setUser(profile.user);
        if (profile.user.role !== "manager") {
          navigate("/orders");
        }
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    }

    fetch();
  }, []);

  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await api.get(`/users/${user.restaurantId}`);
      return response.data;
    },
    enabled: !!user?.restaurantId,
  });

  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await api.get(`/categories/${user.restaurantId}`);
      return response.data;
    },
    enabled: !!user?.restaurantId,
  });

  const { data: products, isLoading: isLoadingProducts } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await api.get(`/products/${user.restaurantId}`);
      return response.data;
    },
    enabled: !!user?.restaurantId,
  });

  if (
    isLoading ||
    isLoadingProducts ||
    !categories ||
    !products ||
    !users ||
    isLoadingUsers
  ) {
    return (
      <C.Container>
        <h1>Carregando...</h1>
      </C.Container>
    );
  }

  return (
    <>
      <Header title="Administração" description="Painel de administração" />

      <C.Container>
        <C.Tabs defaultValue="employees">
          <C.HeaderTable>
            <h1>Cadastros</h1>
            <C.TabsList>
              <C.TabsTrigger value="employees">Funcionários</C.TabsTrigger>
              <C.TabsTrigger value="categories">Categorias</C.TabsTrigger>
              <C.TabsTrigger value="products">Produtos</C.TabsTrigger>
            </C.TabsList>
          </C.HeaderTable>
          <C.TabsContent value="employees">
            <C.HeaderTable>
              <C.HeaderTableTitle>Funcionários</C.HeaderTableTitle>
              <M.Dialog open={openEmployees} onOpenChange={setOpenEmployees}>
                <M.DialogTrigger>
                  <M.Button>Cadastrar</M.Button>
                </M.DialogTrigger>
                <ModalWaitersRegister setOpen={setOpenEmployees} />
              </M.Dialog>
            </C.HeaderTable>
            <C.Table>
              <C.TableCaption>Funcionários</C.TableCaption>
              <C.TableHeader>
                <C.TableRow>
                  <C.TableHead>#</C.TableHead>
                  <C.TableHead>Nome</C.TableHead>
                  <C.TableHead>E-mail</C.TableHead>
                  <C.TableHead>Cargo</C.TableHead>
                  <C.TableHead>Ações</C.TableHead>
                </C.TableRow>
              </C.TableHeader>
              <C.TableBody>
                {users.map((user: any) => (
                  <C.TableRow key={user._id}>
                    <C.TableCell>{user._id}</C.TableCell>
                    <C.TableCell>{user.name}</C.TableCell>
                    <C.TableCell>{user.email}</C.TableCell>
                    <C.TableCell>
                      {user.role === "manager"
                        ? "Gerente"
                        : user.role === "waiter"
                        ? "Garçom"
                        : "Cozinha"}
                    </C.TableCell>
                    <C.TableCell>
                      <M.Dialog
                        open={openDeleteEmployee}
                        onOpenChange={setOpenDeleteEmployee}
                      >
                        <M.DialogTrigger
                          style={{
                            backgroundColor: "transparent",
                          }}
                          onClick={() => handleOpenDeleteEmployee(user)}
                        >
                          <Trash2 />
                        </M.DialogTrigger>
                        {selectedEmployee && (
                          <ModalDeleteWaiter
                            setOpen={setOpenDeleteEmployee}
                            data={selectedEmployee}
                          />
                        )}
                      </M.Dialog>
                    </C.TableCell>
                  </C.TableRow>
                ))}
              </C.TableBody>
              <C.TableFooter>
                <C.TableRow>
                  <C.TableCell colSpan={3}>
                    Total: {users.length} funcionário
                    {users.length > 1 ? "s" : ""}
                  </C.TableCell>
                </C.TableRow>
              </C.TableFooter>
            </C.Table>
          </C.TabsContent>
          <C.TabsContent value="categories">
            <C.HeaderTable>
              <C.HeaderTableTitle>Categorias</C.HeaderTableTitle>
              <M.Dialog open={open} onOpenChange={setOpen}>
                <M.DialogTrigger>
                  <M.Button>Cadastrar</M.Button>
                </M.DialogTrigger>
                <ModalCategoryRegister setOpen={setOpen} />
              </M.Dialog>
            </C.HeaderTable>
            <C.Table>
              <C.TableCaption>Categorias</C.TableCaption>
              <C.TableHeader>
                <C.TableRow>
                  <C.TableHead>#</C.TableHead>
                  <C.TableHead>Nome</C.TableHead>
                  <C.TableHead>Icon</C.TableHead>
                  <C.TableHead>Ações</C.TableHead>
                </C.TableRow>
              </C.TableHeader>
              <C.TableBody>
                {categories.map((category) => (
                  <M.Dialog
                    key={category._id}
                    open={openDeleteCategory}
                    onOpenChange={setOpenDeleteCategory}
                  >
                    <C.TableRow key={category._id}>
                      <C.TableCell>{category._id}</C.TableCell>
                      <C.TableCell>{category.name}</C.TableCell>
                      <C.TableCell>{category.icon}</C.TableCell>
                      <C.TableCell>
                        <M.DialogTrigger
                          style={{ backgroundColor: "transparent" }}
                          onClick={() => handleOpenDeleteCategory(category)}
                        >
                          <Trash2 />
                        </M.DialogTrigger>
                      </C.TableCell>
                    </C.TableRow>
                    {selectedCategory && (
                      <ModalDeleteCategory
                        setOpen={setOpenDeleteCategory}
                        data={selectedCategory}
                      />
                    )}
                  </M.Dialog>
                ))}
              </C.TableBody>
              <C.TableFooter>
                <C.TableRow>
                  <C.TableCell colSpan={3}>
                    Total: {categories.length} categoria
                    {categories.length > 1 && "s"}
                  </C.TableCell>
                </C.TableRow>
              </C.TableFooter>
            </C.Table>
          </C.TabsContent>
          <C.TabsContent value="products">
            <C.HeaderTable>
              <C.HeaderTableTitle>Produtos</C.HeaderTableTitle>
              <M.Dialog open={openProduct} onOpenChange={setOpenProduct}>
                <M.DialogTrigger>
                  <M.Button>Cadastrar</M.Button>
                </M.DialogTrigger>
                <ModalProductRegister
                  setOpen={setOpenProduct}
                  categories={categories}
                />
              </M.Dialog>
            </C.HeaderTable>
            <C.Table>
              <C.TableCaption>Produtos</C.TableCaption>
              <C.TableHeader>
                <C.TableRow>
                  <C.TableHead>#</C.TableHead>
                  <C.TableHead>Nome</C.TableHead>
                  <C.TableHead>Categoria</C.TableHead>
                  <C.TableHead>Preço</C.TableHead>
                  <C.TableHead>Ações</C.TableHead>
                </C.TableRow>
              </C.TableHeader>
              <C.TableBody>
                {products.map((product) => (
                  <C.TableRow key={product._id}>
                    <C.TableCell>{product._id}</C.TableCell>
                    <C.TableCell>{product.name}</C.TableCell>
                    <C.TableCell>{product.description}</C.TableCell>
                    <C.TableCell>{product.price}</C.TableCell>
                    <C.TableCell style={{ display: "flex", gap: "0.5rem" }}>
                      {/* <M.Dialog
                        open={openAddIngredients}
                        onOpenChange={setOpenAddIngredients}
                      >
                        <M.DialogTrigger
                          style={{
                            backgroundColor: "transparent",
                          }}
                          onClick={() => handleOpenAddIngredients(product)}
                        >
                          <PlusCircle />
                        </M.DialogTrigger>
                        {selectedProduct && (
                          <ModalAddIngredients
                            data={selectedProduct}
                            setOpen={setOpenAddIngredients}
                          />
                        )}
                      </M.Dialog> */}
                      <M.Dialog
                        open={openDeleteProduct}
                        onOpenChange={setOpenDeleteProduct}
                      >
                        <M.DialogTrigger
                          style={{
                            backgroundColor: "transparent",
                          }}
                          onClick={() => handleOpenDeleteProduct(product)}
                        >
                          <Trash2 />
                        </M.DialogTrigger>
                        {selectedProduct && (
                          <ModalDeleteProduct
                            setOpen={setOpenDeleteProduct}
                            data={selectedProduct}
                          />
                        )}
                      </M.Dialog>
                    </C.TableCell>
                  </C.TableRow>
                ))}
              </C.TableBody>
              <C.TableFooter>
                <C.TableRow>
                  <C.TableCell colSpan={3}>
                    Total: {products.length} produto{products.length > 1 && "s"}
                  </C.TableCell>
                </C.TableRow>
              </C.TableFooter>
            </C.Table>
          </C.TabsContent>
        </C.Tabs>
      </C.Container>
    </>
  );
};
