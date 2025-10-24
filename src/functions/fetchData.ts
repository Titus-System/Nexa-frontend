import type Task from "../types/task";
import { API_URL } from "../config";

export async function FetchData(): Promise<Task[]> {
  try {
    const res = await fetch(`${API_URL}/tasks`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error(`Não foi possível obter o histórico (${res.status})`);
    }

    const data = (await res.json()) as { tasks: Task[] };

    return data.tasks;
  } catch (error) {
    if (error instanceof Error) {
      throw error; 
    } else {
      throw new Error("Erro desconhecido ao buscar tasks");
    }
  }
}
