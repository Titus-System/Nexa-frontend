import toast from "react-hot-toast";


export interface SingleClassification {
    partnumber: string | null;
    ncm: string | null;
    description: string | null;
    exception: string | null;
    nve: string | null;
    fabricante: string | null;
    endereco: string | null;
    supplier: string | null;
}


export interface SingleClassificationResponse {
    status: string;
    message: string;
    partnumber: string;
    result: SingleClassification
}


interface NotificationCardProps {
    toastId: string;
    data: SingleClassificationResponse | null;
}

export function NotificationCard({ toastId, data }: NotificationCardProps) {
  const handleOpen = () => {
    localStorage.setItem("classificationData", JSON.stringify(data));
    window.open(`/classification/result`, "_blank");
  };

  return (
    <div className="p-4 bg-green-600 text-white rounded-lg shadow-lg flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-bold text-lg">Classificação finalizada!</h4>
          <p>Seu resultado está pronto.</p>
        </div>
        <button
          onClick={() => toast.dismiss(toastId)}
          className="ml-4 text-white hover:text-gray-200 font-bold"
        >
          ✕
        </button>
      </div>
      <button
        onClick={handleOpen}
        className="underline hover:text-blue-200 mt-2 text-left"
      >
        Ver resultado
      </button>
    </div>
  );
}