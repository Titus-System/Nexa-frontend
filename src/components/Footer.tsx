import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-regular-svg-icons";

export default function Footer() {
    return (
        <div className="bg-[#0F3B57] bottom-0 left-0 right-0 h-fit w-full flex flex-col justify-center text-white">
            <div className="p-8">
                <img src="/logo_nexa_branco.png" alt="logo_nexa" className="w-[22%]" />
                <hr className="text-white w-full h-2"></hr>
                <div className="flex flex-row justify-center">
                    <div>
                        <p>Uma solução tecnológica avançada para classificação fiscal. Esta plataforma automatiza a análise de part numbers, gerando descrições detalhadas e classificações NCM precisas que atendem aos rigorosos padrões da Receita Federal. Foi esenvolvido pela Titus Systems em parceria com a Tecsys.</p>
                    </div>
                    <div className="flex flex-col">
                        <h3>Navegação Rápida</h3>
                        <div className="flex flex-row items-center">
                            <FontAwesomeIcon icon={faHouse} />
                            <p>Home</p>
                        </div>
                    </div>
                    <div>
                        <h3>Conecte-se com a Titus</h3>
                    </div>
                </div>
            </div>
            <div className="bg-[#082640] py-4">
                <p className="text-[#D6D8E4]">© 2025 Titus Systems. Todos os direitos reservados.</p>
            </div>
        </div>
    );
}