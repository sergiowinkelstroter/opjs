import { toast } from "react-toastify";
import * as C from "./styles";
import { useForm } from "react-hook-form";
import { api } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product } from "@/types/Product";

interface IModalAddIngredientsProps {
  setOpen: (open: boolean) => void;
  data: Product;
}

export function ModalAddIngredients({
  setOpen,
  data,
}: IModalAddIngredientsProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const queryClient = useQueryClient();

  const { mutateAsync: createIngredients, isLoading } = useMutation({
    mutationKey: ["createIngredients", "products"],
    mutationFn: async (formData: any) => {
      const response = await api.put(`/products/ingredients/${data._id}`, {
        ingredient: formData,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  async function onSubmit(data: any) {
    try {
      await createIngredients(data);
      setOpen(false);
      toast.success("Ingrediente cadastrada com sucesso");
      reset();
    } catch (error) {
      console.log(error);
      toast.error("Erro ao cadastrar ingrediente");
    }
  }

  return (
    <C.DialogPortal>
      <C.DialogOverlay />
      <C.DialogContent>
        <C.DialogHeader>
          <C.DialogTitle>Adicionar ingrediente no produto</C.DialogTitle>
          <C.DialogDescription>
            Formulário para cadastro de ingrediente
          </C.DialogDescription>
        </C.DialogHeader>
        <C.Form onSubmit={handleSubmit(onSubmit)}>
          <C.Input {...register("name")} placeholder="Nome do ingrediente" />
          <C.Input {...register("icon")} placeholder="Icon" />
          <C.Button type="submit" disabled={isLoading}>
            {isLoading ? "Carregando..." : "Cadastrar"}
          </C.Button>
        </C.Form>
      </C.DialogContent>
    </C.DialogPortal>
  );
}
