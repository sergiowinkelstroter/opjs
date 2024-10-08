import { toast } from "react-toastify";
import * as C from "./styles";
import { useForm } from "react-hook-form";
import { api } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface IModalDeleteWaiterProps {
  setOpen: (open: boolean) => void;
  data: any;
}

export function ModalDeleteWaiter({ setOpen, data }: IModalDeleteWaiterProps) {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteWaiter, isLoading } = useMutation({
    mutationKey: ["deleteUsers", "users"],
    mutationFn: async () => {
      const response = await api.delete(`/products/${data._id}`);
      console.log(response);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  async function onSubmit() {
    try {
      await deleteWaiter();
      setOpen(false);
      toast.success("Funcionário excluído com sucesso");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao excluir funcionário");
    }
  }

  return (
    <C.DialogPortal>
      <C.DialogOverlay />
      <C.DialogContent>
        <C.DialogHeader>
          <C.DialogTitle>Excluir funcionário</C.DialogTitle>
          <C.DialogDescription>
            Tem certeza que deseja excluir o funcionário {data.name}?
          </C.DialogDescription>
        </C.DialogHeader>
        <C.Button onClick={onSubmit} disabled={isLoading}>
          Excluir
        </C.Button>
      </C.DialogContent>
    </C.DialogPortal>
  );
}
