import TypeCVerticalLlmData from "@/app/pages/WhatWeOffer/TypeCVerticalLlmData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Type C - Vertical LLM Data",
  description: "Domain-specific vertical LLM training data for industries including healthcare, legal, finance, and more.",
};

export default function Page() {
  return <TypeCVerticalLlmData />;
}