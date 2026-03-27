import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: {
    template: "%s | Lifewood",
    default: "Lifewood – The world's leading provider of AI-powered data solutions",
  },
  description:
    "Lifewood delivers AI-powered data solutions across data servicing, LLM training data, and AIGC at global scale.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-gray-900 font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
