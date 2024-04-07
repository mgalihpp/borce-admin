import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import QueryProvider from "@/providers/QueryClientProvider";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/market/navbar";
import Footer from "@/components/market/footer";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Borce Store",
  description:
    "Welcome to Borce Store - Your destination for premium quality products at unbeatable prices. Shop now for the latest trends in fashion, electronics, home essentials, and more!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={poppins.className}>
          <Navbar />
          <QueryProvider>
            <div className="max-w-7xl mx-auto flex mt-[68px] items-center justify-center flex-col">
              {children}
              <Footer />
            </div>
          </QueryProvider>
          <Toaster position="top-center" />
        </body>
      </html>
    </ClerkProvider>
  );
}
