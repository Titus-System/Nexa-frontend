import { io, type Socket } from "socket.io-client";
import { API_URL, WEBSOCKET_URL } from "../config";
import toast from "react-hot-toast";
import { NotificationCard } from "../components/NotificationCard";

type SingleClassificationRequest = {
    partnumber: string,
    description: string,
    manufacturer: string,
    supplier: string
}

class WebSocketService {
    private socket: Socket | null = null;

    connect() {
        if (!this.socket) {
            this.socket = io(WEBSOCKET_URL);

            this.socket.on('connect', () => {
                console.log(`Conectado ao websocket com ID: ${this.socket!.id}`);
                toast.success('Conectado ao WebSocket', { duration: 3000, position: 'bottom-right' });
            });

            this.socket.on('disconnect', () => {
                console.log('WebSocket desconectado');
                toast.error('Desconectado do WebSocket', { duration: 3000, position: 'bottom-right' });
                this.socket = null;
            });
        }
    }

    private async initiateClassification(
        data: SingleClassificationRequest,
        sessionId: string
    ) {
        const response = await fetch(`${API_URL}/classify-partnumber`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data, socket_session_id: sessionId }),
        });

        if (response.status !== 202) {
            throw new Error('Falha ao iniciar classificação.');
        }

        const res = await response.json();
        console.log(res);
        console.log(`Tarefa iniciada. Inscrevendo-se na sala: ${res.room_id}`);

        this.socket!.emit('join', { room_id: res.room_id });

        this.setupListeners();
    }

    private setupListeners() {
        this.socket!.on('classification_update_status', (data) => {
            console.log(`UPDATE: ${JSON.stringify(data)}`);
            toast('Atualização de status recebida', {
                className: 'bg-blue-600 text-white p-4 rounded-lg shadow-lg',
                icon: '🔄',
            });
        });

        this.socket!.on('classification_finished', (data) => {
            console.log(`FINISHED: ${JSON.stringify(data)}`);

            toast.custom(() => NotificationCard({ toastId: data.room_id, data }), {
                duration: Infinity,
                position: 'bottom-right'
            })

            this.socket!.disconnect();
        });
    }

    async startClassificationProcess(data: Omit<SingleClassificationRequest, 'socket_session_id'>) {
        if (!this.socket || !this.socket.connected) {
            this.connect();
        }

        return new Promise<void>((resolve, reject) => {
            this.socket!.once('connect', async () => {
                try {
                    await this.initiateClassification(data, this.socket!.id!);
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        });
    }
}


export const wsService = new WebSocketService();