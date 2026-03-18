import type { Metadata } from "next";
import { Providers } from '../providers/heroUi';
import AppNavbar from "@/components/navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-grey-100 font-sans">

        <AppNavbar />
        <Providers>{children}</Providers>

      </body>
    </html>
  );
}
