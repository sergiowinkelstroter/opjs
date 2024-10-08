import { useForm } from "react-hook-form";
import * as C from "../ModalCategoryRegister/styles";
import { api } from "@/utils/api";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Category } from "@/types/Category";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface IModalProductRegisterProps {
  setOpen: (open: boolean) => void;
  categories: Category[];
}

export function ModalProductRegister({
  setOpen,
  categories,
}: IModalProductRegisterProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  const { mutateAsync: createProduct, isLoading } = useMutation({
    mutationKey: ["createProduct", "products"],
    mutationFn: async (data: any) => {
      const formData = new FormData();

      // Adiciona os dados do produto ao FormData
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("category", data.categoryId);

      // Adiciona o arquivo da imagem ao FormData
      if (data.imagePath[0]) {
        formData.append("image", data.imagePath[0]);
      }

      const response = await api.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Define o cabeçalho correto
        },
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  async function onSubmit(data: any) {
    try {
      await createProduct(data);
      setOpen(false);
      toast.success("Produto cadastrado com sucesso");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao cadastrar produto");
    }
  }

  return (
    <C.DialogPortal>
      <C.DialogOverlay />
      <C.DialogContent>
        <C.DialogHeader>
          <C.DialogTitle>Cadastrar produto</C.DialogTitle>
          <C.DialogDescription>
            Formulário para cadastro de produtos
          </C.DialogDescription>
        </C.DialogHeader>
        <C.Form onSubmit={handleSubmit(onSubmit)}>
          <C.Input {...register("name")} placeholder="Nome do produto" />
          <C.Textarea {...register("description")} placeholder="Descrição" />
          <C.Input {...register("price")} placeholder="Preço" type="number" />
          <C.Select {...register("categoryId")}>
            <option value="">Selecione uma categoria</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </C.Select>
          <C.Input
            {...register("imagePath")}
            placeholder="Imagem"
            type="file"
            accept="image/*"
          />
          <C.Button type="submit">Cadastrar</C.Button>
        </C.Form>
      </C.DialogContent>
    </C.DialogPortal>
  );
}
