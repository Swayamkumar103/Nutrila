"use client";

import { useState } from "react";

export default function UserDetail() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    activityLevel: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/user-detail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          age: Number(formData.age),
          gender: formData.gender,
          height: Number(formData.height),
          weight: Number(formData.weight),
          activityLevel: formData.activityLevel,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to save user details"
        );
      }

      setMessage("Your details have been saved successfully!");

      console.log("Saved user details:", result.data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-5">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Personal Details
        </h1>

        <p className="text-gray-500 mt-2 mb-8">
          Tell us about yourself to personalize your nutrition plan.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Age */}
          <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Age
            </label>

            <input
              id="age"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter your age"
              min="18"
              max="120"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Gender */}
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Gender
            </label>

            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Height */}
          <div>
            <label
              htmlFor="height"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Height (cm)
            </label>

            <input
              id="height"
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              placeholder="Enter your height in cm"
              min="50"
              max="300"
              step="any"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Weight */}
          <div>
            <label
              htmlFor="weight"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Weight (kg)
            </label>

            <input
              id="weight"
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Enter your weight in kg"
              min="20"
              max="500"
              step="any"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Activity Level */}
          <div>
            <label
              htmlFor="activityLevel"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Activity Level
            </label>

            <select
              id="activityLevel"
              name="activityLevel"
              value={formData.activityLevel}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select activity level</option>
              <option value="sedentary">
                Sedentary — Little or no exercise
              </option>
              <option value="lightly_active">
                Lightly Active — Exercise 1–3 days/week
              </option>
              
              <option value="moderately_active">
                Moderately Active — Exercise 3–5 days/week
              </option>
              <option value="very_active">
                Very Active — Exercise 6–7 days/week
              </option>
              <option value="extra_active">
                Extra Active — Very hard exercise or physical work
              </option>
            </select>
          </div>

          {/* Success Message */}
          {message && (
            <p className="text-green-600 text-sm font-medium">
              {message}
            </p>
          )}

          {/* Error Message */}
          {error && (
            <p className="text-red-600 text-sm font-medium">
              {error}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {loading ? "Saving Details..." : "Save Details"}
          </button>
        </form>
      </div>
    </div>
  );
}