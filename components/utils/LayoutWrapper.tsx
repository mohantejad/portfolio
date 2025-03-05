"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import StarsBackground from "@/components/utils/StarsBackground";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin"); // Check if in the admin panel

  return (
    <>
      {!isAdminPage && <Header />}
      {!isAdminPage && <StarsBackground />}
      {children}
    </>
  );
}
