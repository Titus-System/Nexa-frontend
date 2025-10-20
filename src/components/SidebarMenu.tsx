// SidebarMenu.tsx (TypeScript)
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faBars, faClockRotateLeft, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faHouse, faUser } from '@fortawesome/free-regular-svg-icons';

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
        className={`fixed top-0 left-0 h-full w-[38%] bg-white text-white shadow-2xl z-60 transform transition-transform duration-300 ${
          aberto ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full justify-between">
          <div>
        <div className="relative flex flex-col py-10 px-7 bg-[radial-gradient(circle,_#0F3B57_10%,_#010A26_60%)]">
          <FontAwesomeIcon icon={faXmark} className="absolute top-4 right-4 text-2xl text-white cursor-pointer hover:text-gray-300" onClick={onClose}/>
          <div className="flex flex-row justify-start gap-8">
            <FontAwesomeIcon icon={faBars} className="text-white text-4xl mt-[0.9rem]" />
            <div className="flex flex-col">
              <img src="/nexa_texto.png" alt="nexa_texto" className="w-24" />
              <p className="text-white">Sistema de Classificação Fiscal</p>
            </div>
          </div>
        </div>
        <div className="pt-9">
        <h1 className="text-[#010A26] font-semibold text-2xl text-left pl-8">Ferramentas</h1>
        <ul className="mt-6">
          <li className="cursor-pointer hover:bg-[#F2F0E9] transition duration-200 py-4">
            <a className="flex flex-row items-center gap-7 pl-8" href="/">
              <FontAwesomeIcon icon={faHouse} className="text-[#010A26] text-[2.0rem]"/>
              <div className="flex flex-col items-start justify-center">
                <span className="text-[#010A26] font-medium text-xl">Home</span>
                <p className="text-[#0F3B57]">Página Inicial</p>
              </div>
            </a>
          </li>
          <li className="cursor-pointer hover:bg-[#F2F0E9] transition duration-200 py-4">
            <a className="flex flex-row items-center gap-7 pl-8" href="/classification">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="text-[#010A26] text-[2.0rem]"/>
              <div className="flex flex-col items-start justify-center">
                <span className="text-[#010A26] font-medium text-xl">Análise de Informações</span>
                <p className="text-[#0F3B57]">Análise automática de part numbers</p>
              </div>
            </a>
          </li>
          <li className="cursor-pointer hover:bg-[#F2F0E9] transition duration-200 py-4">
            <a className="flex flex-row items-center gap-7 pl-8" href="/history">
              <FontAwesomeIcon icon={faClockRotateLeft} className="text-[#010A26] text-[2.0rem]"/>
              <div className="flex flex-col items-start justify-center">
                <span className="text-[#010A26] font-medium text-xl">Histórico</span>
                <p className="text-[#0F3B57]">Análises anteriores</p>
              </div>
            </a>
          </li>
          <li className="cursor-pointer hover:bg-[#F2F0E9] transition duration-200 py-4">
            <a className="flex flex-row items-center gap-7 pl-8" href="/account">
              <FontAwesomeIcon icon={faUser} className="text-[#010A26] text-[2.0rem]"/>
              <div className="flex flex-col items-start justify-center">
                <span className="text-[#010A26] font-medium text-xl">Conta</span>
                <p className="text-[#0F3B57]">Cadastro, login e informações do perfil</p>
              </div>
            </a>
          </li>
        </ul>
        </div>
        </div>
        <div className="bg-[#F2F0E9] py-6">
          <p className="text-[#9799A6]">Criado por <strong>Titus Systems</strong></p>
        </div>
        </div>
      </div>
    </>
  );
}
