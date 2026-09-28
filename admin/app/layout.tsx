import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ConfirmProvider } from "@/components/ConfirmDialog";

export const metadata: Metadata = {
  title: "AXON Admin",
  description: "AXON Multi-Rehabilitation Centre — admin panel",
};

export const viewport: Viewport = {
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <ConfirmProvider>{children}</ConfirmProvider>
      </body>
    </html>
  );
}
