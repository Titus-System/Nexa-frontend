import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  return (
    <div className="fixed top-0 left-0 right-0 bg-[radial-gradient(circle,_#0F3B57_10%,_#010A26_60%)] h-[5rem] w-[100%] flex items-center justify-between z-50 px-7">
        <FontAwesomeIcon icon={faBars} className="text-white text-4xl cursor-pointer" />
        <a className="flex items-center justify-center cursor-pointer" href="/">
            <img src="/logo_nexa_branco.png" alt="logo_nexa" className="w-[22%] object-contain" />
        </a>
        <FontAwesomeIcon icon={faUser} className="text-white text-4xl cursor-pointer"/>
    </div>
  );
}
