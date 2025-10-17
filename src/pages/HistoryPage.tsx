import React, { useEffect, useState } from "react";
import type Task from "../types/task";

const HistoryPage: React.FC = () => {

    const [data, setData] = useState<Task[] | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(()=>{
        const fetchData =async ()=> {
            try {
                const res = await fetch("http://localhost:5000/tasks", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                
                if (!res.ok) {
                    throw new Error(`Não foi possível obter o histórico ${res.status}`);
                }
                const data = await res.json() as {'tasks': Task[]};
                setData(data.tasks);
            } catch(error) {
                if (error instanceof Error) {
                    setError(error);
                    // alert(error)
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>
    return (
        <div>
            <h1 className="text-[2.9rem] font-bold mb-6 text-[#010A26]">Histórico de Resultados</h1>
            <div className="bg-white">
                {data ? (
                    data.map((task) => (
                        <div key={task.id}>
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