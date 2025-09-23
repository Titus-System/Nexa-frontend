import toast from "react-hot-toast";

interface NotificationCardProps {
    roomId: string;
    toastId: string;
}

export function NotificationCard({ roomId, toastId }: NotificationCardProps) {
    const handleClose = () => {
        toast.dismiss(toastId); // fecha o toast
    };

    return (
        <div className="p-4 bg-green-600 text-white rounded-lg shadow-lg flex flex-col gap-2">
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="font-bold text-lg">Classificação finalizada!</h4>
                    <p>Seu resultado está pronto.</p>
                </div>
                <button
                    onClick={handleClose}
                    className="ml-4 text-white hover:text-gray-200 font-bold"
                >
                    ✕
                </button>
            </div>
            <a
                href={`/classification/result/${roomId}`}
                className="underline hover:text-blue-200 mt-2"
                target="_blank"
                rel="noopener noreferrer"
            >
                Ver resultado
            </a>
        </div>
    );
}