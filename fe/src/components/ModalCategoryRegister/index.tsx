import { toast } from "react-toastify";
import * as C from "./styles";
import { useForm } from "react-hook-form";
import { api } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface IModalCategoryRegisterProps {
  setOpen: (open: boolean) => void;
}

export function ModalCategoryRegister({
  setOpen,
}: IModalCategoryRegisterProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const queryClient = useQueryClient();

  const { mutateAsync: createCategory, isLoading } = useMutation({
    mutationKey: ["createCategory", "categories"],
    mutationFn: async (data: any) => {
      const response = await api.post("/categories", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  async function onSubmit(data: any) {
    try {
      await createCategory(data);
      setOpen(false);
      toast.success("Categoria cadastrada com sucesso");
      reset();
    } catch (error) {
      console.log(error);
      toast.error("Erro ao cadastrar categoria");
    }
  }

  return (
    <C.DialogPortal>
      <C.DialogOverlay />
      <C.DialogContent>
        <C.DialogHeader>
          <C.DialogTitle>Cadastrar categoria</C.DialogTitle>
          <C.DialogDescription>
            Formulário para cadastro de categorias{" "}
          </C.DialogDescription>
        </C.DialogHeader>
        <C.Form onSubmit={handleSubmit(onSubmit)}>
          <C.Input {...register("name")} placeholder="Nome da categoria" />
          <C.Input {...register("icon")} placeholder="Icon" />
          <C.Button type="submit" disabled={isLoading}>
            {isLoading ? "Carregando..." : "Cadastrar"}
          </C.Button>
        </C.Form>
      </C.DialogContent>
    </C.DialogPortal>
  );
}
