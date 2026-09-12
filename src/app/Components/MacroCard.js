export default function MacroCard({ name, current, target, unit = "g" }) {
  const curr = Number(current) || 0;
  const trg = Number(target) || 1;
  const percentage = (curr / trg) * 100;

  return (
    <div className="rounded-[24px] border border-[#e6eee6] bg-white p-5 shadow-[0_8px_25px_rgba(24,39,24,0.04)]">
      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#4b5f4d]">{name}</p>

      <div className="mt-6 flex items-end justify-between gap-3">
        <p className="text-3xl font-bold tracking-tight text-[#1f2d1f]">{curr}</p>
        <p className="pb-1 text-base text-[#5a6b5c]">
          / {trg}
          {unit}
        </p>
      </div>

      <div className="mt-5 h-2.5 w-full overflow-hidden rounded-full bg-[#edf3ee]">
        <div
          className="h-full rounded-full bg-[#7bcf7d]"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>

      <p className="mt-3 text-sm font-medium text-[#5a6b5c]">
        {Math.round(percentage)}% of daily goal
      </p>
    </div>
  );
}
