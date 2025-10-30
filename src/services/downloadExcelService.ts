import { API_URL } from "../config";

export const downloadExcelByTask = async (task_id?: string) => {
    try {
        const response = await fetch(`${API_URL}/export-excel?task_id=${task_id}`, {
            method: "GET",
        });

        if (!response.ok) throw new Error("Falha ao exportar o arquivo Excel");

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `produtos_${task_id}.xlsx`; // nome do arquivo
        document.body.appendChild(a);
        a.click();
        a.remove();

        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error(error);
        alert("Erro ao fazer download do Excel.");
    }
};