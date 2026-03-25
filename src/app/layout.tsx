import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js + Tigris Storage",
  description: "A minimal starter template for file storage with Tigris",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <header className="border-b bg-white">
            <div className="max-w-3xl mx-auto px-4 py-4">
              <h1 className="text-xl font-semibold text-gray-900">
                Next.js + Tigris Storage
              </h1>
            </div>
          </header>
          <main className="max-w-3xl mx-auto px-4 py-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
