import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css"
import { ThemeProvider } from "@/lib/providers/next-theme-provider";
import { twMerge } from "tailwind-merge";
import { CookiesProvider } from "next-client-cookies/server";
import { Toaster } from "sonner";
const JakarthaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "zenSync",
  description: "Your companion",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={twMerge("bg-background", JakarthaSans.className)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Toaster richColors />
          <CookiesProvider>{children}</CookiesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}