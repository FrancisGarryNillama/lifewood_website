import AboutUs from "@/app/pages/OurCompany/AboutUs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Lifewood's mission, vision, and the team behind the world's leading AI data solutions provider.",
};

export default function Page() {
  return <AboutUs />;
}