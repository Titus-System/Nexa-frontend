import React from "react";
import { useLocation } from "react-router-dom";
import { useClassificationSocket } from "../hooks/useClassificatinoSocket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";

const ClassificationResult: React.FC = () => {
  // const { taskId } = useParams<{ taskId: string }>();
  const location = useLocation();
  const roomId = (location.state as { room_id: string })?.room_id;

  const { status, result } = useClassificationSocket(roomId);

  return (
    <div className="p-6 flex flex-col items-center">
      {/* <h1 className="text-xl font-bold mb-4">Resultado da Tarefa {taskId}</h1> */}
      <h1 className="text-4xl font-bold mb-4 text-[#010A26]">Resultados da Análise</h1>

      {!result && (
        <div>
          {status ? (
            <div>
              <p>Status: {status.status}</p>
              {status.current && status.total && (
                <p>Progresso: {status.current}/{status.total}</p>
              )}
              <p>Mensagem: {status.message}</p>
            </div>
          ) : (
            <p>Aguardando atualizações...</p>
          )}
        </div>
      )}

      {result && (
        <div className="mt-4 bg-white w-[70%] border-1 rounded-lg p-6">
          <div className="w-full">
            <div className="flex flex-row items-center gap-5">
              <img src="/check-circle.svg" alt="icone_sucesso" />
              <div className="flex flex-col flex-1 w-full min-w-0">
                <div className="flex justify-between items-center w-full">
                  <h2 className="font-bold text-3xl truncate">{result.partnumber}</h2>
                  <button className="border-1 px-2 text-2xl">
                    <FontAwesomeIcon icon={faCopy} />
                  </button>
                </div>
                <div className="flex flex-row">
                  {/* <span>{(result["confidence_score"] * 100).toFixed(2)}% de confiança</span> */}
                  <p>Analisado em</p>
                </div>
              </div>
            </div>
            <div className="bg-[#F2F0EB]">
              <div>
                <h2>Classificação Fiscal</h2>
                <div className="flex flex-row justify-between">
                  <h3>NCM:</h3>
                  {result?.result && (
                    <p>{result.result.ncm}</p>
                  )}
                </div>
                <div className="flex flex-row justify-between">
                  <h3>Exceção:</h3>
                  {result?.result && (
                    <p>{result.result.exception}</p>
                  )}
                </div>
              </div>
              <div>
                <h2>Origem e Fabricação</h2>
                <div className="flex flex-row justify-between">
                  <h3>Fabricante:</h3>
                  {result?.result && (
                    <p>{result.result.fabricante}</p>
                  )}
                </div>
                <div className="flex flex-row justify-between">
                  <h3>País de Origem:</h3>
                  {result?.result && (
                    <p>{result.result.pais}</p>
                  )}
                </div>
                <div className="flex flex-row justify-between">
                  <h3>Endereço:</h3>
                  {result?.result && (
                    <p>{result.result.endereco}</p>
                  )}
                </div>
              </div>
            </div>
            <div>
              <h3>Descrição Detalhada para a Receita Federal</h3>
              {result?.result && (
                    <p>{result.result.description}</p>
                  )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassificationResult;
