import React, { useEffect, useState } from "react";
import type Task from "../types/task";
import { FetchData } from "../functions/fetchData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple, faTrashCan, faAngleDown, faDownload, faCircleExclamation, faSpinner } from "@fortawesome/free-solid-svg-icons";

const HistoryPage: React.FC = () => {
  const [data, setData] = useState<Task[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedTaskId, setExpandedTaskId] = useState<number | string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const tasks = await FetchData();
        setData(tasks);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);
  console.log(data)

  const toggleExpand = (id: number | string) => {
    setExpandedTaskId((prev) => (prev === id ? null : id));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="mb-28">
      <div className="mt-48 mb-24 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4 text-[#010A26]">
          Histórico de Resultados
        </h1>
        <p className="text-xl text-[#9799A6] w-[60%]">
          Acesse todas as suas classificações fiscais anteriores em um só lugar.
          Consulte, exporte e reutilize análises para agilizar processos de
          importação.
        </p>
      </div>

      {/* Painéis superiores */}
      <div>
        <div className="flex flex-row w-full px-10 justify-center gap-6">
          <div className="bg-white w-[33%] rounded-lg border border-solid border-[#c0c1c9] shadow-[0_0_60px_rgba(0,0,0,0.15)]">
            <div className="flex flex-row justify-between p-3 items-center">
              <h2 className="font-semibold text-[#0F3B57] text-2xl">
                Total de Análises:
              </h2>
              <FontAwesomeIcon
                icon={faChartSimple}
                className="bg-[#F2F0EB] px-1 py-2 rounded-lg text-2xl text-[#0F3B57]"
              />
            </div>
          </div>
          <div className="bg-white w-[33%]">
            <h2 className="font-semibold text-[#0F3B57] text-2xl">
              Total de PartNumbers:
            </h2>
            <FontAwesomeIcon icon={faChartSimple} />
          </div>
          <div className="bg-white w-[33%]">
            <h2 className="font-semibold text-[#0F3B57] text-2xl">
              Período das Análises:
            </h2>
            <FontAwesomeIcon icon={faChartSimple} />
          </div>
        </div>
      </div>

      {/* Listagem de Tasks */}
      <div className="flex flex-col items-center mt-10">
        {data && data.length > 0 ? (
          data.map((task) => {
            const codes =
              task.classifications
                ?.map((c) => c.partnumber?.code)
                .filter((code): code is string => !!code) || [];

                const sortedClassifications = task.classifications
                ? [...task.classifications].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
  : [];

            const latestClassification = sortedClassifications[0];

            const confidence = latestClassification?.confidence_rate !== undefined ? 
            `${(latestClassification.confidence_rate * 100).toFixed(1)}%`
            : "Não disponível";

            const ncm = latestClassification?.tipi?.ncm?.code !== undefined ?
            `${latestClassification?.tipi?.ncm?.code}` : "Não disponível";

            // Formata a data da classificação mais recente
            let formattedDate = "Não disponível";

            if (task.created_at) {
              const d = new Date(task.created_at);
              const dd = String(d.getDate()).padStart(2, "0");
              const mm = String(d.getMonth() + 1).padStart(2, "0");
              const yyyy = d.getFullYear();
              const hh = String(d.getHours()).padStart(2, "0");
              const min = String(d.getMinutes()).padStart(2, "0");
              formattedDate = `${dd}/${mm}/${yyyy} às ${hh}:${min}`;
            }

            const isSingle = codes.length === 1;

            const teskStatus = task.status;
            let status = "";

            if (teskStatus == "DONE"){
              status = "Sucesso";
            }
            else if (teskStatus == "PROCESSING"){
              status = "Em andamento";
            }
            else if (teskStatus == "FAILED"){
              status = "Falha";
            }
            else {
              status = "Não disponível";
            };

            return (
              <div
                key={task.id}
                className="relative bg-white mb-4 shadow w-[94.7%] rounded-lg overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-[1.3rem] rounded-tl-lg rounded-bl-lg"
  style={{
    background: "linear-gradient(to bottom, #010A26 20%, #0E4371 50%, #010A26 100%)"
  }}></div>
                <div className="ml-[1.3rem] w-full pl-9 pr-12 py-5">
                <div className="flex flex-row items-center justify-between">
                  <div>
                  <div className="mb-2 flex flex-row items-center gap-6">
                    {codes.length > 0 ? (
                      <>
                      {status == "Sucesso" ?
                      <img src="/check-circle.svg" alt="icone_sucesso" className="w-[2.7rem]" /> :
                      status == "Em andamento" ? 
                      <FontAwesomeIcon icon={faCircleExclamation} /> :
                      <FontAwesomeIcon icon={faSpinner} />
                      };
                        <h1 className="text-2xl font-semibold text-[#010A26]">
                          {codes.join(", ")}
                        </h1>
                        <span
                          className="text-sm px-7 py-1 font-medium rounded-full text-[#0F3B57] bg-[#F2F0EB]"
                        >
                          {codes.length === 1 ? "Única" : "Múltipla"}
                        </span>
                      </>
                    ) : (
                      <p className="text-gray-500 italic">
                        Código não disponível
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-row gap-4">
                      <div className="flex flex-row">
                        <h3>Data:</h3>
                        <span>{formattedDate}</span>
                      </div>
                      {isSingle && (
                        <div className="flex flex-row">
                          <h3>Confiança:</h3>
                          <span>{confidence}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-row gap-4">
                      <div className="flex flex-row">
                        <h3>Status:</h3>
                        <span className={status == "Sucesso" ? "text-green-500" : status == "Em andamento" ? "text-[#0F3B57]" : "text-red-500"}>{status}</span>
                      </div>
                      {isSingle && (
                        <div className="flex flex-row">
                          <h3>NCM:</h3>
                          <span>{ncm}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  </div>
                  <div className="flex flex-row gap-6">
                    <FontAwesomeIcon icon={faDownload} className="text-3xl"/>
                    <FontAwesomeIcon icon={faTrashCan} className="text-3xl text-red-500"/>
                    <FontAwesomeIcon
                        icon={faAngleDown}
                        className={`text-3xl cursor-pointer transition-transform duration-300 ${
                          expandedTaskId === task.id ? "rotate-180" : ""
                        }`}
                        onClick={() => toggleExpand(task.id)}
                      />
                  </div>
                </div>
                </div>
                {/* Seção expandida */}
                {expandedTaskId === task.id && (
                  <div className="bg-[#F2F0EB] px-12 py-6 border-t border-[#ccc] text-[#0F3B57]">
                    <p>🔍 Seção expandida — detalhes da task vão aqui futuramente.</p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p>Não há dados disponíveis.</p>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
