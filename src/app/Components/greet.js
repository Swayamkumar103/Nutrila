export default function Greet({ user = "Swayam" }) {
  return (
    <div className="mb-8 text-left">
      <h1 className="text-3xl font-semibold tracking-tight text-[#1a2a1d]">
        Good morning, {user} 👋
      </h1>
      <p className="mt-2 text-base text-[#5a6b5c]">
        Stay on track with your nutrition goals today.
      </p>
    </div>
  );
}
