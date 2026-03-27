import TypeADataServicing from "@/app/pages/WhatWeOffer/TypeADataServicing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Type A - Data Servicing",
  description: "Lifewood's Type A Data Servicing solutions for large-scale, high-quality dataset collection and processing.",
};

export default function Page() {
  return <TypeADataServicing />;
}