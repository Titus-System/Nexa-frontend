import type { StatusUpdate } from "../hooks/useClassificatinoSocket";

export default function LoadingProgress({status, current, total, message}: StatusUpdate) {
    const progress = (current && total) ? (current / total) * 100 : 0;
    return (
        <div className="w-full max-w-lg text-center">
            <p className="text-lg font-semibold mb-3 text-[#090F20] mb-8">Análise de partnumbers em andamento...</p>
            <p className="text-lg font-semibold mb-3 text-[#010A26]">{message}</p>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2 overflow-hidden">
                <div
                    className="bg-[#0F3B57] h-4 rounded-full transition-all duration-300 ease-in-out"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            {current !== undefined && total !== undefined && (
                <p className="text-md text-gray-600">
                    {current} / {total}
                </p>
            )}
        </div>
    );
}