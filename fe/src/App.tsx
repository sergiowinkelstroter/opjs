import { Header } from "./components/Header";
import { Oders } from "./components/Oders";
import { GlobalStyles } from "./styles/GlobalStyles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function App() {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Oders />
      <ToastContainer position="bottom-center" />
    </>
  );
}
