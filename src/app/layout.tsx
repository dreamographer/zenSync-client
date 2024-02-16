import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { getServerSideUser } from "@/lib/token-utils";
import { cookies } from "next/headers";
import "./globals.css"
import { ThemeProvider } from "@/lib/providers/next-theme-provider";
import { twMerge } from "tailwind-merge";
import { CookiesProvider } from "next-client-cookies/server";
const montserrat = Montserrat({ subsets: ["latin"] });

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
      <body className={twMerge("bg-background", montserrat.className)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <CookiesProvider>{children}</CookiesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}