import React from "react";
import { useNotifications } from "../context/NotificationContext";

const Notifications: React.FC = () => {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`px-4 py-2 rounded shadow text-white ${
            n.type === "success"
              ? "bg-green-600"
              : n.type === "error"
              ? "bg-red-600"
              : "bg-blue-600"
          }`}
        >
          <div className="flex justify-between items-center">
            <span>{n.message}</span>
            <button className="ml-2" onClick={() => removeNotification(n.id)}>
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
