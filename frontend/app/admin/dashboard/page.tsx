import type { Metadata } from "next";

import AdminDashboard from "@/app/pages/AdminDashboard";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AdminDashboard />;
}
