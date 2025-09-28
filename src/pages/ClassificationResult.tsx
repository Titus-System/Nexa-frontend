import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useClassificationSocket } from "../hooks/useClassificatinoSocket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const ClassificationResult: React.FC = () => {
  // const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const roomId = (location.state as { room_id: string })?.room_id;

  const { status, result } = useClassificationSocket(roomId);
  // Função para calcular a porcentagem do progresso
  const calculateProgress = () => {
    if (status && status.current && status.total && status.total > 0) {
      return (status.current / status.total) * 100;
    }
    return 0; // Retorna 0 se não houver dados para calcular
  };

  const progressPercentage = calculateProgress();

  const agora = new Date();
  const dataHora = agora.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="p-6 flex flex-col items-center min-h-screen">
      {/* <h1 className="text-xl font-bold mb-4">Resultado da Tarefa {taskId}</h1> */}
      <div className="mb-24">
        <div className="flex flex-row items-center justify-center gap-5">
          <button className="bg-[#0F3B57] mb-[3%] rounded-[100%] py-2 px-1.5 flex justify-center items-center">
            <FontAwesomeIcon icon={faArrowLeft} className="text-white text-3xl" />
          </button>
          <h1 className="text-4xl font-bold mb-4 text-[#010A26]">Resultados da Análise</h1>
        </div>
        <p className="text-lg text-[#010A26]">Classificação fiscal automática concluída</p>
      </div>

      {!result && (
        <div className="w-full max-w-lg text-center">
          {status ? (
            <div>
              <p className="text-lg font-semibold mb-2">{status.message}</p>
              {/* Barra de progresso */}
              {status.current !== undefined && status.total !== undefined && (
                <div className="w-full bg-gray-200 rounded-full h-4 mb-2 overflow-hidden">
                  <div
                    className="bg-[#0F3B57] h-4 rounded-full transition-all duration-300 ease-in-out"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              )}
              {/* Texto do progresso */}
              {status.current !== undefined && status.total !== undefined && (
                <p className="text-sm text-gray-600">
                  {status.current} / {status.total}
                </p>
              )}
            </div>
          ) : (
            
            <p>Conectando e aguardando atualizações...</p>
          )}
        </div>
      )}

      {result && (
        <div className="w-[70%]">
          <div className="mt-4 border-1 rounded-lg mb-20">
            <div className="flex flex-row items-center gap-5 px-7 py-9 bg-white rounded-t-lg">
              <img src="/check-circle.svg" alt="icone_sucesso" className="w-[2.7rem]" />
              <div className="flex flex-col flex-1 w-full min-w-0">
                <div className="flex justify-between items-center w-full">
                  <h2 className="font-bold text-3xl truncate mb-2">{result.partnumber}</h2>
                  <button className="border-1 border-[#0F3B57] px-2 py-1 text-3xl rounded-lg text-[#0F3B57]">
                    <FontAwesomeIcon icon={faCopy} />
                  </button>
                </div>
                <div className="flex flex-row gap-4 items-center">
                  {/* <span>{(result["confidence_score"] * 100).toFixed(2)}% de confiança</span> */}
                  {result?.result && (
                    <span className="bg-[#F2F0EB] p-2 px-4 rounded-4xl text-sm text-[#0F3B57] font-semibold">{((Number(result.result["confidence_score"]) || 0) * 100).toFixed(2)}% de confiança</span>
                  )}
                  <p className="text-[#9799A6]">Analisado em {dataHora}</p>
                </div>
              </div>
            </div>
            <div className="bg-[#F2F0EB] p-7 flex flex-col gap-5">
              <div>
                <div className="flex flex-row items-center justify-between mb-5">
                  <h2 className="text-left text-2xl font-semibold">Classificação Fiscal</h2>
                  <button className="border-1 border-[#010A26] px-2 py-1 text-xl rounded-lg text-[#010A26]">
                    <FontAwesomeIcon icon={faPencil} />
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row justify-between">
                    <h3 className="text-xl font-medium">NCM:</h3>
                    <p className="text-lg">
                      {result?.result?.ncm ? result.result.ncm : "(Não encontrado)"}
                    </p>
                  </div>
                  <div className="flex flex-row justify-between">
                    <h3 className="text-xl font-medium">Exceção:</h3>
                    <p className="text-lg">
                      {result?.result?.exception ? result.result.exception : "(Não encontrado)"}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-row items-center justify-between mb-5">
                  <h2 className="text-left text-2xl font-semibold">Origem e Fabricação</h2>
                  <button className="border-1 border-[#010A26] px-2 py-1 text-xl rounded-lg text-[#010A26]">
                    <FontAwesomeIcon icon={faPencil} />
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row justify-between">
                    <h3 className="text-xl font-medium">Fabricante:</h3>
                    <p className="text-lg">
                      {result?.result?.fabricante ? result.result.fabricante : "(Não encontrado)"}
                    </p>
                  </div>
                  <div className="flex flex-row justify-between">
                    <h3 className="text-xl font-medium">País de Origem:</h3>
                    <p className="text-lg">
                      {result?.result?.pais ? result.result.pais : "(Não encontrado)"}
                    </p>
                  </div>
                  <div className="flex flex-row justify-between">
                    <h3 className="text-xl font-medium">Endereço:</h3>
                    <p className="text-lg">
                      {result?.result?.endereco ? result.result.endereco : "(Não encontrado)"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {result?.result && (
              <div className="p-7 bg-white rounded-b-lg">
                <div className="flex justify-between items-center w-full mb-8">
                  <h3 className="font-semibold text-2xl text-left">Descrição Detalhada para a Receita Federal</h3>
                  <div className="flex flex-row items-center gap-3">
                    <button className="border-1 border-[#0F3B57] px-2 py-1 text-3xl rounded-lg text-[#0F3B57]">
                      <FontAwesomeIcon icon={faPencil} />
                    </button>
                    <button className="border-1 border-[#0F3B57] px-2 py-1 text-3xl rounded-lg text-[#0F3B57]">
                      <FontAwesomeIcon icon={faCopy} />
                    </button>
                  </div>
                </div>
                <div className="bg-[#F2F0EB] rounded-lg mb-3 p-4">
                  <p className="text-[#082640] text-left">{result?.result?.description ? result.result.description : "(Não encontrado)"}</p>
                </div>
                <p className="text-left text-[#9799A6] text-sm mb-3">{result?.result?.description ? "Esta descrição foi gerada automaticamente para ser compreensível por um leigo, atendendo aos requisitos da Receita Federal para importação." : "(Não encontrado)"}</p>
              </div>
            )}
          </div>
          <div className="flex flex-row justify-end gap-4">
            <button className="bg-[#0F3B57] text-white text-base px-4 py-2 rounded-lg font-bold cursor-pointer">
              <FontAwesomeIcon icon={faFileExcel} className="mr-2" />
              Exportar para Excel
            </button>
            <button className="bg-[#0F3B57] text-white text-base px-4 py-2 rounded-lg font-bold cursor-pointer"
              onClick={() => navigate("/classification")}>
              <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-2" />
              Nova Análise
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassificationResult;
