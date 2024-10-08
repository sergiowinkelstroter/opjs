import { toast } from "react-toastify";
import * as C from "../ModalCategoryRegister/styles";
import { useForm } from "react-hook-form";
import { api } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface IModalWaitersRegisterProps {
  setOpen: (open: boolean) => void;
}

export function ModalWaitersRegister({ setOpen }: IModalWaitersRegisterProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();

  const { mutateAsync: createWaiters, isLoading } = useMutation({
    mutationKey: ["createWaiters", "users"],
    mutationFn: async (data: any) => {
      const response = await api.post("/users", {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  async function onSubmit(data: any) {
    try {
      await createWaiters(data);
      setOpen(false);
      toast.success("Funcionário cadastrada com sucesso");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao cadastrar funcionário");
    }
  }

  return (
    <C.DialogPortal>
      <C.DialogOverlay />
      <C.DialogContent>
        <C.DialogHeader>
          <C.DialogTitle>Cadastrar funcionário</C.DialogTitle>
          <C.DialogDescription>
            Formulário para cadastro de funcionários{" "}
          </C.DialogDescription>
        </C.DialogHeader>
        <C.Form onSubmit={handleSubmit(onSubmit)}>
          <C.Input {...register("name")} placeholder="Nome do funcionário" />
          <C.Input {...register("email")} placeholder="E-mail" type="email" />
          <C.Select {...register("role")}>
            <option value="">Selecione um cargo</option>

            <option value="waiter">Garçom</option>
            <option value="kitchen">Cozinha</option>
          </C.Select>
          <C.Input {...register("password")} placeholder="Senha" />
          <C.Button type="submit" disabled={isLoading}>
            {isLoading ? "Carregando..." : "Cadastrar"}
          </C.Button>
        </C.Form>
      </C.DialogContent>
    </C.DialogPortal>
  );
}
