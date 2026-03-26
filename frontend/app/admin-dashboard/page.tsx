import AdminDashboard from "@/app/pages/AdminDashboard";
import type { Metadata } from "next";

// Deliberately vague title so it doesn't surface in browser history suggestions
export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AdminDashboard />;
}