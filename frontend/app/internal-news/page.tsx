import InternalNews from "@/app/pages/InternalNews";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Internal News",
  description: "Stay up to date with the latest news, announcements, and updates from within Lifewood.",
};

export default function Page() {
  return <InternalNews />;
}