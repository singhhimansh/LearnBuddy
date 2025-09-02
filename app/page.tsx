"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import APP_ROUTES from "@/lib/constants/appRoutes";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push(APP_ROUTES.LOGIN);
  }, []);
  return <></>;
}
