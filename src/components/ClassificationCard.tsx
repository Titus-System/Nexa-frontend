import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faDownload,
  faTrashCan,
  faCircleExclamation,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import type Task from "../types/task";
import type Classification from "../types/classification";

// --- Tipos e Interfaces ---
interface ClassificationCardProps {
  task: Task;
}

interface SingleCardProps {
  classification: Classification;
  taskStatus: Task["status"];
  taskCreatedAt: Task["created_at"];
}

// --- Componente de Item de Informação Reutilizável ---
// Para evitar repetição de código em pares de "Rótulo: Valor"
const InfoItem = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex items-center gap-2">
    <h3 className="font-medium">{label}:</h3>
    <span>{children}</span>
  </div>
);


// --- Componente para um único Card de Classificação ---
// Agora cada card gerencia seu próprio estado e lógica.
const SingleClassificationCard = ({ classification, taskStatus, taskCreatedAt }: SingleCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Mapeamento centralizado para status, evitando condicionais repetidas
  const statusConfig = {
    DONE: {
      text: "Sucesso",
      color: "text-green-500",
      icon: <img src="/check-circle.svg" alt="Sucesso" className="w-10 h-10" />, // Use w-10 h-10 for size consistency
    },
    PROCESSING: {
      text: "Em andamento",
      color: "text-[#0F3B57]",
      icon: <FontAwesomeIcon icon={faSpinner} className="text-4xl text-[#0F3B57]" spin />,
    },
    ERROR: {
      text: "Erro",
      color: "text-red-500",
      icon: <FontAwesomeIcon icon={faCircleExclamation} className="text-4xl text-red-500" />,
    },
  };

  const { id, partnumber, long_description, tipi, manufacturer, confidence_rate } = classification;
  
  // Define o status atual, com um fallback para 'ERROR'
  const currentStatus = statusConfig[taskStatus as keyof typeof statusConfig] || statusConfig.ERROR;
  const formattedDate = new Date(taskCreatedAt).toLocaleString("pt-BR");

  return (
    <div key={id} className="relative bg-white mb-4 shadow w-[94.7%] rounded-lg overflow-hidden">
      <div
        className="absolute left-0 top-0 bottom-0 w-[1.3rem] rounded-tl-lg rounded-bl-lg"
        style={{ background: "linear-gradient(to bottom, #010A26 20%, #0E4371 50%, #010A26 100%)" }}
      />

      <div className="ml-[1.3rem] w-full">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-5 pl-9 pr-12">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {currentStatus.icon}
              <h1 className="text-2xl font-semibold text-[#010A26]">{partnumber.code}</h1>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-700">
              <InfoItem label="Data">{formattedDate}</InfoItem>
              <InfoItem label="Status">
                <span className={currentStatus.color}>{currentStatus.text}</span>
              </InfoItem>
              <InfoItem label="NCM">{tipi.ncm.code}</InfoItem>
              <InfoItem label="Alíquota IPI">{tipi.tax}%</InfoItem>
            </div>
          </div>
          
          <div className="flex flex-row items-center gap-6 self-end md:self-auto">
            <button aria-label="Download"><FontAwesomeIcon icon={faDownload} className="text-3xl text-gray-600 hover:text-gray-800" /></button>
            <button aria-label="Delete"><FontAwesomeIcon icon={faTrashCan} className="text-3xl text-red-500 hover:text-red-700" /></button>
            <button aria-label="Expand" onClick={() => setIsExpanded(!isExpanded)}>
              <FontAwesomeIcon
                icon={faAngleDown}
                className={`text-3xl cursor-pointer transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="bg-[#F2F0EB] border-t border-[#ccc] px-8 sm:px-12 py-10">
            <div className="mb-8">
              <h2 className="font-semibold text-2xl text-left text-[#010A26]">Descrição Detalhada</h2>
              <p className="mt-2 text-left text-[#2d2c31]">{long_description}</p>
            </div>
            
            <div className="flex flex-col lg:flex-row justify-between gap-10">
              {/* Coluna: Classificação Fiscal */}
              <div className="w-full lg:flex-1">
                <h2 className="font-semibold text-2xl text-left mb-4 text-[#010A26]">Classificação Fiscal</h2>
                <div className="flex flex-col gap-2 text-lg">
                  <div className="flex justify-between"><h3 className="font-medium text-[#010A26]">NCM:</h3><span className="text-[#2d2c31]">{tipi.ncm.code}</span></div>
                  <div className="flex justify-between"><h3 className="font-medium text-[#010A26]">Alíquota IPI:</h3><span className="text-[#2d2c31]">{tipi.tax}%</span></div>
                  {tipi.ex !== "00" && <div className="flex justify-between"><h3 className="font-medium text-[#010A26]">Exceção:</h3><span className="text-[#2d2c31]">{tipi.ex}</span></div>}
                </div>
              </div>
              
              {/* Coluna: Origem e Fabricação */}
              <div className="w-full lg:flex-1">
                <h2 className="font-semibold text-2xl text-left mb-4 text-[#010A26]">Origem e Fabricação</h2>
                <div className="flex flex-col gap-3 text-lg">
                  <div className="flex justify-between"><h3 className="font-medium text-[#010A26]">Fabricante:</h3><span className="text-[#2d2c31]">{manufacturer.name}</span></div>
                  <div className="flex justify-between"><h3 className="font-medium text-[#010A26]">País:</h3><span className="text-[#2d2c31]">{manufacturer.country}</span></div>
                  <div className="flex justify-between text-left gap-4"><h3 className="font-medium text-[#010A26]">Endereço:</h3><p className="text-[#2d2c31] text-right">{manufacturer.address}</p></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


// --- Componente Principal Exportado ---
// A responsabilidade dele é apenas iterar sobre as classificações da task.
export default function ClassificationCard({ task }: ClassificationCardProps) {
  // Retorna um fragmento com um card para cada classificação da tarefa
  return (
    <>
      {task.classifications.map((classification: Classification) => (
        <SingleClassificationCard
          key={classification.id}
          classification={classification}
          taskStatus={task.status}
          taskCreatedAt={task.created_at}
        />
      ))}
    </>
  );
}