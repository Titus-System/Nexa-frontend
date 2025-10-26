import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { io, Socket } from "socket.io-client";
import { useNotifications } from "../context/NotificationContext";
import { WEBSOCKET_URL } from "../config";

type StatusUpdate = {
  status: "processing" | "done" | "failed";
  current?: number;
  total?: number;
  message: string;
};

type FinalResult = {
  status: "done" | "failed";
  message: string;
  partnumber?: string;
  result?: Record<string, string | number | boolean>;
};

type WebSocketContextType = {
  socket: Socket | null;
  joinRoom: (roomId: string) => void;
};

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [activeRooms, setActiveRooms] = useState<string[]>(() => {
    // Recupera rooms salvas no localStorage
    const saved = localStorage.getItem("activeRooms");
    return saved ? JSON.parse(saved) : [];
  });

  const { addNotification } = useNotifications();

  // Atualiza localStorage sempre que activeRooms mudar
  useEffect(() => {
    localStorage.setItem("activeRooms", JSON.stringify(activeRooms));
  }, [activeRooms]);

  // Conectar o WebSocket global
  useEffect(() => {
    const s = io(WEBSOCKET_URL);

    s.on("connect", () => {
      console.log("WebSocket conectado com ID:", s.id);
      // Reentrar em todas as rooms ativas
      activeRooms.forEach((roomId) => {
        s.emit("join", { room_id: roomId });
        console.log("Reconectou na room:", roomId);
      });
    });

    s.on("classification_update_status", (update: StatusUpdate) => {
      addNotification(update.message, update.status === "failed" ? "error" : "info");
    });

    s.on("classification_finished", (final: FinalResult) => {
      addNotification(final.message, final.status === "done" ? "success" : "error");
    });

    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, [addNotification, activeRooms]);

  // Entrar em uma nova room
  const joinRoom = (roomId: string) => {
    if (!roomId) return; // evita undefined
    if (socket && !activeRooms.includes(roomId)) {
      socket.emit("join", { room_id: roomId });
      setActiveRooms(prev => [...prev, roomId]);
      console.log("Entrou na room:", roomId);
    }
  };

  return (
    <WebSocketContext.Provider value={{ socket, joinRoom }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const ctx = useContext(WebSocketContext);
  if (!ctx) throw new Error("useWebSocket deve ser usado dentro de WebSocketProvider");
  return ctx;
};


