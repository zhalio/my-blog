"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Root redirect for static export
export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/zh");
  }, [router]);

  return null;
}