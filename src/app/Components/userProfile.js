// export default function UserProfile({ userName = "Swayam" }) {
//   return (
//     <div className="flex items-center gap-3 rounded-full border border-[#dfeadf] bg-white px-3 py-2 shadow-sm">
//       <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e8f5e9] text-sm font-semibold text-[#2f7d32]">
//         {userName?.charAt(0)?.toUpperCase() || "U"}
//       </div>
//       <span className="text-sm font-medium text-[#2b362b]">{userName}</span>
//     </div>
//   );
// }

"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UserProfile({ userName }) {
    // Controls whether the dropdown is visible
    const [isOpen, setIsOpen] = useState(false);

    // Controls the logout loading state
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    // Reference to the dropdown container
    const dropdownRef = useRef(null);

    const router = useRouter();

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    // Logout function
    async function handleLogout() {
        if (isLoggingOut) return;

        setIsLoggingOut(true);

        try {
            const response = await fetch("/api/auth/logout", {
                method: "POST",
            });

            if (!response.ok) {
                throw new Error("Logout failed");
            }

            router.replace("/login");
            router.refresh();

        } catch (error) {
            console.error("Logout failed:", error);
            setIsLoggingOut(false);
        }
    }

    return (
        <div className="relative" ref={dropdownRef}>

            {/* User Profile Button */}
            <button
                type="button"
                onClick={() => setIsOpen((previous) => !previous)}
                className="flex items-center gap-3 rounded-full px-3 py-2 transition hover:bg-green-50"
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                {/* User Avatar */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-800 font-semibold text-white">
                    {userName?.charAt(0).toUpperCase() || "U"}
                </div>

                {/* User Name */}
                <span className="font-medium text-gray-800">
                    {userName || "User"}
                </span>

                {/* Dropdown Arrow */}
                <span className="text-gray-500">
                    {isOpen ? "▲" : "▼"}
                </span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-xl border border-gray-200 bg-white py-2 shadow-xl">

                    {/* Profile Option */}
                    <Link
                        href="/profile"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-800"
                    >
                        <span>👤</span>
                        <span>My Profile</span>
                    </Link>

                    {/* Divider */}
                    <div className="my-1 border-t border-gray-100" />

                    {/* Logout Option */}
                    <button
                        type="button"
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                    >
                        <span>↪</span>
                        <span>
                            {isLoggingOut ? "Logging out..." : "Logout"}
                        </span>
                    </button>

                </div>
            )}
        </div>
    );
}