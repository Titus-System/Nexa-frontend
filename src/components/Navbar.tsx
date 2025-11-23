// NavBar.tsx
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import SidebarMenu from "./SidebarMenu";
import { useAuth } from "../context/useAuth";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function NavBar() {
  const { darkMode } = useTheme();
  const [menuAberto, setMenuAberto] = useState(false);
  const { user } = useAuth();

  return (
    <div className={`${darkMode ? "bg-[#010A26]" : ""}`}>
      {/* Navbar fixa: z reduzido para 40 (fica abaixo do overlay z-50) */}
      <div
        className="fixed top-0 left-0 right-0 h-[5rem] w-full flex items-center justify-between px-7 shadow-md transition-colors duration-300 z-40"
        style={{ background: "radial-gradient(circle, #0F3B57 10%, #010A26 60%)" }}
      >
        <FontAwesomeIcon
          icon={faBars}
          className="text-white text-4xl cursor-pointer hover:opacity-80 transition"
          onClick={() => setMenuAberto(true)}
        />

        <a className="flex items-center justify-center cursor-pointer" href="/">
          <img src="/logo_nexa_branco.png" alt="logo_nexa" className="w-[22%] object-contain" />
        </a>

        {user ? (
          <FontAwesomeIcon
            icon={faUser}
            className="text-white text-4xl cursor-pointer hover:opacity-80 transition"
            onClick={() => (window.location.href = "/account")}
          />
        ) : (
          <div className="text-white text-lg flex gap-2">
            <Link
              to="/login?mode=login"
              className="hover:opacity-80 transition"
            >
              Login
            </Link>
            <span>|</span>
            <Link
              to="/login?mode=cadastro"
              className="hover:opacity-80 transition"
            >
              Cadastro
            </Link>
          </div>
        )}
      </div>

      {/* Menu lateral (overlay + sidebar) */}
      <SidebarMenu aberto={menuAberto} onClose={() => setMenuAberto(false)} />
    </div>
  );
}

