import { Button, Input } from "@/components/ModalCategoryRegister/styles";
import LogoImg from "../../assets/images/logo.svg";
import * as C from "./styles";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { api } from "@/utils/api";
import { useNavigate } from "react-router-dom";

export function RegisterRestaurant() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  // Separar os forms para cada etapa
  const {
    register: registerStep1,
    handleSubmit: handleSubmitStep1,
    getValues: getValuesStep1,
  } = useForm();
  const { register: registerStep2, handleSubmit: handleSubmitStep2 } =
    useForm();

  // Função para enviar todos os dados
  const onSubmit = async (step2Data: any) => {
    const step1Data = getValuesStep1();
    const allData = { ...step1Data, ...step2Data };

    try {
      await api.post("/restaurants", allData);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao cadastrar restaurante");
    }
  };

  return (
    <>
      <C.ContainerHeader>
        <C.ContentHeader>
          <C.ButtonBack to={"/"}>
            <ArrowLeft />
          </C.ButtonBack>
          <div className="page-details">
            <h1>Cadastro</h1>
            <h2>Faça o cadastro do seu restaurante</h2>
          </div>
          <C.Image src={LogoImg} alt="WAITERAPP" />
        </C.ContentHeader>
      </C.ContainerHeader>

      <C.Container>
        <C.Title>
          {step === 1 ? "Cadastro do restaurante" : "Crie a sua conta"}
        </C.Title>

        {/* Formulário da etapa 1 */}
        {step === 1 && (
          <C.Form onSubmit={handleSubmitStep1(() => setStep(2))}>
            <C.Div>
              <Input placeholder="Nome" {...registerStep1("name_restaurant")} />
              <Input placeholder="Endereço" {...registerStep1("address")} />
              <Input placeholder="Telefone" {...registerStep1("phone")} />
              <Button type="submit">Próximo</Button>
            </C.Div>
          </C.Form>
        )}

        {/* Formulário da etapa 2 */}
        {step === 2 && (
          <C.Form onSubmit={handleSubmitStep2(onSubmit)}>
            <C.Div>
              <Input placeholder="Nome" {...registerStep2("name")} />
              <Input placeholder="E-mail" {...registerStep2("email")} />
              <Input placeholder="Senha" {...registerStep2("password")} />
              <div style={{ display: "flex", gap: "8px" }}>
                <Button
                  style={{
                    backgroundColor: "#fff",
                    color: "#d73035",
                    border: "1px solid #d73035",
                  }}
                  onClick={() => setStep(1)}
                  type="button"
                >
                  Voltar
                </Button>
                <Button type="submit">Cadastrar</Button>
              </div>
            </C.Div>
          </C.Form>
        )}
      </C.Container>
    </>
  );
}
