import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons"; 
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
    return (
        <div className="bg-[radial-gradient(circle,_#0F3B57_10%,_#010A26_60%)] bottom-0 left-0 right-0 h-fit w-full flex flex-col justify-center text-white">
            <div className="p-8">
                <img src="/logo_nexa_branco_footer.png" alt="logo_nexa" className="w-[22%]" />
                <hr className="text-white mb-5 h-2"></hr>
                <div className="flex flex-row justify-left gap-[17.8%]">
                    <div className="w-[30%]">
                        <p className="text-left">Uma solução tecnológica avançada para classificação fiscal. Esta plataforma automatiza a análise de part numbers, gerando descrições detalhadas e classificações NCM precisas que atendem aos rigorosos padrões da Receita Federal. Foi esenvolvido pela Titus Systems em parceria com a Tecsys.</p>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="font-semibold text-2xl mb-5">Navegação Rápida</h3>
                        <div className="flex flex-col gap-3">
                            <a href="/" className="flex flex-row items-center gap-3">
                                <FontAwesomeIcon icon={faHouse} className="text-xl"/>
                                <p className="text-lg">Home</p>
                            </a>
                            <a href="/classification" className="flex flex-row items-center gap-3">
                                <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xl"/>
                                <p className="text-lg w-[100%]">Análise de Informações</p>
                            </a>
                            <a href="/" className="flex flex-row items-center gap-3">
                                <FontAwesomeIcon icon={faClockRotateLeft} className="text-xl"/>
                                <p className="text-lg">Histórico</p>
                            </a>
                            <a href="/" className="flex flex-row items-center gap-3">
                                <FontAwesomeIcon icon={faUser} className="text-xl"/>
                                <p className="text-lg">Conta</p>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-2xl mb-5">Conecte-se com a Titus</h3>
                        <div className="flex flex-col gap-3">
                            <a href="https://github.com/Titus-System" target="_blank" className="flex flex-row items-center gap-3">
                                <FontAwesomeIcon icon={faGithub} className="text-xl"/>
                                <p className="text-lg">GitHub</p>
                            </a>
                            <a href="https://mail.google.com/mail/?view=cm&to=titussystemsenterprise@gmail.com" target="_blank" className="flex flex-row items-center gap-3">
                                <FontAwesomeIcon icon={faEnvelope} className="text-xl"/>
                                <p className="text-lg">Email</p>
                            </a>
                            <a href="https://www.instagram.com/titus_systems" target="_blank" className="flex flex-row items-center gap-3">
                                <FontAwesomeIcon icon={faInstagram} className="text-xl"/>
                                <p className="text-lg">Instagram</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[#010A26] py-4">
                <p className="text-[#D6D8E4]">© 2025 Titus Systems. Todos os direitos reservados.</p>
            </div>
        </div>
    );
}