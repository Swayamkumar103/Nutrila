"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage({ user }) {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    async function handleLogout() {
        if (isLoggingOut) return;

        setIsLoggingOut(true);
        setError("");

        try {
            // Call the logout API
            const response = await fetch("/api/auth/logout", {
                method: "POST",
            });

            if (!response.ok) {
                throw new Error("Logout failed");
            }

            // Redirect to login after successful logout
            router.replace("/login");
            router.refresh();
        } catch (error) {
            console.error("Logout error:", error);
            setError("Unable to log out. Please try again.");
            setIsLoggingOut(false);
        }
    }

    return (
        <main className="min-h-screen bg-green-50 px-4 py-12">
            <div className="mx-auto max-w-2xl">

                {/* Page heading */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        My Profile
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Manage your Nutrila account.
                    </p>
                </div>

                {/* Profile card */}
                <div className="overflow-hidden rounded-2xl border border-green-100 bg-white shadow-lg">

                    {/* Profile header */}
                    <div className="bg-green-800 px-6 py-8 text-center">
                        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-green-100 text-4xl font-bold text-green-800">
                            {user.name?.charAt(0).toUpperCase() || "U"}
                        </div>

                        <h2 className="mt-4 text-2xl font-semibold text-white">
                            {user.name || "User"}
                        </h2>

                        <p className="mt-1 text-green-100">
                            Your Nutrila Account
                        </p>
                    </div>

                    {/* Profile details */}
                    <div className="space-y-5 p-6 sm:p-8">

                        {/* User name */}
                        <div>
                            <label className="text-sm font-medium text-gray-500">
                                Full Name
                            </label>

                            <div className="mt-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800">
                                {user.name || "Not available"}
                            </div>
                        </div>

                        {/* User email */}
                        <div>
                            <label className="text-sm font-medium text-gray-500">
                                Email Address
                            </label>

                            <div className="mt-2 break-all rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800">
                                {user.email || "Not available"}
                            </div>
                        </div>

                        {/* Account status */}
                        <div className="border-t border-gray-100 pt-5">
                            <p className="text-sm text-gray-500">
                                Account Status
                            </p>

                            <p className="mt-2 font-medium text-green-700">
                                Logged In
                            </p>
                        </div>

                        {/* Error message */}
                        {error && (
                            <p role="alert" className="text-sm text-red-600">
                                {error}
                            </p>
                        )}

                        {/* Logout button */}
                        <button
                            type="button"
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className="w-full rounded-lg bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isLoggingOut ? "Logging out..." : "Logout"}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}