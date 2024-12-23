import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "ST3 MANAGEME TEST",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`dark antialiased`}
      >
        <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger />
          {children}
          <Toaster />
        </SidebarProvider>
      </body>

    </html>
  );
}
