"use client";

import { useEffect, useState } from "react";

export default function AddMeal({ onClose, onAdd, initialMeal = null }) {
  const [mealType, setMealType] = useState(
    initialMeal?.mealType ?? "Breakfast",
  );
  const [foodName, setFoodName] = useState(initialMeal?.foodName ?? "");
  const [quantity, setQuantity] = useState(initialMeal?.quantity ?? "");

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const parsedQuantity = Number(quantity);
    if (!foodName.trim() || !Number.isFinite(parsedQuantity) || parsedQuantity <= 0) {
      return;
    }

    onAdd({
      mealType,
      foodName: foodName.trim(),
      quantity: parsedQuantity,
    });
  };

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[28px] border border-[#e6eee6] bg-white p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-meal-title"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Add Meal"
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#f3f7f1] text-xl text-[#607060] transition hover:bg-[#e6eee6] hover:text-[#1d7a45]"
        >
          &times;
        </button>

        {/* Heading */}
        <div className="mb-7 pr-10">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f5e9] text-2xl">
            🍽️
          </div>

          <h2 id="add-meal-title" className="text-2xl font-bold tracking-tight text-[#1f2d1f] sm:text-3xl">
            {initialMeal ? "Edit Meal" : "Add a Meal"}
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#718071]">
            Track what you eat and stay on top of your nutrition goals.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Meal type */}
          <label className="mb-3 block text-sm font-semibold text-[#304130]">
            Meal Type
          </label>

          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { name: "Breakfast", icon: "🌅" },
              { name: "Lunch", icon: "🥗" },
              { name: "Dinner", icon: "🍲" },
              { name: "Snack", icon: "🍎" },
            ].map((meal) => (
              <button
                key={meal.name}
                type="button"
                onClick={() => setMealType(meal.name)}
                className={`flex flex-col items-center gap-2 rounded-2xl border px-2 py-4 text-sm font-medium transition ${
                  mealType === meal.name
                    ? "border-[#1d7a45] bg-[#edf7ee] text-[#1d7a45] ring-1 ring-[#1d7a45]"
                    : "border-[#e6eee6] bg-white text-[#607060] hover:border-[#a7c9ad] hover:bg-[#f8fbf7]"
                }`}
              >
                <span className="text-2xl">{meal.icon}</span>
                {meal.name}
              </button>
            ))}
          </div>

          {/* Food name */}
          <label
            htmlFor="foodName"
            className="mb-2 block text-sm font-semibold text-[#304130]"
          >
            Food Name
          </label>

          <div className="relative mb-6">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
              🔍
            </span>

            <input
              id="foodName"
              type="text"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              placeholder="Search food, e.g. rice, eggs..."
              required
              className="w-full rounded-xl border border-[#dce7dc] bg-[#fbfcfb] py-3.5 pl-11 pr-4 text-sm text-[#1f2d1f] outline-none transition placeholder:text-[#9aa79a] focus:border-[#1d7a45] focus:ring-4 focus:ring-[#1d7a45]/10"
            />
          </div>

          {/* Quantity */}
          <div className="mb-7">
            <label
              htmlFor="quantity"
              className="mb-2 block text-sm font-semibold text-[#304130]"
            >
              Quantity
            </label>

            <div className="flex items-center gap-3">
              <input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                className="w-full rounded-xl border border-[#dce7dc] bg-[#fbfcfb] px-4 py-3.5 text-sm text-[#1f2d1f] outline-none transition focus:border-[#1d7a45] focus:ring-4 focus:ring-[#1d7a45]/10"
              />

              <span className="rounded-xl bg-[#f3f7f1] px-5 py-3.5 text-sm font-semibold text-[#607060]">
                grams
              </span>
            </div>

            <p className="mt-2 text-xs text-[#849184]">
              Enter the amount of food you consumed.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col-reverse gap-3 border-t border-[#edf3ee] pt-5 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-[#dce7dc] bg-white px-5 py-3.5 text-sm font-semibold text-[#526252] transition hover:bg-[#f6f9f5]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 rounded-xl bg-[#1d7a45] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#18673d] hover:shadow-md focus:outline-none focus:ring-4 focus:ring-[#1d7a45]/20"
            >
              {initialMeal ? "Save Changes" : "+ Add Meal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}