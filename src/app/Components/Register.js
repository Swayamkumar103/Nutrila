"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Register() {
  const route = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setmessage] = useState("");
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Password do not match");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setmessage("Account created successfully");
        setTimeout(()=>{
          route.push("/login");
        },1500)
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#F4F8F2] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-[28px] shadow-[0_10px_40px_rgba(30,70,50,0.08)] overflow-hidden grid md:grid-cols-2">
        {/* Left Branding Section */}
        <div className="bg-[#EAF5E8] p-10 md:p-14 flex flex-col justify-between">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#DDF2DB] flex items-center justify-center">
                <span className="text-xl">🌿</span>
              </div>

              <h1 className="text-3xl font-bold text-[#102B23]">Nutrila</h1>
            </div>

            <p className="mt-6 text-[#536B69] text-lg leading-relaxed max-w-sm">
              Your personal nutrition companion for building healthier habits
              every day.
            </p>
          </div>

          {/* Main Message */}
          <div className="mt-16 md:mt-0">
            <h2 className="text-4xl font-bold leading-tight text-[#102B23]">
              Eat well.
              <br />
              Track progress.
              <br />
              Feel better.
            </h2>

            <p className="mt-5 text-[#536B69] leading-relaxed max-w-sm">
              Keep track of your calories, protein, carbohydrates, fats and
              daily nutrition goals.
            </p>
          </div>

          <p className="mt-12 text-sm text-[#6C827D]">
            Start your journey with Nutrila 🌱
          </p>
        </div>

        {/* Register Section */}
        <div className="p-8 sm:p-12 md:p-14">
          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-[#102B23]">
              Create your account
            </h2>

            <p className="mt-2 text-[#536B69]">
              Start tracking your nutrition today.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-[#304943] mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="
                    w-full px-4 py-3.5
                    bg-[#F8FBF7]
                    border border-[#DCE8DA]
                    rounded-xl
                    text-[#102B23]
                    placeholder-[#8A9B97]
                    outline-none
                    transition
                    focus:border-[#79C982]
                    focus:ring-4
                    focus:ring-[#E5F4E3]
                  "
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-[#304943] mb-2">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="
                    w-full px-4 py-3.5
                    bg-[#F8FBF7]
                    border border-[#DCE8DA]
                    rounded-xl
                    text-[#102B23]
                    placeholder-[#8A9B97]
                    outline-none
                    transition
                    focus:border-[#79C982]
                    focus:ring-4
                    focus:ring-[#E5F4E3]
                  "
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-[#304943] mb-2">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="
                    w-full px-4 py-3.5
                    bg-[#F8FBF7]
                    border border-[#DCE8DA]
                    rounded-xl
                    text-[#102B23]
                    placeholder-[#8A9B97]
                    outline-none
                    transition
                    focus:border-[#79C982]
                    focus:ring-4
                    focus:ring-[#E5F4E3]
                  "
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-[#304943] mb-2">
                  Confirm Password
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="
                    w-full px-4 py-3.5
                    bg-[#F8FBF7]
                    border border-[#DCE8DA]
                    rounded-xl
                    text-[#102B23]
                    placeholder-[#8A9B97]
                    outline-none
                    transition
                    focus:border-[#79C982]
                    focus:ring-4
                    focus:ring-[#E5F4E3]
                  "
                />
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3 pt-1">
                <input
                  type="checkbox"
                  className="
                    mt-1
                    w-4 h-4
                    accent-[#1E9E5A]
                  "
                />

                <p className="text-sm text-[#687D79] leading-relaxed">
                  I agree to the{" "}
                  <span className="text-[#1E8F52] font-medium cursor-pointer">
                    Terms & Conditions
                  </span>{" "}
                  and{" "}
                  <span className="text-[#1E8F52] font-medium cursor-pointer">
                    Privacy Policy
                  </span>
                </p>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full 
                rounded-xl 
                bg-[#1E9E5A] 
                py-3 font-semibold 
                text-white transition 
                hover:bg-[#18894D] 
                disabled:cursor-not-allowed 
                disabled:opacity-70"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    Creating Account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/*Toast Message*/}
            {message &&(
              <div className="fixed right-5 top-5 z-50 flex items-center gap-3 rounded-xl bg-white px-5 py-4 shadow-lg border border-[#DCE8DA]">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EAF5E8] text-[#1E9E5A]">
                ✓
                </div>
                <p className="font-medium text-[#102B23]">
                  {message}
                </p>
              </div>
            )}

            {/* Login */}
            <p className="text-center text-sm text-[#687D79] mt-7">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#1E8F52] font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
