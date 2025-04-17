import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./assets/styles/variables.css";

import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage";
import ReikiPage from "./pages/ReikiPage";
import TarotPage from "./pages/TarotPage";
import TerapiasPage from "./pages/TerapiasPage";
import TerapiasIntegrativasPage from "./pages/TerapiasIntegrativasPage";
import CursosPage from "./pages/CursosPage";
import CursoDetallePage from "./pages/CursoDetallePage";
import ClasesEnVivoPage from "./pages/ClasesEnVivoPage";
import ClaseVivoDetallePage from "./pages/ClaseVivoDetallePage";
import ContactoPage from "./pages/ContactoPage";
import CarritoPage from "./pages/CarritoPage";
import CheckoutPage from "./pages/CheckoutPage";
import MisCursosPage from "./pages/MisCursosPage";
import PanelAdmin from "./pages/admin/PanelAdmin";
import AdminLayout from "./pages/admin/AdminLayout";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import RegistroPage from "./pages/RegistroPage";
import ForgetPasswordPage from "./pages/ForgetPassword";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Footer from "./components/Footer/Footer";
import PagoExitosoPage from "./pages/PagoExitosoPage";
import PagoPendientePage from "./pages/PagoPendientePage";
import PagoFallidoPage from "./pages/PagoFallidoPage";
import CursoCompradoDetallePage from "./pages/CursoCompradoDetallePage";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Header />
            <Routes>
              {/* 🌟 Públicas */}
              <Route path="/" element={<HomePage />} />
              <Route path="/reiki" element={<ReikiPage />} />
              <Route path="/tarot" element={<TarotPage />} />
              <Route path="/terapias-de-luz" element={<TerapiasPage />} />
              <Route
                path="/terapias-integrativas"
                element={<TerapiasIntegrativasPage />}
              />
              <Route path="/cursos" element={<CursosPage />} />
              <Route path="/clases-en-vivo" element={<ClasesEnVivoPage />} />
              <Route path="/cursoDetalle/:id" element={<CursoDetallePage />} />
              <Route
                path="/claseDetalle/:id"
                element={<ClaseVivoDetallePage />}
              />
              <Route path="/contacto" element={<ContactoPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registrarse" element={<RegistroPage />} />
              <Route path="/forget-password" element={<ForgetPasswordPage />} />
              <Route
                path="/reset-password/:token"
                element={<ResetPasswordPage />}
              />
              <Route path="/pago-exitoso" element={<PagoExitosoPage />} />
              <Route path="/pago-pendiente" element={<PagoPendientePage />} />
              <Route path="/pago-fallido" element={<PagoFallidoPage />} />

              {/* 🛒 Solo para usuarios logueados */}
              <Route path="/carrito" element={<CarritoPage />} />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute roles={["user"]}>
                    <CheckoutPage />
                  </ProtectedRoute>
                }
              />

              {/* 👤 Usuarios registrados (admin o user) */}
              <Route
                path="/mis-cursos"
                element={
                  <ProtectedRoute roles={["admin", "user"]}>
                    <MisCursosPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/mis-cursos/:id"
                element={
                  <ProtectedRoute roles={["admin", "user"]}>
                    <CursoCompradoDetallePage />
                  </ProtectedRoute>
                }
              />

              {/* 🔒 Solo admin */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute roles={["admin"]}>
                    <AdminLayout />
                  </ProtectedRoute> 
                }
              />
            </Routes> 
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
