import Link from "next/link";

export default function Login() {
  return (
    <div className="min-h-screen bg-[#F4F8F2] flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-5xl bg-white rounded-[28px] shadow-[0_10px_40px_rgba(30,70,50,0.08)] overflow-hidden grid md:grid-cols-2">

        {/* Left Section */}
        <div className="bg-[#EAF5E8] p-10 md:p-14 flex flex-col justify-between">

          {/* Logo */}
          <div>
            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-full bg-[#DDF2DB] flex items-center justify-center">
                <span className="text-xl">🌿</span>
              </div>

              <h1 className="text-3xl font-bold text-[#102B23]">
                Nutrila
              </h1>

            </div>

            <p className="mt-6 text-[#536B69] text-lg leading-relaxed max-w-sm">
              Your personal nutrition companion for building
              healthier habits every day.
            </p>
          </div>


          {/* Main Message */}
          <div className="mt-16 md:mt-0">

            <h2 className="text-4xl font-bold leading-tight text-[#102B23]">
              Welcome
              <br />
              back to Nutrila.
            </h2>

            <p className="mt-5 text-[#536B69] leading-relaxed max-w-sm">
              Continue tracking your calories, macros, meals
              and daily nutrition goals.
            </p>

          </div>


          <p className="mt-12 text-sm text-[#6C827D]">
            Keep moving towards your goals 🌱
          </p>

        </div>


        {/* Login Section */}
        <div className="p-8 sm:p-12 md:p-14">

          <div className="max-w-md mx-auto">

            <h2 className="text-3xl font-bold text-[#102B23]">
              Welcome back
            </h2>

            <p className="mt-2 text-[#536B69]">
              Login to continue your nutrition journey.
            </p>


            <form className="mt-8 space-y-5">

              {/* Email */}
              <div>

                <label className="block text-sm font-semibold text-[#304943] mb-2">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  className="
                    w-full
                    px-4
                    py-3.5
                    bg-[#F8FBF7]
                    border
                    border-[#DCE8DA]
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

                <div className="flex justify-between items-center mb-2">

                  <label className="block text-sm font-semibold text-[#304943]">
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-sm text-[#1E8F52] hover:underline"
                  >
                    Forgot password?
                  </Link>

                </div>

                <input
                  type="password"
                  placeholder="Enter your password"
                  className="
                    w-full
                    px-4
                    py-3.5
                    bg-[#F8FBF7]
                    border
                    border-[#DCE8DA]
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


              {/* Remember Me */}
              <div className="flex items-center gap-3 pt-1">

                <input
                  type="checkbox"
                  className="w-4 h-4 accent-[#1E9E5A]"
                />

                <span className="text-sm text-[#687D79]">
                  Remember me
                </span>

              </div>


              {/* Login Button */}
              <button
                type="submit"
                className="
                  w-full
                  bg-[#1E9E5A]
                  hover:bg-[#18894D]
                  text-white
                  font-semibold
                  py-3.5
                  rounded-xl
                  transition
                  duration-200
                  shadow-sm
                "
              >
                Login
              </button>

            </form>


            {/* Register Link */}
            <p className="text-center text-sm text-[#687D79] mt-7">

              Don't have an account?{" "}

              <Link
                href="/register"
                className="text-[#1E8F52] font-semibold hover:underline"
              >
                Create Account
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}