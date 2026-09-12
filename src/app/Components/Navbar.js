import Logo from "./Logo";
import UserProfile from "./userProfile";

export default function Navbar({ userName = "Swayam" }) {
  return (
    <nav className="sticky top-0 z-20 border-b border-[#dfeadf] bg-[#f7faf5]/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Logo />

        <div className="hidden items-center gap-8 text-sm font-medium text-[#4b5f4d] md:flex">
          <a href="#" className="text-[#1f2d1f]">Dashboard</a>
          <a href="#" className="transition hover:text-[#1f2d1f]">Meals</a>
          <a href="#" className="transition hover:text-[#1f2d1f]">Progress</a>
        </div>

        <UserProfile userName={userName} />
      </div>
    </nav>
  );
}
