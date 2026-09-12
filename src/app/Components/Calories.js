export default function Calories({ remaining = 1420, total = 2000 }) {
  const percentage = (remaining / total) * 100;

  return (
    <div className="rounded-[28px] border border-[#e6eee6] bg-white p-6 shadow-[0_8px_25px_rgba(24,39,24,0.05)]">
      <div className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#4b5f4d]">
        <span>🔥</span>
        <span>Calories</span>
      </div>

      <div className="mb-1 flex items-end gap-2 text-[#1f2d1f]">
        <span className="text-4xl font-bold tracking-tight">{remaining.toLocaleString()}</span>
      </div>

      <p className="text-base text-[#5a6b5c]">
        of <span className="font-medium">{total.toLocaleString()} kcal</span>
      </p>

      <div className="mt-6 h-2.5 w-full overflow-hidden rounded-full bg-[#edf3ee]">
        <div
          className="h-full rounded-full bg-[#1b9c5b]"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      <p className="mt-2 text-right text-sm font-medium text-[#5a6b5c]">{Math.round(percentage)}%</p>
    </div>
  );
}