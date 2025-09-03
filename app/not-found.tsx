"use client";

import APP_ROUTES from "@/lib/constants/appRoutes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();
  useEffect(() => {
    router.push(APP_ROUTES.LOGIN);
  }, []);

  return (
    <h3 className="flex justify-center items-center h-screen">
      Resource Not Found, Redirecting to home page...
    </h3>
  );
}
