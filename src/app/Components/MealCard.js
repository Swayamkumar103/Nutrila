export default function MealCard({
  mealType,
  mealName,
  calories,
  protein,
  carbs,
  fat,
  time,
  icon,
}) {
  return (
    <div className="flex items-center justify-between border-b border-[#edf3ee] px-2 py-4 last:border-b-0">
      <div className="flex items-start gap-4">
        <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#edf7ef] text-lg">
          {icon}
        </div>

        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-[#1f2d1f]">{mealType}</h3>
          </div>
          <p className="mt-1 text-sm text-[#6b786c]">{mealName}</p>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div className="text-right">
          <p className="text-lg font-semibold text-[#1f2d1f]">{calories} kcal</p>
          <p className="text-xs text-[#8a968b]">{time}</p>
        </div>
      </div>
    </div>
  );
}