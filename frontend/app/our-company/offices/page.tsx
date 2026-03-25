import Offices from "@/app/pages/OurCompany/Offices";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Offices",
  description: "Lifewood operates globally with offices across 30+ countries. Find a location near you.",
};

export default function Page() {
  return <Offices />;
}