import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { useClassificationSocket } from "../hooks/useClassificatinoSocket";
const ClassificationResult: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const location = useLocation();
  const roomId = (location.state as { room_id: string })?.room_id;

  const { status, result } = useClassificationSocket(roomId);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Resultado da Tarefa {taskId}</h1>

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
        <div className="mt-4">
          <h2 className="font-bold">Resultado Final</h2>
          <pre className="bg-gray-100 p-4 rounded mt-2">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ClassificationResult;
