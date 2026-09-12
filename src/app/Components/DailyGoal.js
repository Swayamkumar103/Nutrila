export default function DailyGoal({ remaining = 580, target = 2000 }) {
  const percentage = ((target - remaining) / target) * 100;

  return (
    <div className="rounded-[28px] border border-[#e6eee6] bg-white p-6 shadow-[0_8px_25px_rgba(24,39,24,0.05)]">
      <div className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#4b5f4d]">
        <span>🎯</span>
        <span>Daily Goal</span>
      </div>

      <p className="text-2xl font-semibold text-[#1f2d1f]">{remaining.toLocaleString()} kcal remaining</p>

      <div className="mt-6 h-2.5 w-full overflow-hidden rounded-full bg-[#edf3ee]">
        <div
          className="h-full rounded-full bg-[#8bcf8d]"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>

      <p className="mt-2 text-right text-sm font-medium text-[#5a6b5c]">
        {Math.round(percentage)}% completed
      </p>
    </div>
  );
}