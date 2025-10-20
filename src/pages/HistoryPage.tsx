import React, { useEffect, useState } from "react";
import type Task from "../types/task";
import { FetchData } from "../functions/fetchData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";

const HistoryPage: React.FC = () => {

    const [data, setData] = useState<Task[] | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>
    return (
        <div className="mt-48">
            <div>
                <h1 className="text-4xl font-bold mb-4 text-[#010A26]">Histórico de Resultados</h1>
            </div>
            <div>
                <div className="flex flex-row w-full px-10 justify-center gap-6">
                    <div className="bg-white w-[30%] rounded-lg border border-solid border-[#c0c1c9] shadow-[0_0_60px_rgba(0,0,0,0.15)]">
                        <div className="flex flex-row justify-between p-3 items-center">
                            <h2 className="font-semibold text-[#0F3B57] text-2xl">Total de Análises:</h2>
                            <FontAwesomeIcon icon={faChartSimple} className="bg-[#F2F0EB] px-1 py-2 rounded-lg text-2xl text-[#0F3B57]"/>
                        </div>
                    </div>
                    <div className="bg-white w-[30%]">
                        <h2>Total de PartNumbers:</h2>
                    </div>
                    <div className="bg-white w-[30%]">
                        <h2>Período das Análises:</h2>
                    </div>
                </div>
                <div className="flex flex-row w-full px-10 justify-center gap-6">
                    
                </div>
            </div>
            <div>
            {data && data.length > 0 ? (
                data.map((task) => (
                <div key={task.id} className="bg-white p-4 mb-4 rounded shadow">
                    {/* Para cada classificação da task */}
                    {task.classifications?.map((classification, index) => {
                    const code = classification?.tipi?.partnumber?.code;
                    return (
                        <div key={index} className="mb-2">
                        {code ? (
                            <h1 className="text-2xl font-semibold text-[#010A26]">{code}</h1>
                        ) : (
                            <p className="text-gray-500 italic">Código não disponível</p>
                        )}
                        </div>
                    );
                    })}
                </div>
                ))
            ) : (
                <p>No data available.</p>
            )}
            </div>
        </div>
    );
};

export default HistoryPage;