"use client";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F4F8F2] flex items-center justify-center">
      <div className="flex flex-col items-center">

        {/* Logo */}
        <div className="w-16 h-16 bg-[#1E9E5A] rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-white text-2xl font-bold">N</span>
        </div>

        {/* App Name */}
        <h1 className="mt-5 text-2xl font-bold text-[#102B23]">
          Nutrila
        </h1>

        <p className="mt-1 text-sm text-[#536B69]">
          Your nutrition, simplified.
        </p>

        {/* Loading Spinner */}
        <div className="mt-8 w-8 h-8 border-4 border-[#E5F4E3] border-t-[#1E9E5A] rounded-full animate-spin"></div>

      </div>
    </div>
  );
}