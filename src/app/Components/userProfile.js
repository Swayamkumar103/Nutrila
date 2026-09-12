export default function UserProfile({ userName = "Swayam" }) {
  return (
    <div className="flex items-center gap-3 rounded-full border border-[#dfeadf] bg-white px-3 py-2 shadow-sm">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e8f5e9] text-sm font-semibold text-[#2f7d32]">
        {userName?.charAt(0)?.toUpperCase() || "U"}
      </div>
      <span className="text-sm font-medium text-[#2b362b]">{userName}</span>
    </div>
  );
}