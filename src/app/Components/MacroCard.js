export default function MacroCard({ name, current, traget, unit = "g" }) {
  const curr = parseInt(current);
  const trg = parseInt(traget);
  const percentage = (curr / trg) * 100;
  Math.round(percentage);
  return (
    <>
      <p>{name}</p>
      <p>
        {current}
        {unit}/{traget}
        {unit}
      </p>
      <div className="mt-4 h-2 w-full rounded-full bg-gray-100">
        <div
          className="h-2 rounded-full bg-green-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-gray-500">
        {Math.round(percentage)}% of daily goal
      </p>
    </>
  );
}
