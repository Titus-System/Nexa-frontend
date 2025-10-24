import { useEffect, useState } from "react";
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
  result?: Record<string, string|number|boolean>;
};

export function useClassificationSocket(roomId: string) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [status, setStatus] = useState<StatusUpdate | null>(null);
  const [result, setResult] = useState<FinalResult | null>(null);
  const { addNotification } = useNotifications();

  useEffect(() => {
    const s = io(`${WEBSOCKET_URL}`);

    s.on("connected", (data) => {
      console.log("Connected with session id:", data.socket_session_id);
      s.emit("join", { room_id: roomId });
    });

    s.on("classification_update_status", (update: StatusUpdate) => {
      setStatus(update);
      addNotification(update.message, update.status === "failed" ? "error" : "info");
    });

    s.on("classification_finished", (final: FinalResult) => {
      setResult(final);
      addNotification(final.message, final.status === "done" ? "success" : "error");
    });

    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, [roomId]);

  return { socket, status, result };
}
