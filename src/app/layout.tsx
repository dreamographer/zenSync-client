import { Plus_Jakarta_Sans } from "next/font/google";
import { EdgeStoreProvider } from "../lib/providers/edgestore";
import "./globals.css"
import { ThemeProvider } from "@/lib/providers/next-theme-provider";
import { twMerge } from "tailwind-merge";
import { CookiesProvider } from "next-client-cookies/server";
import { Toaster } from "sonner";
const JakarthaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "zenSync",
  },
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
        <EdgeStoreProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <Toaster richColors />
            <CookiesProvider>{children}</CookiesProvider>
          </ThemeProvider>
        </EdgeStoreProvider>
      </body>
    </html>
  );
}