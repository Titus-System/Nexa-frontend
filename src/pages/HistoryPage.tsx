import React, { useEffect, useState } from "react";
import type Task from "../types/task";
import { FetchData } from "../functions/fetchData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple, faTrashCan, faAngleDown, faDownload, faCircleExclamation, faSpinner, faMagnifyingGlass, faTable, faCalendarDays } from "@fortawesome/free-solid-svg-icons";

const HistoryPage: React.FC = () => {
  const [data, setData] = useState<Task[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [tasksCount, setTasksCount] = useState<number>(0);
  const [classificationsCount, setClassificationsCount] = useState<number>(0);
  const [oldestDate, setOldestDate] = useState<string>("Não disponível");
  const [newestDate, setNewestDate] = useState<string>("Não disponível");
  const [expandedTaskId, setExpandedTaskId] = useState<number | string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTypes, setIsOpenTypes] = useState(false);
  const [isOpenStatus, setIsOpenStatus] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Mais Recentes"); 
  const options = ["Mais Recentes", "Maior Confiança"];
  const [selectedOptionTypes, setSelectedOptionTypes] = useState("Todos os Tipos"); 
  const optionsTypes = ["Todos os Tipos", "Análises Únicas", "Análises Múltiplas"];
  const [selectedOptionStatus, setSelectedOptionStatus] = useState("Todos os Status"); 
  const optionsStatus = ["Todos os Status", "Apenas 'Sucesso'", "Apenas 'Em andamento'", "Apenas 'Falha'"];
  const [inputValue, setInputValue] = useState("");
  const [selectedFilterInput, setSelectedFilterInput] = useState<string | null>(null);
  const [showFiltersInput, setShowFiltersInput] = useState(false);
  const optionsFiltersInput = ["Partnumber", "NCM", "Fabricante", "País de origem"];
  const [searchResults, setSearchResults] = useState<Task[] | null>(null);
  
  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false); 
  };

  const handleSelectTypes = (option: string) => {
    setSelectedOptionTypes(option);
    setIsOpenTypes(false); 
  };

  const handleSelectStatus = (option: string) => {
    setSelectedOptionStatus(option);
    setIsOpenStatus(false); 
  };

  const handleSelectFilterInput = (filtro: string) => {
    setSelectedFilterInput(filtro);
    setShowFiltersInput(true);
    setInputValue("");
  };

  const handleRemoveFilter = () => {
    setSelectedFilterInput(null);
    setInputValue("");
  };

  useEffect(() => {
  if (selectedFilterInput === "Partnumber") {
    const searchTerm = inputValue.trim().toLowerCase();

    if (searchTerm === "") {
      setSearchResults([]);
      return;
    }

    // Filtra apenas as tasks que contenham o partnumber pesquisado
    const filteredTasks = (data ?? []).filter((task) =>
      task.classifications?.some((cls) =>
        cls.partnumber?.code?.toLowerCase().includes(searchTerm)
      )
    );

    setSearchResults(filteredTasks);
  } else {
    setSearchResults([]);
  }
}, [inputValue, selectedFilterInput, data]);


  useEffect(() => {
    async function loadData() {
      try {
        const tasks = await FetchData();
        setData(tasks);
        const quantityTasks = tasks.length;
        setTasksCount(quantityTasks);
        const quantityClassifications = tasks.reduce((acc, task) => {
          return acc + (task.classifications?.length || 0);
        }, 0);
      setClassificationsCount(quantityClassifications);
      if (tasks.length > 0) {
          // Extrai e ordena as datas válidas
          const sortedDates = tasks
            .map((t) => new Date(t.created_at))
            .filter((d) => !isNaN(d.getTime())) // ignora inválidas
            .sort((a, b) => a.getTime() - b.getTime()); // crescente
          if (sortedDates.length > 0) {
            const oldest = sortedDates[0];
            const newest = sortedDates[sortedDates.length - 1];
            // Função auxiliar de formatação
            const formatDate = (date: Date) => {
              const dd = String(date.getDate()).padStart(2, "0");
              const mm = String(date.getMonth() + 1).padStart(2, "0");
              const yyyy = date.getFullYear();
              return `${dd}/${mm}/${yyyy}`;
            };
            setOldestDate(formatDate(oldest));
            setNewestDate(formatDate(newest));
          }
        }
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
      <div className="flex flex-col gap-12">
        <div className="flex flex-row w-full px-10 justify-center gap-6">
          <div className="bg-white w-[33%] rounded-lg border border-solid pb-6 border-[#c0c1c9] shadow-[0_0_60px_rgba(0,0,0,0.15)]">
            <div className="flex flex-row justify-between p-3 items-center">
              <h2 className="font-semibold text-[#0F3B57] text-2xl">
                Total de Análises:
              </h2>
              <FontAwesomeIcon
                icon={faChartSimple}
                className="bg-[#F2F0EB] px-1 py-2 rounded-lg text-2xl text-[#0F3B57]"
              />
            </div>
            <div className="flex flex-row justify-start px-4 mt-3">
            <span className="text-3xl font-bold text-[#010A26]">{tasksCount}</span>
            </div>
          </div>
          <div className="bg-white w-[33%] rounded-lg border border-solid pb-6 border-[#c0c1c9] shadow-[0_0_60px_rgba(0,0,0,0.15)]">
            <div className="flex flex-row justify-between p-3 items-center">
              <h2 className="font-semibold text-[#0F3B57] text-2xl">
                Total de PartNumbers:
              </h2>
              <FontAwesomeIcon
                icon={faTable}
                className="bg-[#F2F0EB] px-1 py-2 rounded-lg text-2xl text-[#0F3B57]"
              />
            </div>
            <div className="flex flex-row justify-start px-4 mt-3">
              <span className="text-3xl font-bold text-[#010A26]">{classificationsCount}</span>
            </div>
          </div>
          <div className="bg-white w-[33%] rounded-lg border border-solid pb-6 border-[#c0c1c9] shadow-[0_0_60px_rgba(0,0,0,0.15)]">
            <div className="flex flex-row justify-between p-3 items-center">
              <h2 className="font-semibold text-[#0F3B57] text-2xl">
                Período das Análises:
              </h2>
              <FontAwesomeIcon icon={faCalendarDays} className="bg-[#F2F0EB] px-1 py-2 rounded-lg text-2xl text-[#0F3B57]"/>
            </div>
            <div className="flex flex-row justify-start px-4 mt-3">
              <span className="text-3xl font-bold text-[#010A26]">{oldestDate} - {newestDate}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-row px-10 items-center justify-between">
          <div className="w-[50%] relative">
            <div className="flex flex-row bg-white rounded-full items-center py-4 pl-4 pr-[4.2rem] gap-5" onClick={() => !selectedFilterInput && setShowFiltersInput(true)}>
            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-3xl"/>
            {selectedFilterInput && (
              <div className="flex items-center bg-[#F2F0EB] text-[#0F3B57] rounded-full px-3 py-1 text-sm font-medium">
                {selectedFilterInput}
                <button
                  onClick={handleRemoveFilter}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            )}
            <input type="text" className="text-[#9799A6] text-[1.1rem] w-[100%] border-none focus:outline-none focus:ring-0" placeholder="Buscar por Part Number, fabricante, NCM..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} disabled={!selectedFilterInput}></input>
          </div>
          {showFiltersInput && !selectedFilterInput && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-md z-10">
          {optionsFiltersInput.map((filtro) => (
            <button
              key={filtro}
              onClick={() => handleSelectFilterInput(filtro)}
              className="w-full text-left px-4 py-2 hover:bg-[#F2F0EB] text-[#0F3B57]"
            >
              {filtro}
            </button>
          ))}
        </div>
      )}
          </div>
          <div className="flex flex-row gap-3">
          {/* Botão do dropdown */}
          <div className="relative flex justify-center">
            <div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 bg-white text-[#0F3B57] font-semibold px-6 py-3 rounded-lg shadow hover:bg-[#f7f7f7] transition"
              >
                {selectedOption}
                <FontAwesomeIcon
                  icon={faAngleDown}
                  className={`transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown */}
              {isOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <ul className="py-2">
                    {options.map((option) => (
                      <li
                        key={option}
                        onClick={() => handleSelect(option)}
                        className={`px-4 py-2 cursor-pointer hover:bg-[#F2F0EB] ${
                          option === selectedOption ? "bg-[#F2F0EB] font-semibold" : ""
                        }`}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="relative flex justify-center">
            <div>
              <button
                onClick={() => setIsOpenTypes(!isOpenTypes)}
                className="flex items-center gap-2 bg-white text-[#0F3B57] font-semibold px-6 py-3 rounded-lg shadow hover:bg-[#f7f7f7] transition"
              >
                {selectedOptionTypes}
                <FontAwesomeIcon
                  icon={faAngleDown}
                  className={`transition-transform duration-300 ${
                    isOpenTypes ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown */}
              {isOpenTypes && (
                <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <ul className="py-2">
                    {optionsTypes.map((option) => (
                      <li
                        key={option}
                        onClick={() => handleSelectTypes(option)}
                        className={`px-4 py-2 cursor-pointer hover:bg-[#F2F0EB] ${
                          option === selectedOption ? "bg-[#F2F0EB] font-semibold" : ""
                        }`}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="relative flex justify-center">
            <div>
              <button
                onClick={() => setIsOpenStatus(!isOpenStatus)}
                className="flex items-center gap-2 bg-white text-[#0F3B57] font-semibold px-6 py-3 rounded-lg shadow hover:bg-[#f7f7f7] transition"
              >
                {selectedOptionStatus}
                <FontAwesomeIcon
                  icon={faAngleDown}
                  className={`transition-transform duration-300 ${
                    isOpenStatus ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown */}
              {isOpenStatus && (
                <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <ul className="py-2">
                    {optionsStatus.map((option) => (
                      <li
                        key={option}
                        onClick={() => handleSelectStatus(option)}
                        className={`px-4 py-2 cursor-pointer hover:bg-[#F2F0EB] ${
                          option === selectedOption ? "bg-[#F2F0EB] font-semibold" : ""
                        }`}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* Listagem de Tasks */}
      <div className="flex flex-col items-center mt-24 gap-3">
        {(() => {
    const listToRender =
      searchResults && searchResults.length > 0
        ? searchResults
        : data ?? [];

    // Se nenhuma lista tiver itens
    if (!listToRender || listToRender.length === 0) {
      return <p>Não há dados disponíveis.</p>;
    }

    // Caso haja tasks, renderiza normalmente
    return listToRender.map((task) => {
      const codes =
        task.classifications
          ?.map((c) => c.partnumber?.code)
          .filter((code): code is string => !!code) || [];

            // === Valores principais ===
            let confidence = "Não disponível";
            let ncm = "Não disponível";
            let exception = "Não disponível";
            let tax_rate = "Não disponível";
            let address = "Não disponível";
            let country = "Não disponível";
            let manufacturer = "Não disponível";
            let description = "Não disponível";

            const isSingle = codes.length === 1;

            if (isSingle) {
              // Caso de análise única
              const uniqueClassification = task.classifications?.[0];
              if (uniqueClassification) {
                confidence =
                  uniqueClassification.confidence_rate !== undefined
                    ? `${(uniqueClassification.confidence_rate * 100).toFixed(
                        1
                      )}%`
                    : "Não disponível";
                ncm =
                  uniqueClassification.tipi?.ncm?.code ?? "Não disponível";
                exception =
                  uniqueClassification.tipi?.ex ?? "Não disponível";
                tax_rate =
                  uniqueClassification.tipi?.tax.toString() ?? "Não disponível";
                address =
                  uniqueClassification.manufacturer?.address ?? "Não disponível";
                country =
                  uniqueClassification.manufacturer?.country ?? "Não disponível";
                manufacturer =
                  uniqueClassification.manufacturer?.name ?? "Não disponível";
                description =
                  uniqueClassification.long_description ?? "Não disponível";
              }
            } else {
              // Caso de análise múltipla
              const confidences =
                task.classifications
                  ?.map((c) =>
                    c.confidence_rate !== undefined
                      ? (c.confidence_rate * 100).toFixed(1)
                      : null
                  )
                  .filter(Boolean) || [];

              const ncms =
                task.classifications
                  ?.map((c) => c.tipi?.ncm?.code)
                  .filter((code): code is string => !!code) || [];

              const exceptions =
                task.classifications
                  ?.map((c) => c.tipi?.ex)
                  .filter((ex): ex is string => !!ex) || [];

              const tax_rates =
                task.classifications
                  ?.map((c) => c.tipi?.tax.toString())
                  .filter((tax): tax is string => !!tax) || [];

              const countries =
                task.classifications
                  ?.map((c) => c.manufacturer?.country)
                  .filter((country): country is string => !!country) || [];

              const adresses =
                task.classifications
                  ?.map((c) => c.manufacturer?.address)
                  .filter((ad): ad is string => !!ad) || [];

              const manufacturers =
                task.classifications
                  ?.map((c) => c.manufacturer?.name)
                  .filter((manu): manu is string => !!manu) || [];

              const descriptions =
                task.classifications
                  ?.map((c) => c.long_description)
                  .filter((desc): desc is string => !!desc) || [];

              console.log("Task múltipla:", task.id, {
                ncms,
                confidences,
                exceptions,
                tax_rates,
                adresses,
                countries,
                manufacturers,
                descriptions
              });
            }

            // Formata a data da task
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

            const taskStatus = task.status;
            let status = "";

            if (taskStatus == "DONE"){
              status = "Sucesso";
            }
            else if (taskStatus == "PROCESSING"){
              status = "Em andamento";
            }
            else if (taskStatus == "FAILED"){
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
                  }}>
                </div>
                <div className="ml-[1.3rem] w-full pl-9 pr-12 py-5">
                <div className="flex flex-row items-center justify-between">
                  <div>
                  <div className="mb-2 flex flex-row items-center gap-6">
                    {codes.length > 0 ? (
                      <>
                      {taskStatus === "DONE" ? (
                        <img src="/check-circle.svg" alt="icone_sucesso" className="w-[2.7rem]" />
                      ) : taskStatus === "PROCESSING" ? (
                        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-[#0F3B57]" />
                      ) : taskStatus === "FAILED" ? (
                        <FontAwesomeIcon icon={faCircleExclamation} className="text-red-500" />
                      ) : (
                        <FontAwesomeIcon icon={faCircleExclamation} className="text-gray-400" />
                      )};
                        <h1 className="text-2xl font-semibold text-[#010A26]">
                          {codes.length > 2
                            ? `${codes.slice(0, 2).join(", ")}, ...`
                            : codes.join(", ")}
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
                      <div className="flex flex-row gap-2">
                        <h3>Data:</h3>
                        <span>{formattedDate}</span>
                      </div>
                      {isSingle && (
                        <div className="flex flex-row gap-2">
                          <h3>Alíquota IPI:</h3>
                          <span>{tax_rate}%</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-row gap-4">
                      <div className="flex flex-row gap-2">
                        <h3>Status:</h3>
                        <span className={status == "Sucesso" ? "text-green-500" : status == "Em andamento" ? "text-[#0F3B57]" : "text-red-500"}>{status}</span>
                      </div>
                      {isSingle && (
                        <div className="flex flex-row gap-2">
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
                <div className="bg-[#F2F0EB] border-t border-[#ccc] text-[#0F3B57] px-15 py-10">
                  {isSingle ? (
                    // === Caso de análise única ===
                    <>
                      <div className="flex flex-col gap-4">
                        <h2 className="font-semibold text-2xl text-left text-[#010A26]">
                          Descrição Detalhada
                        </h2>
                        <p className="text-left text-[#9799A6] mb-8">{description}</p>
                      </div>
                      <div className="flex flex-row justify-between">
                        <div className="w-[25%]">
                          <h2 className="font-semibold text-2xl text-left mb-4 text-[#010A26]">
                            Classificação Fiscal
                          </h2>
                          <div className="flex flex-row text-lg justify-between">
                            <h3 className="font-medium text-[#010A26]">NCM:</h3>
                            <span className="text-[#9799A6]">{ncm}</span>
                          </div>
                          <div className="flex flex-row text-lg justify-between">
                            <h3 className="font-medium text-[#010A26]">Alíquota IPI:</h3>
                            <span className="text-[#9799A6]">{tax_rate}%</span>
                          </div>
                          <div
                            className={`flex flex-row text-lg justify-between ${
                              exception == "00" ? "hidden" : ""
                            }`}
                          >
                            <h3 className="font-medium text-[#010A26]">Exceção:</h3>
                            <span className="text-[#9799A6]">{exception}</span>
                          </div>
                        </div>
                        <div className="w-[25%]">
                          <h2 className="font-semibold text-2xl text-left mb-4 text-[#010A26]">
                            Origem e Fabricação
                          </h2>
                          <div className="flex flex-col gap-3">
                            <div className="flex flex-row text-lg justify-between">
                              <h3 className="font-medium text-[#010A26] text-left">
                                Fabricante:
                              </h3>
                              <span className="text-[#9799A6]">{manufacturer}</span>
                            </div>
                            <div className="flex flex-row text-lg justify-between">
                              <h3 className="font-medium text-[#010A26] text-left">
                                País de Origem:
                              </h3>
                              <span className="text-[#9799A6]">{country}</span>
                            </div>
                            <div className="flex flex-row text-lg justify-between">
                              <h3 className="font-medium text-[#010A26] text-left">
                                Endereço:
                              </h3>
                              <p className="text-[#9799A6]">{address}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    // === Caso de análise múltipla ===
                    <>
                      {task.classifications?.map((cls, index) => (
                        <div key={index} className="mb-10 pb-10 border-b border-[#cfcfcf] last:border-none last:pb-0">
                          <div className="flex flex-col gap-4 mb-4">
                            <h2 className="font-semibold text-2xl text-left text-[#010A26]">
                              Partnumber:{" "}
                              <span className="text-[#9799A6]">
                                {cls.partnumber?.code ?? "Não disponível"}
                              </span>
                            </h2>
                          </div>

                          <div className="flex flex-col gap-4">
                            <h3 className="font-semibold text-2xl text-left text-[#010A26]">
                              Descrição Detalhada
                            </h3>
                            <p className="text-left text-[#9799A6] mb-8">
                              {cls.long_description ?? "Não disponível"}
                            </p>
                          </div>

                          <div className="flex flex-row justify-between">
                            <div className="w-[25%]">
                              <h3 className="font-semibold text-2xl text-left mb-4 text-[#010A26]">
                                Classificação Fiscal
                              </h3>
                              <div className="flex flex-row text-lg justify-between">
                                <h3 className="font-medium text-[#010A26]">NCM:</h3>
                                <span className="text-[#9799A6]">
                                  {cls.tipi?.ncm?.code ?? "Não disponível"}
                                </span>
                              </div>
                              <div className="flex flex-row text-lg justify-between">
                                <h3 className="font-medium text-[#010A26]">Alíquota IPI:</h3>
                                <span className="text-[#9799A6]">
                                  {cls.tipi?.tax ?? "Não disponível"}%
                                </span>
                              </div>
                              {cls.tipi?.ex && cls.tipi.ex !== "00" && (
                                <div className="flex flex-row text-lg justify-between">
                                  <h3 className="font-medium text-[#010A26]">Exceção:</h3>
                                  <span className="text-[#9799A6]">{cls.tipi.ex}</span>
                                </div>
                              )}
                            </div>

                            <div className="w-[25%]">
                              <h3 className="font-semibold text-2xl text-left mb-4 text-[#010A26]">
                                Origem e Fabricação
                              </h3>
                              <div className="flex flex-col gap-3">
                                <div className="flex flex-row text-lg justify-between">
                                  <h3 className="font-medium text-[#010A26] text-left">
                                    Fabricante:
                                  </h3>
                                  <span className="text-[#9799A6]">
                                    {cls.manufacturer?.name ?? "Não disponível"}
                                  </span>
                                </div>
                                <div className="flex flex-row text-lg justify-between">
                                  <h3 className="font-medium text-[#010A26] text-left">
                                    País de Origem:
                                  </h3>
                                  <span className="text-[#9799A6]">
                                    {cls.manufacturer?.country ?? "Não disponível"}
                                  </span>
                                </div>
                                <div className="flex flex-row text-lg justify-between">
                                  <h3 className="font-medium text-[#010A26] text-left">
                                    Endereço:
                                  </h3>
                                  <p className="text-[#9799A6]">
                                    {cls.manufacturer?.address ?? "Não disponível"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )}
              </div>
            );
          });
        })()}
      </div>
    </div>
  );
};

export default HistoryPage;
