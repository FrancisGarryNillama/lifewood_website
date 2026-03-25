import ContactUs from "@/app/pages/ContactUs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Lifewood. Reach out to our team for partnerships, inquiries, or support.",
};

export default function Page() {
  return <ContactUs />;
}