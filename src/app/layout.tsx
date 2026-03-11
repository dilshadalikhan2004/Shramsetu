import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TranslationProvider } from "@/lib/i18n/TranslationProvider";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ToastProvider } from "@/components/ToastProvider";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dmsans" });

export const metadata: Metadata = {
    title: "ShramSetu",
    description: "India's blue-collar freelancing platform — connecting skilled workers with employers through trust, verification, and seamless digital tools.",
    manifest: "/manifest.json",
    keywords: ["ShramSetu", "blue collar", "freelancing", "workers", "jobs", "India", "skilled labor"],
    openGraph: {
        title: "ShramSetu",
        description: "India's blue-collar freelancing platform",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
                <meta name="theme-color" content="#0a2540" />
            </head>
            <body className={`${dmSans.className} ${outfit.variable} ${dmSans.variable} font-dmsans bg-shram-bg`} suppressHydrationWarning>
                <ErrorBoundary>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <TranslationProvider>
                            <ToastProvider>
                                <div className="min-h-screen relative w-full bg-bg-page text-text-primary overflow-x-hidden transition-colors duration-300">
                                    {children}
                                </div>
                            </ToastProvider>
                        </TranslationProvider>
                    </ThemeProvider>
                </ErrorBoundary>
            </body>
        </html>
    );
}
