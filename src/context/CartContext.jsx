import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { usuario } = useAuth();

  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem("carrito");
    return guardado ? JSON.parse(guardado) : [];
  });

  // 🧼 Limpiar carrito si cambia el usuario (logout o cambio de cuenta)
  useEffect(() => {
    setCarrito([]);
    localStorage.removeItem("carrito");
  }, [usuario]);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (curso) => {
    if (!carrito.find((item) => item.titulo === curso.titulo)) {
      setCarrito([...carrito, curso]);
    }
  };

  const removerDelCarrito = (titulo) => {
    setCarrito(carrito.filter((item) => item.titulo !== titulo));
  };

  const vaciarCarrito = () => setCarrito([]);

  return (
    <CartContext.Provider
      value={{ carrito, agregarAlCarrito, removerDelCarrito, vaciarCarrito }}
    >
      {children}
    </CartContext.Provider>
  );
};
