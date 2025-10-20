import type Task from "../types/task";

export async function FetchData(): Promise<Task[]> {
  try {
    const res = await fetch("http://localhost:5000/tasks", {
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
