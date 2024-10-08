import { toast } from "react-toastify";
import * as C from "./styles";
import { useForm } from "react-hook-form";
import { api } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Category } from "@/types/Category";

interface IModalDeleteCategoryProps {
  setOpen: (open: boolean) => void;
  data: Category;
}

export function ModalDeleteCategory({
  setOpen,
  data,
}: IModalDeleteCategoryProps) {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteCategory, isLoading } = useMutation({
    mutationKey: ["deleteCategory", "categories"],
    mutationFn: async () => {
      const response = await api.delete(`/categories/${data._id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  async function onSubmit() {
    try {
      await deleteCategory();
      setOpen(false);
      toast.success("Categoria excluída com sucesso");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao excluir categoria");
    }
  }

  return (
    <C.DialogPortal>
      <C.DialogOverlay />
      <C.DialogContent>
        <C.DialogHeader>
          <C.DialogTitle>Excluir categoria</C.DialogTitle>
          <C.DialogDescription>
            Tem certeza que deseja excluir categoria {data.name}?
          </C.DialogDescription>
        </C.DialogHeader>
        <C.Button onClick={onSubmit} disabled={isLoading}>
          Excluir
        </C.Button>
      </C.DialogContent>
    </C.DialogPortal>
  );
}
