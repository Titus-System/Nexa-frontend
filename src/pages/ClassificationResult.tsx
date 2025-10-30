import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useClassificationSocket } from "../hooks/useClassificatinoSocket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { SingleSuccessView } from "../components/SingleSuccessView";
import LoadingProgress from "../components/LoadingProgress";
import BatchSuccessView from "../components/BatchSuccessView";

const ClassificationResult: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const roomId = (location.state as { room_id: string })?.room_id;

  const { isConnected, status, singleResult, batchResult } = useClassificationSocket(roomId);

  const renderContent = () => {
    const failedResult = singleResult?.status === 'FAILED' ? singleResult : null;
    const failedBatch = batchResult?.status === 'FAILED' ? batchResult : null;
    const failedStatus = status?.status === 'FAILED' ? status : null;
    const error = failedResult || failedBatch || failedStatus;

    if (error) {
      return (
        <div className="w-full max-w-lg text-center flex flex-col items-center gap-4">
          <FontAwesomeIcon icon={faTriangleExclamation} className="text-red-500 text-5xl" />
          <h2 className="text-2xl font-bold text-[#010A26]">Ocorreu um Erro</h2>
          <p className="text-lg text-gray-700">{error.message}</p>
          <button
            onClick={() => navigate("/classification")}
            className="bg-[#0F3B57] text-white text-base mt-4 px-4 py-2 rounded-lg font-bold cursor-pointer"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-2" />
            Tentar Nova Análise
          </button>
        </div>
      );
    }

    if (singleResult?.status === 'DONE') {
      return <SingleSuccessView singleResult={singleResult} />
    }

    if (batchResult?.status === 'DONE') {
      return <BatchSuccessView {...batchResult} />
    }

    if (status && status?.status === 'PROCESSING') {
      return <LoadingProgress {...status} />
    }

    return (
      <div className="w-full max-w-lg text-center flex flex-col items-center gap-4">
        <FontAwesomeIcon icon={faSpinner} className="text-[#0F3B57] text-5xl animate-spin" />
        <p className="text-lg text-[#010A26]">
          {isConnected ? "Aguardando atualizações do servidor..." : "Conectando ao servidor..."}
        </p>
      </div>
    );
  };

  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-screen">
      <div className="mb-8 mt-24">
        <div className="flex flex-row items-center justify-center gap-5">
          <button className="bg-[#0F3B57] mb-[3%] rounded-[100%] py-2 px-1.5 flex justify-center items-center">
            <FontAwesomeIcon icon={faArrowLeft} className="text-white text-3xl" />
          </button>
          <h1 className="text-4xl font-bold mb-4 text-[#010A26]">Resultados da Análise</h1>
        </div>
          <p className="text-lg text-[#010A26]">Classificação fiscal automática concluída</p>
      </div>
      <div className="absolute top-6 left-6">
        <button
          onClick={() => navigate(-1)} // Para voltar à página anterior
          className="bg-[#0F3B57] rounded-full w-14 h-14 flex justify-center items-center"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-white text-2xl" />
        </button>
      </div>
      {renderContent()}
    </div>
  );

};

export default ClassificationResult;
