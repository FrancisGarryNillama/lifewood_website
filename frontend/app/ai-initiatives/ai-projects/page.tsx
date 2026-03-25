import AiProjects from "@/app/pages/AiInitiatives/AiProjects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Projects",
  description: "Explore Lifewood's AI projects and initiatives.",
};

export default function Page() {
  return <AiProjects />;
}