import { faCopy, faFileExcel, faMagnifyingGlass, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { downloadExcelByTask } from "../services/downloadExcelService";
import { useTheme } from "../context/ThemeContext";

export const SingleSuccessView = ({ singleResult }: { singleResult: any }) => {

    const navigate = useNavigate();
    const dataHora = new Date().toLocaleString('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
    });

    console.log(singleResult)

    const downloadExcel = async (taskId:string) => {
        downloadExcelByTask(taskId)
    };

    const { darkMode } = useTheme();

    return (
        <div className="w-[70%]">
            <div className="mt-4 border-1 rounded-lg mb-20">
                <div className={`flex flex-row items-center gap-5 px-7 py-9 ${darkMode ? "bg-[#1E263D] border-1 border-white" : "bg-white"} rounded-t-lg`}>
                    <img src="/check-circle.svg" alt="icone_sucesso" className="w-[2.7rem]" />
                    <div className="flex flex-col flex-1 w-full min-w-0">
                        <div className="flex justify-between items-center w-full">
                            <h2 className="font-bold text-3xl truncate mb-2">{singleResult.partnumber}</h2>
                            <button className={`border-1 ${darkMode ? " border-white text-white" : "border-[#0F3B57] text-[#0F3B57]"} px-2 py-1 text-3xl rounded-lg`}>
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>
                        <div className="flex flex-row gap-4 items-center">
                            {/* <span>{(result["confidence_score"] * 100).toFixed(2)}% de confiança</span> */}
                            {singleResult?.result && (
                                <span className={`p-2 px-4 rounded-4xl text-sm  font-semibold ${darkMode ? "bg-[#182039] text-white" : "bg-[#F2F0EB] text-[#0F3B57]" }`}>{((Number(singleResult.result["confidence_score"]) || 0) * 100).toFixed(2)}% de confiança</span>
                            )}
                            <p className="text-[#9799A6]">Analisado em {dataHora}</p>
                        </div>
                    </div>
                </div>
                <div className={`p-7 flex flex-col gap-5 ${darkMode ? "bg-[#1E263D] border-1 border-white" : "bg-[#F2F0EB]"} `}>
                    <div>
                        <div className="flex flex-row items-center justify-between mb-5">
                            <h2 className="text-left text-2xl font-semibold">Classificação Fiscal</h2>
                            <button className={`border-1 px-2 py-1 text-xl rounded-lg ${darkMode ? "border-white text-white" : "text-[#010A26] border-[#010A26]"}`}>
                                <FontAwesomeIcon icon={faPencil} />
                            </button>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row justify-between">
                                <h3 className="text-xl font-medium">NCM:</h3>
                                <p className="text-lg">
                                    {singleResult?.result?.ncm ? singleResult.result.ncm : "(Não encontrado)"}
                                </p>
                            </div>
                            {/* <div className="flex flex-row justify-between">
                                <h3 className="text-xl font-medium">Alíquota IPI:</h3>
                                <p className="text-lg">
                                    {singleResult?.result?.tax ? singleResult.result.tax : "(Não encontrado)"}
                                </p>
                            </div> */}
                            <div className="flex flex-row justify-between">
                                <h3 className="text-xl font-medium">Exceção:</h3>
                                <p className="text-lg">
                                    {singleResult?.result?.exception ? singleResult.result.exception : "(Não encontrado)"}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-row items-center justify-between mb-5">
                            <h2 className="text-left text-2xl font-semibold">Origem e Fabricação</h2>
                            <button className={`border-1 border-[#010A26] px-2 py-1 text-xl rounded-lg text-[#010A26] ${darkMode ? "border-white text-white" : "text-[#010A26] border-[#010A26]"}`}>
                                <FontAwesomeIcon icon={faPencil} />
                            </button>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row justify-between">
                                <h3 className="text-xl font-medium">Fabricante:</h3>
                                <p className="text-lg">
                                    {singleResult?.result?.fabricante ? singleResult.result.fabricante : "(Não encontrado)"}
                                </p>
                            </div>
                            <div className="flex flex-row justify-between">
                                <h3 className="text-xl font-medium">País de Origem:</h3>
                                <p className="text-lg">
                                    {singleResult?.result?.pais ? singleResult.result.pais : "(Não encontrado)"}
                                </p>
                            </div>
                            <div className="flex flex-row justify-between">
                                <h3 className="text-xl font-medium">Endereço:</h3>
                                <p className="text-lg">
                                    {singleResult?.result?.endereco ? singleResult.result.endereco : "(Não encontrado)"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {singleResult?.result && (
                    <div className={`p-7 rounded-b-lg ${darkMode ? "bg-[#1E263D] border-1 border-white" : "bg-white"}`}>
                        <div className="flex justify-between items-center w-full mb-8">
                            <h3 className="font-semibold text-2xl text-left">Descrição Detalhada para a Receita Federal</h3>
                            <div className="flex flex-row items-center gap-3">
                                <button className={`border-1 px-2 py-1 text-3xl rounded-lg ${darkMode ? "border-white text-white" : "text-[#0F3B57] border-[#0F3B57]"}`}>
                                    <FontAwesomeIcon icon={faPencil} />
                                </button>
                                <button className={`border-1 px-2 py-1 text-3xl rounded-lg ${darkMode ? "border-white text-white" : "text-[#0F3B57] border-[#0F3B57]"}`}>
                                    <FontAwesomeIcon icon={faCopy} />
                                </button>
                            </div>
                        </div>
                            <div className={`rounded-lg mb-3 p-4 ${darkMode ? "bg-[#1E263D] border-1 border-white" : "bg-[#F2F0EB]"}`}>
                            <p className={`${darkMode ? "text-white" : "text-[#082640]"} text-left`}>{singleResult?.result?.description ? singleResult.result.description : "(Não encontrado)"}</p>
                        </div>
                        <p className="text-left text-[#9799A6] text-sm mb-3">{singleResult?.result?.description ? "Esta descrição foi gerada automaticamente para ser compreensível por um leigo, atendendo aos requisitos da Receita Federal para importação." : "(Não encontrado)"}</p>
                    </div>
                )}
            </div>
            <div className="flex flex-row justify-end gap-4">
                <button className="bg-[#0F3B57] text-white text-base px-4 py-2 rounded-lg font-bold cursor-pointer">
                    <FontAwesomeIcon icon={faFileExcel} className="mr-2"/>
                    Exportar para Excel
                </button>
                <button className="bg-[#0F3B57] text-white text-base px-4 py-2 rounded-lg font-bold cursor-pointer"
                    onClick={() => navigate("/classification")}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-2" />
                    Nova Análise
                </button>
            </div>
        </div>

    );
};