import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eshan Enterprise | Premium Kitchen & Bath Accessories",
  description: "Eshan Enterprise is a leading manufacturer and supplier of premium stainless steel kitchen sinks and bathroom accessories in India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <ClientLayout navbar={<NavbarWrapper />} footer={<Footer />}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
