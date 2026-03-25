import HomePage from "./pages/HomePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "The world's leading provider of AI-powered data solutions.",
};

export default function Page() {
  return <HomePage />;
}