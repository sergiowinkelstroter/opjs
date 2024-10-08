import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LogoImg from "../../assets/images/logo.svg";
import * as C from "./styles";
import { getUserProfile } from "@/utils/getUserProfile";
import { Menu, X } from "lucide-react"; // Importando ícones do Lucide

export const Header = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>({});
  const [restaurant, setRestaurant] = useState<any>({});
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Controle do menu mobile

  useEffect(() => {
    async function fetch() {
      try {
        const profile = await getUserProfile();
        setUser(profile.user);
        setRestaurant(profile.restaurant);
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    }

    fetch();
  }, []);

  async function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <C.Container>
      <C.Content>
        <div className="page-details">
          <h1>{title}</h1>
          <h2>{description}</h2>
        </div>

        <C.Image src={LogoImg} alt="WAITERAPP" />

        {/* Menu mobile - ícone do menu hamburguer */}
        <C.MenuIcon onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </C.MenuIcon>

        {/* Lista do menu para desktop e mobile */}
        <C.List isOpen={isMenuOpen}>
          <p style={{ color: "#fff", fontSize: "18px", fontWeight: "bold" }}>
            {restaurant?.name}
          </p>
          <li>
            <a href="/orders">Home</a>
          </li>
          {user.role === "manager" && (
            <li>
              <a href="/admin">Administração</a>
            </li>
          )}
          <li>
            <a onClick={() => handleLogout()} href="#">
              Sair
            </a>
          </li>
        </C.List>
      </C.Content>
    </C.Container>
  );
};
