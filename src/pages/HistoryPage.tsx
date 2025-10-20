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
                    <div className="bg-white w-[30%]">
                        <h2 className="font-semibold text-[#0F3B57]">Total de Análises:</h2>
                        <FontAwesomeIcon icon={faChartSimple} />
                    </div>
                    <div className="bg-white w-[30%]">
                        <h2>Total de PartNumbers:</h2>
                    </div>
                    <div className="bg-white w-[30%]">
                        <h2>Período das Análises:</h2>
                    </div>
                </div>
            </div>
            <div>
                {data ? (
                    data.map((task) => (
                        <div key={task.id} className="bg-white">
                            <p>{task.id}</p>
                        </div>
                    ))) : (
                        <p>No data available.</p>
                    )
                }
            </div>
        </div>
    );
};

export default HistoryPage;