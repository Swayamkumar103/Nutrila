import Dashboard from "../Components/Dashboard";
import { getCurrentUser } from "@/lib/auth";

export default async function AddMealPage() {
  const user = await getCurrentUser();
  return <Dashboard expiresAt={user.exp} initialShowAddMeal />;
}