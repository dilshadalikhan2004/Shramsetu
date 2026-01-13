import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter as reliable default
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

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
            <body className={inter.className} suppressHydrationWarning>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="min-h-screen relative max-w-md mx-auto bg-white dark:bg-slate-950 shadow-xl overflow-hidden text-slate-900 dark:text-slate-50 transition-colors duration-300">
                        {/* max-w-md mx-auto simulates mobile view on desktop */}
                        {children}
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
