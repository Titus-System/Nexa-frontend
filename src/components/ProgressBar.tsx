interface ProgressBarProps {
  label: string;
  value: number;      // quantidade DONE
  total: number;      // quantidade TOTAL
}

export default function ProgressBar({ label, value, total }: ProgressBarProps) {
  const percent = total === 0 ? 0 : (value / total) * 100;

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Label + porcentagem */}
      <div className="flex justify-between items-center">
        <span className="font-semibold text-[#082640]">{label}</span>
        <span className="font-bold text-[#082640]">
          {percent.toFixed(1)}%
        </span>
      </div>

      {/* Barra */}
      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full bg-green-500 rounded-full transition-all duration-700"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
}
