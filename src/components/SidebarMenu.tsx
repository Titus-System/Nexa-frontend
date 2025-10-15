// SidebarMenu.tsx (TypeScript)
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faBars, faHome, faChartBar, faUser } from "@fortawesome/free-solid-svg-icons";

type SidebarMenuProps = {
  aberto: boolean;
  onClose: () => void;
};

export default function SidebarMenu({ aberto, onClose }: SidebarMenuProps) {
  return (
    <>
      {/* Overlay: agora com z-50 e cor rgba (ajuste opacidade como quiser) */}
      {aberto && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-50 transition-opacity duration-200"
          onClick={onClose}
        />
      )}

      {/* Sidebar: acima do overlay com z-60 */}
      <div
        className={`fixed top-0 left-0 h-full w-[35%] bg-[#0F3B57] text-white shadow-2xl z-60 transform transition-transform duration-300 ${
          aberto ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 bg-[radial-gradient(circle,_#0F3B57_10%,_#010A26_60%)]">
            <div className="flex flex-col">
            <div className="flex flex-row items-center">
          <FontAwesomeIcon icon={faBars} className="text-white text-4xl"/>
          <img src="/nexa_texto.png" alt="nexa_texto" className="w-24"/>
          </div>
          <p>Sistema de Classificação Fiscal</p>
          </div>
          <FontAwesomeIcon
            icon={faXmark}
            className="text-2xl cursor-pointer hover:text-gray-300"
            onClick={onClose}
          />
        </div>

        <ul className="mt-6 space-y-4 px-4">
          <li className="flex items-center gap-3 cursor-pointer hover:bg-[#082640] rounded-lg p-2 transition">
            <FontAwesomeIcon icon={faHome} />
            <span>Início</span>
          </li>
          <li className="flex items-center gap-3 cursor-pointer hover:bg-[#082640] rounded-lg p-2 transition">
            <FontAwesomeIcon icon={faChartBar} />
            <span>Relatórios</span>
          </li>
          <li className="flex items-center gap-3 cursor-pointer hover:bg-[#082640] rounded-lg p-2 transition">
            <FontAwesomeIcon icon={faUser} />
            <span>Perfil</span>
          </li>
        </ul>
      </div>
    </>
  );
}
