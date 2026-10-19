export default function MealCard({
  mealType,
  mealName,
  foodName,
  quantity,
  calories,
  protein,
  carbs,
  fat,
  time,
  icon,
  onEdit,
  onDelete,
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
          <p className="mt-1 text-sm text-[#6b786c]">
            {mealName ??
              `${foodName}${quantity ? ` (${quantity} g)` : ""}`}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {(calories != null || time) && (
          <div className="text-right">
            {calories != null && (
              <p className="text-lg font-semibold text-[#1f2d1f]">
                {calories} kcal
              </p>
            )}
            {time && <p className="text-xs text-[#8a968b]">{time}</p>}
          </div>
        )}
        <button
          type="button"
          onClick={onEdit}
          aria-label={`Edit ${foodName ?? mealType}`}
          className="rounded-lg px-2 py-1 text-sm font-medium text-[#1d7a45] transition hover:bg-[#edf7ef]"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={onDelete}
          aria-label={`Delete ${foodName ?? mealType}`}
          className="rounded-lg px-2 py-1 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}