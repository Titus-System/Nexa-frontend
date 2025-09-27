import React from "react";
import { useLocation } from "react-router-dom";
import { useClassificationSocket } from "../hooks/useClassificatinoSocket";
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
          <div>
            <div className="flex flex-row items-center gap-5">
              <img src="/check-circle.svg" alt="icone_sucesso" />
              <div className="flex flex-col">
                <h2 className="font-bold text-3xl">{result.partnumber}</h2>
                <div className="flex flex-row">
                  {/* <span>{(result["confidence_score"] * 100).toFixed(2)}% de confiança</span> */}
                  <p>Analisado em</p>
                </div>
              </div>
            </div>
          </div>
            {JSON.stringify(result, null, 2)}
        </div>
      )}
    </div>
  );
};

export default ClassificationResult;
