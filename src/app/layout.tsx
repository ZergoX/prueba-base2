import { AppNavbar } from "@/components/navbar";
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
        {children}

      </body>
    </html>
  );
}
