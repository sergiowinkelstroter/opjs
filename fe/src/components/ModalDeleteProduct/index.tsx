import { toast } from "react-toastify";
import * as C from "./styles";
import { useForm } from "react-hook-form";
import { api } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product } from "@/types/Product";

interface IModalDeleteProductProps {
  setOpen: (open: boolean) => void;
  data: Product;
}

export function ModalDeleteProduct({
  setOpen,
  data,
}: IModalDeleteProductProps) {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteProduct, isLoading } = useMutation({
    mutationKey: ["deleteProduct", "products"],
    mutationFn: async () => {
      const response = await api.delete(`/products/${data._id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  async function onSubmit() {
    try {
      await deleteProduct();
      setOpen(false);
      toast.success("Produto excluído com sucesso");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao excluir produto");
    }
  }

  return (
    <C.DialogPortal>
      <C.DialogOverlay />
      <C.DialogContent>
        <C.DialogHeader>
          <C.DialogTitle>Excluir produto</C.DialogTitle>
          <C.DialogDescription>
            Tem certeza que deseja excluir o produto {data.name}?
          </C.DialogDescription>
        </C.DialogHeader>
        <C.Button onClick={onSubmit} disabled={isLoading}>
          Excluir
        </C.Button>
      </C.DialogContent>
    </C.DialogPortal>
  );
}
