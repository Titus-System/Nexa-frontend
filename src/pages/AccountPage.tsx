import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope, faUser, faAddressCard } from "@fortawesome/free-regular-svg-icons";

const AccountPage: React.FC = () => {
    return (
        <div className="relative w-full mb-28">
            <div className="mt-[3.5rem]">
                <img src="/banner_account.png" alt="banner_account" className="w-full" />
                <h1 className="text-[2.9rem] font-bold mb-6 text-[#010A26]">Username</h1>
            </div>
            <div className="flex flex-col items-center">
                <div className="bg-white w-[93%] rounded-lg shadow-[0_0_60px_rgba(0,0,0,0.15)] px-12 py-9">
                    <div className="flex flex-row justify-between mb-14">
                        <h2 className="font-bold text-[#082640] text-3xl underline">Informações Pessoais</h2>
                        <button>
                            <FontAwesomeIcon icon={faPencil} />
                        </button>
                    </div>
                    <div className="flex flex-col justify-self-start w-full">
                        <div className="flex flex-row items-center gap-2">
                            <FontAwesomeIcon icon={faUser} className="text-2xl text-[#0F3B57]" />
                            <label htmlFor="nome-completo" className="text-xl font-medium text-[#0F3B57]">Nome completo</label>
                        </div>
                        <input type="text" name="nome-completo" className="border w-full p-[0.4rem] bg-white border-[#082640] rounded-md mt-[0.6rem] mb-[1.4rem]" />
                        <div className="flex flex-row items-center">
                            <FontAwesomeIcon icon={faAddressCard} />
                            <label htmlFor="cargo-funcao">Cargo/Função</label>
                        </div>
                        <input type="text" name="cargo-funcao" />
                        <div className="flex flex-col">
                            <div className="flex flex-row items-center">
                                <FontAwesomeIcon icon={faEnvelope} />
                                <label htmlFor="email">Email</label>
                            </div>
                            <input type="text" name="email" placeholder="emailexemplo@gmail.com" className="border-solid border-[#0F3B57] rounded-md"/>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-row items-center">
                                <FontAwesomeIcon icon={faPhone} />
                                <label htmlFor="telefone">Telefone</label>
                            </div>
                            <input type="text" name="telefone" placeholder="+55 (99) 99999-9999"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountPage;