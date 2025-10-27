import {io} from 'socket.io-client'

const WEBSOCKET_URL = "ws://127.0.0.1:5000";
const API_URL = 'http://localhost:5000/classify-partnumber';

const socket = io(WEBSOCKET_URL);

async function startClassificationProcess(partnumber:string) {
    socket.on('connect', () => {
        console.log(`conectado ao websocket com ID: ${socket.id}`);
        initiateClassification(partnumber, socket.id!);
    })
}

async function initiateClassification(partnumber:string, sessionId: string) {
    try{
        const response = await fetch(`${API_URL}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                partnumber: partnumber,
                description: "descrição do produto",
                manufacturer: "fabricante do produto",
                supplier: "fornecedor do produto",
                socket_session_id: sessionId
            })
        });

        if (response.status != 202) {
            throw new Error("Falha ao iniciar classificação.")
        }

        // const {room_id} = await response.json();
        const res = await response.json()
        console.log(res);
        console.log(`Tarefa iniciada. Inscrevendo-se na sala: ${res.room_id}`);

        socket.emit('join', {room_id: res.room_id});

        setupListeners();

    } catch (error) {
        console.error("Erro no pedido de classificação: ", error)
    }
}

async function setupListeners() {
    socket.on('classification_update_status', (data) => {
        console.log(`UPDATE: ${JSON.stringify(data)}`);
    });

    socket.on('classification_finished', (data) => {
        console.log(`FINISHED: ${JSON.stringify(data)}`);
        socket.disconnect();
    });
}

startClassificationProcess("PN-TS-TEST-12345");