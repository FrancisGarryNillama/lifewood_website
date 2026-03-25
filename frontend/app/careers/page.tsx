import Careers from "@/app/pages/Careers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join Lifewood and help shape the future of AI data solutions. Explore open roles across our global offices.",
};

export default function Page() {
  return <Careers />;
}