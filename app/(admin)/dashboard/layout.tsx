import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Sidebar from "@/components/admin/sidebar";
import TopBar from "@/components/admin/topbar";
import QueryProvider from "@/providers/QueryClientProvider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Borce - Admin Dashboard",
  description: "Admin dashboard to manage Borce's data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="flex max-lg:flex-col text-grey-1">
            <Sidebar />
            <TopBar />
            <div className="flex-1">
              <QueryProvider>{children}</QueryProvider>
              <Toaster position="top-center" />
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
