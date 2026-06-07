import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ClientLayout navbar={<NavbarWrapper />} footer={<Footer />}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
