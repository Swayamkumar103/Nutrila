import Calories from "./Calories";
import DailyGoal from "./DailyGoal";
import Greet from "./greet";
import MacroCard from "./MacroCard";
import MealCard from "./MealCard";
import Navbar from "./Navbar";

export default function Dashboard(){
    return(
        <>
            <Navbar/>
            <Greet/>
            <div>
                <Calories></Calories>
                <DailyGoal></DailyGoal>
            </div>
            <MacroCard/>
            <MealCard></MealCard>

        </>
    )
}