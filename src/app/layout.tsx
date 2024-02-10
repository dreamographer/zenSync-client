import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css"
import { ThemeProvider } from "@/lib/providers/next-theme-provider";
import { twMerge } from "tailwind-merge";


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
      <body className={twMerge("bg-background p-2", montserrat.className)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}