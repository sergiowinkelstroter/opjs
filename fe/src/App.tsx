import { Header } from "./components/Header";
import { Oders } from "./pages/Oders";
import { GlobalStyles } from "./styles/GlobalStyles";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Admin } from "./pages/Admin";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { RegisterRestaurant } from "./pages/Register-Restaurant";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register-restaurant",
    element: <RegisterRestaurant />,
  },
  {
    path: "/orders",
    element: <Oders />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
]);

export function App() {
  return (
    <>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      <ToastContainer position="bottom-center" />
    </>
  );
}
