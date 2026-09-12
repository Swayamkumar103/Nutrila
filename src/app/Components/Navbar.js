import Logo from "./Logo";
import UserProfile from "./userProfile";
export default function Navbar({ userName }) {
  return (
    <nav className="flex items-center justify-between px-6 py-4">
      <Logo />

      <div className="flex items-center gap-6">
        <p>Dashboard</p>
        <p>Meals</p>
        <p>Progress</p>
      </div>

      <UserProfile userName={userName} />
    </nav>
  );
}
