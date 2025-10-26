import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useNotifications } from "../context/NotificationContext";
import type Classification from "../types/classification";
import { WEBSOCKET_URL } from "../config";

export type StatusUpdate = {
  status: "PROCESSING" | "DONE" | "FAILED";
  current?: number;
  total?: number;
  message: string;
};

export type FinalResult = {
  status: "DONE" | "FAILED";
  message: string;
  partnumber?: string;
  result?: Record<string, string|number|boolean>;
};

export type BatchDoneData = {
  status: string;
  message: string;
  partnumbers?: string[] | null;
  result?: Record<string, Classification[]> | null;
  room_id?: string | null;
  task_id?: string | null;
}

export function useClassificationSocket(roomId: string) {
  const [socket, setSocket] = useState<Socket | null>(null);
  // NOVO: Estado para saber se a conexão está ativa
  const [isConnected, setIsConnected] = useState(false); 
  const [status, setStatus] = useState<StatusUpdate | null>(null);
  const [singleResult, setResult] = useState<FinalResult | null>(null);
  const [batchResult, setBatchResult] = useState<BatchDoneData | null>();
  const { addNotification } = useNotifications();

  useEffect(() => {
    const s = io(`${WEBSOCKET_URL}`);

    // Evento padrão do Socket.IO para quando a conexão é estabelecida
    s.on("connect", () => {
      console.log("Socket connected successfully.");
      setIsConnected(true);
      // Solicita para entrar na sala após conectar
      s.emit("join", { room_id: roomId });
    });
    
    // Tratamento de erro de conexão
    s.on("connect_error", (err) => {
      console.error("Connection failed:", err.message);
      setIsConnected(false);
      addNotification("Falha na conexão com o servidor.", "error");
    });
    
    // Evento padrão para desconexão
    s.on("disconnect", () => {
      console.log("Socket disconnected.");
      setIsConnected(false);
    });

    // Seu evento customizado de backend
    s.on("connected", (data) => {
      console.log("Joined room with session id:", data.socket_session_id);
    });

    s.on("classification_update_status", (update: StatusUpdate) => {
      console.log(`Status update event received: ${update.current} / ${update.total}`);
      setStatus(update);
      // Evita notificar o usuário a cada passo do progresso
      if (update.status === "FAILED") {
        addNotification(update.message, "error");
      }
    });

    s.on("classification_finished", (final: FinalResult) => {
      console.log(`Single classification finished event received`);
      setResult(final);
      addNotification(final.message, final.status === "DONE" ? "success" : "error");
    });

    s.on("batch_classification_finished", (data: BatchDoneData) => {
      console.log("Batch classification finished event received: ", data);
      setBatchResult(data);
      addNotification(data.message, data.status === "DONE" ? "success" : "error");
    });

    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, [roomId, addNotification]); // Adicionado addNotification às dependências

  // Retorna o novo estado
  return { socket, isConnected, status, singleResult, batchResult };
}