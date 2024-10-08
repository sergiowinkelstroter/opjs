import { Button, Input } from "@/components/ModalCategoryRegister/styles";
import LogoImg from "../../assets/images/logo.svg";
import * as C from "./styles";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import { api } from "@/utils/api";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getUserProfile } from "@/utils/getUserProfile";

export function Login() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetch() {
      const user = await getUserProfile();
      if (user) {
        navigate("/orders");
      }
    }

    fetch();
  }, []);

  async function handleLogin(data: any) {
    try {
      const response = await api.post("/login", {
        email: data.email,
        password: data.password,
      });

      const role = response.data.role;
      if (role === "waiter") {
        toast.error(
          "Garçons não tem permissão para acessar essa parte do sistema"
        );
        reset();
        return;
      }
      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
        navigate("/orders");
      }
    } catch (error) {
      console.log(error);
      toast.error("Erro ao fazer login");
    }
  }

  return (
    <>
      <C.ContainerHeader>
        <C.ContentHeader>
          <C.ButtonBack to={"/"}>
            <ArrowLeft />
          </C.ButtonBack>
          <div className="page-details">
            <h1>Autenticação</h1>
            <h2>Faça o login para acessar o sistema</h2>
          </div>
          <C.Image src={LogoImg} alt="WAITERAPP" />
        </C.ContentHeader>
      </C.ContainerHeader>

      <C.Container>
        <C.Title>Autenticação</C.Title>
        <C.Form onSubmit={handleSubmit(handleLogin)}>
          <Input placeholder="E-mail" {...register("email")} />
          <Input
            placeholder="Senha"
            {...register("password")}
            type="password"
          />
          <Button>Entrar</Button>
        </C.Form>
      </C.Container>
    </>
  );
}
