import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TranslationProvider } from "@/lib/i18n/TranslationProvider";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dmsans" });

export const metadata: Metadata = {
    title: "ShramSetu",
    description: "India's blue-collar freelancing platform",
    manifest: "/manifest.json",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${dmSans.className} ${outfit.variable} ${dmSans.variable} font-dmsans bg-shram-bg`} suppressHydrationWarning>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <TranslationProvider>
                        <div className="min-h-screen relative w-full dark:bg-slate-950 overflow-x-hidden text-slate-900 dark:text-slate-50 transition-colors duration-300">
                            {children}
                        </div>
                    </TranslationProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
