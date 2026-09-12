export default function MealCard({
  mealType,
  mealName,
  calories,
  protein,
  carbs,
  fat,
  time,
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex justify-between">
        <p>Today's Meals</p>
        <button>+ Add Meal</button>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">
            {mealType}
          </h3>

          <p className="text-sm text-gray-500">
            {mealName}
          </p>
        </div>

        <div className="text-right">
          <p className="font-semibold text-gray-900">
            {calories} kcal
          </p>

          <p className="text-xs text-gray-400">
            {time}
          </p>
        </div>
      </div>

      <div className="mt-4 flex gap-6 text-sm text-gray-500">
        <span>Protein {protein}g</span>
        <span>Carbs {carbs}g</span>
        <span>Fat {fat}g</span>
      </div>
    </div>
  );
}