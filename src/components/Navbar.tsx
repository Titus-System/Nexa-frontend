// NavBar.tsx
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import SidebarMenu from "./SidebarMenu";

export default function NavBar() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <>
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

        <FontAwesomeIcon
          icon={faUser}
          className="text-white text-4xl cursor-pointer hover:opacity-80 transition"
        />
      </div>

      {/* Menu lateral (overlay + sidebar) */}
      <SidebarMenu aberto={menuAberto} onClose={() => setMenuAberto(false)} />
    </>
  );
}

