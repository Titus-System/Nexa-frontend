import { API_URL } from "../config";
import type Task from "../types/task";

export default class TaskService {
    url: string

    constructor() {
        this.url = `${API_URL}/tasks`
    }

    async getTaskById(id: string) {
        try {
            const response = await fetch(`${this.url}?task_id=${id}`, {
                method: `GET`,
                headers: { "Content-Type": "application/json" }
            });
            if (!response.ok) {
                throw new Error(`Erro ao buscar task em Nexa API. Status da resposta: ${response.status}`);
            }
            const result = await response.json();
            console.log(`Resposta recebida de Nexa API: ${result}`);
            return result.tasks[0] as Task;
        } catch (e) {
            console.error(e);
        }
    }


}