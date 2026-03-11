import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                // Design System Colors
                navy: "#0a2540",
                "navy-mid": "#1a3a5c",
                orange: "#e85d26",
                "orange-light": "#fff1eb",
                "orange-mid": "#f47340",
                "bg-page": "var(--bg-page)",
                "bg-card": "var(--bg-card)",
                "text-primary": "var(--text-primary)",
                "text-secondary": "var(--text-secondary)",
                "text-muted": "var(--text-muted)",
                ds: {
                    green: "#0e9f6e",
                    "green-light": "#ecfdf5",
                    amber: "#d97706",
                    red: "#dc2626",
                },
                // Legacy shram tokens (keep for backward compat)
                shram: {
                    dark: "#0a2540",
                    primary: "#0052A3",
                    accent: "#e85d26",
                    neutral: "#6b7280",
                    bg: "#f3f4f6",
                },
                brand: {
                    deep: "#0a2540",
                    blue: "#0066FF",
                    cyan: "#00C4FF",
                },
            },
            fontFamily: {
                outfit: ["var(--font-outfit)", "sans-serif"],
                dmsans: ["var(--font-dmsans)", "sans-serif"],
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "progress-fill": {
                    "0%": { width: "0%" },
                    "100%": { width: "100%" },
                },
                "fade-in": {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                "slide-up": {
                    "0%": { transform: "translateY(20px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                "toast-in": {
                    "0%": { transform: "translateY(100px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
            },
            animation: {
                "progress-fill": "progress-fill 2s linear forwards",
                "fade-in": "fade-in 0.5s ease forwards",
                "slide-up": "slide-up 0.5s ease forwards",
                "toast-in": "toast-in 0.3s ease forwards",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
export default config;
