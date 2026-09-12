import Calories from "./Calories";
import DailyGoal from "./DailyGoal";
import Greet from "./greet";
import MacroCard from "./MacroCard";
import MealCard from "./MealCard";
import Navbar from "./Navbar";

const weekData = [1800, 2200, 2100, 2400, 2200, 2700, 2300];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f3f7f1] text-[#1f2d1f]">
      <Navbar userName="Swayam" />

      <main className="mx-auto max-w-6xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
        <Greet user="Swayam" />

        <section className="grid gap-6 md:grid-cols-2">
          <Calories remaining={1420} total={2000} />
          <DailyGoal remaining={580} target={2000} />
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-3">
          <MacroCard name="Protein" current={72} target={120} />
          <MacroCard name="Carbohydrates" current={160} target={250} />
          <MacroCard name="Fats" current={45} target={65} />
        </section>

        <section className="mt-10 rounded-[28px] border border-[#e6eee6] bg-white p-5 shadow-[0_8px_25px_rgba(24,39,24,0.04)] sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight text-[#1f2d1f]">Today's Meals</h2>
            <button className="rounded-full bg-[#1d7a45] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#18673d]">
              + Add Meal
            </button>
          </div>

          <div className="overflow-hidden rounded-[20px] border border-[#edf3ee] bg-[#fbfcfb]">
            <MealCard mealType="Breakfast" mealName="Oatmeal, banana & eggs" calories={420} protein={24} carbs={48} fat={14} time="8:30 AM" icon="🍳" />
            <MealCard mealType="Lunch" mealName="Chicken, rice & vegetables" calories={580} protein={42} carbs={65} fat={18} time="1:15 PM" icon="🥗" />
            <MealCard mealType="Snack" mealName="Apple & almonds" calories={180} protein={5} carbs={22} fat={8} time="4:30 PM" icon="🍎" />
          </div>
        </section>

        <section className="mt-10 rounded-[28px] border border-[#e6eee6] bg-white p-5 shadow-[0_8px_25px_rgba(24,39,24,0.04)] sm:p-6">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight text-[#1f2d1f]">Weekly Calories</h2>

          <div className="flex h-44 items-end justify-between gap-3 rounded-[20px] bg-[#fbfcfb] px-4 pb-4 pt-6">
            {weekData.map((value, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-3">
                <div className="flex h-28 w-full items-end justify-center">
                  <div
                    className="w-full rounded-t-xl bg-gradient-to-t from-[#7ecb78] to-[#bfeab5]"
                    style={{ height: `${(value / 3000) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-[#607060]">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
