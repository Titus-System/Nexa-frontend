import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import type { BatchDoneData } from "../hooks/useClassificatinoSocket";
import TaskService from "../services/taskServices";
import type Task from "../types/task";
import ClassificationCard from "./ClassificationCard";
import { downloadExcelByTask } from "../services/downloadExcelService";

export default function BatchSuccessView(batchResult: BatchDoneData) {
    const navigate = useNavigate();
    const service = new TaskService();
    const [taskData, setTaskData] = useState<Task>();

    useEffect(() => {
        const fetchTask = async () => {
            if (!batchResult.task_id) return;
            const data = await service.getTaskById(batchResult.task_id);
            console.log("taskData recebido:", data);
            setTaskData(data);
        };
        fetchTask();
    }, [batchResult.task_id]);

    const downloadExcel = async () => {
        downloadExcelByTask(taskData?.id)
    };

    if (!batchResult.task_id) {
        return null;
    }

    return (
        <div className="w-full max-w-5xl text-center">
            <img
                src="/check-circle.svg"
                alt="icone_sucesso"
                className="w-16 mx-auto mb-8"
            />
            <h2 className="text-2xl font-bold text-[#010A26]">
                Classificação em Lote Concluída
            </h2>
            <p className="text-lg text-gray-700 mb-8">{batchResult.message}</p>

            {taskData && (
                <ClassificationCard task={taskData} />
            )}

            <div className="mt-8 flex flex-row justify-end gap-4">
                <button className="bg-[#0F3B57] text-white text-base px-4 py-2 rounded-lg font-bold cursor-pointer"
                    onClick={downloadExcel}
                >
                    <FontAwesomeIcon icon={faFileExcel} className="mr-2" />
                    Exportar para Excel
                </button>
                <button className="bg-[#0F3B57] text-white text-base px-4 py-2 rounded-lg font-bold cursor-pointer"
                    onClick={() => navigate("/classification")}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-2" />
                    Nova Análise
                </button>
            </div>
        </div>
    );
}
