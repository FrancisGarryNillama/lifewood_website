import AiServices from "@/app/pages/AiInitiatives/AiServices";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Data Services",
  description: "End-to-end AI data solutions from multi-language collection and annotation to model training and generative AI content.",
};

export default function Page() {
  return <AiServices />;
}