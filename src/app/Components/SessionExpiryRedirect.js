"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SessionExpiryRedirect({ expiresAt }) {
  const router = useRouter();

  useEffect(() => {
    const millisecondsUntilExpiry = expiresAt * 1000 - Date.now();

    if (millisecondsUntilExpiry <= 0) {
      router.replace("/login");
      return;
    }

    const timeoutId = setTimeout(() => router.replace("/login"), millisecondsUntilExpiry);
    return () => clearTimeout(timeoutId);
  }, [expiresAt, router]);

  return null;
}