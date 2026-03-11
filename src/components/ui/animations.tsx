"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";

/* ─── 1. Staggered List (fade-up children) ─────────────────── */

const listContainer = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.07 },
    },
};

const listItem = {
    hidden: { opacity: 0, y: 18 },
    show: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 260, damping: 20 },
    },
};

interface AnimatedListProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export function AnimatedList({ children, className, style }: AnimatedListProps) {
    return (
        <motion.div
            variants={listContainer}
            initial="hidden"
            animate="show"
            className={className}
            style={style}
        >
            {children}
        </motion.div>
    );
}

interface AnimatedListItemProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export function AnimatedListItem({ children, className, style }: AnimatedListItemProps) {
    return (
        <motion.div variants={listItem} className={className} style={style}>
            {children}
        </motion.div>
    );
}

/* ─── 2. Animated Button (press scale) ─────────────────────── */

interface AnimatedButtonProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    /** Scale on hover (desktop). Default 1.02 */
    hoverScale?: number;
    /** Scale on press/tap. Default 0.96 */
    tapScale?: number;
}

export function AnimatedButton({
    children,
    className,
    style,
    onClick,
    disabled,
    type,
    hoverScale = 1.02,
    tapScale = 0.96,
}: AnimatedButtonProps) {
    return (
        <motion.button
            whileHover={{ scale: hoverScale }}
            whileTap={{ scale: tapScale }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className={className}
            style={style}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {children}
        </motion.button>
    );
}

/* ─── 3. Animated Number (count-up) ────────────────────────── */

interface AnimatedNumberProps {
    /** Target value (e.g. 18400) */
    value: number;
    /** Duration in ms. Default 1200 */
    duration?: number;
    /** Prefix (e.g. "₹"). Default "" */
    prefix?: string;
    /** Suffix (e.g. "/day"). Default "" */
    suffix?: string;
    /** Use Indian locale formatting. Default true */
    locale?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

export function AnimatedNumber({
    value,
    duration = 1200,
    prefix = "",
    suffix = "",
    locale = true,
    className,
    style,
}: AnimatedNumberProps) {
    const [display, setDisplay] = useState(0);
    const ref = useRef<number | null>(null);
    const startTime = useRef<number | null>(null);

    useEffect(() => {
        startTime.current = null;

        const animate = (timestamp: number) => {
            if (!startTime.current) startTime.current = timestamp;
            const elapsed = timestamp - startTime.current;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * value));

            if (progress < 1) {
                ref.current = requestAnimationFrame(animate);
            }
        };

        ref.current = requestAnimationFrame(animate);

        return () => {
            if (ref.current) cancelAnimationFrame(ref.current);
        };
    }, [value, duration]);

    const formatted = locale
        ? display.toLocaleString("en-IN")
        : display.toString();

    return (
        <span className={className} style={style}>
            {prefix}
            {formatted}
            {suffix}
        </span>
    );
}

/* ─── 4. Skeleton Shimmer ──────────────────────────────────── */

interface SkeletonProps {
    className?: string;
    style?: React.CSSProperties;
    /** Width in px or string. Default "100%" */
    width?: number | string;
    /** Height in px. Default 20 */
    height?: number | string;
    /** Border radius in px. Default 12 */
    borderRadius?: number | string;
}

export function Skeleton({
    className,
    style,
    width = "100%",
    height = 20,
    borderRadius = 12,
}: SkeletonProps) {
    return (
        <div
            className={`skeleton-shimmer ${className ?? ""}`}
            style={{
                width,
                height,
                borderRadius,
                background: "linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1.5s ease-in-out infinite",
                ...style,
            }}
        />
    );
}

/** A pre-composed card skeleton matching the job card layout */
export function SkeletonCard() {
    return (
        <div
            className="bg-white rounded-2xl border p-4 space-y-3"
            style={{ borderColor: "#e5e7eb" }}
        >
            <div className="flex items-start gap-3">
                <Skeleton width={40} height={40} borderRadius={12} />
                <div className="flex-1 space-y-2">
                    <Skeleton width="60%" height={16} />
                    <Skeleton width="40%" height={12} />
                </div>
                <Skeleton width={70} height={16} />
            </div>
            <Skeleton width="100%" height={1} />
            <div className="flex gap-4">
                <Skeleton width="45%" height={14} />
                <Skeleton width="35%" height={14} />
            </div>
            <Skeleton width="100%" height={44} borderRadius={12} />
        </div>
    );
}

/** A stat card skeleton */
export function SkeletonStatCard() {
    return (
        <div
            className="bg-white rounded-2xl border p-4 space-y-3"
            style={{ borderColor: "#e5e7eb" }}
        >
            <div className="flex items-start justify-between">
                <Skeleton width="50%" height={12} />
                <Skeleton width={32} height={32} borderRadius={8} />
            </div>
            <Skeleton width="70%" height={28} />
            <Skeleton width="40%" height={12} />
        </div>
    );
}

/* ─── 5. Toast Notification (slide-in) ─────────────────────── */

export type ToastType = "success" | "error" | "info" | "warning";

interface ToastData {
    id: string;
    message: string;
    type: ToastType;
}

const TOAST_COLORS: Record<ToastType, { bg: string; icon: string }> = {
    success: { bg: "#0e9f6e", icon: "✓" },
    error: { bg: "#dc2626", icon: "✕" },
    info: { bg: "#2563eb", icon: "ℹ" },
    warning: { bg: "#d97706", icon: "⚠" },
};

// Global toast state
let toastListeners: ((toasts: ToastData[]) => void)[] = [];
let globalToasts: ToastData[] = [];

function notifyListeners() {
    toastListeners.forEach((fn) => fn([...globalToasts]));
}

/** Call this from anywhere to show a toast */
export function showToast(message: string, type: ToastType = "success", durationMs = 2800) {
    const id = Math.random().toString(36).slice(2);
    globalToasts.push({ id, message, type });
    notifyListeners();

    setTimeout(() => {
        globalToasts = globalToasts.filter((t) => t.id !== id);
        notifyListeners();
    }, durationMs);
}

/** Render this once in a layout to display toasts */
export function ToastContainer() {
    const [toasts, setToasts] = useState<ToastData[]>([]);

    useEffect(() => {
        const listener = (next: ToastData[]) => setToasts(next);
        toastListeners.push(listener);
        return () => {
            toastListeners = toastListeners.filter((l) => l !== listener);
        };
    }, []);

    return (
        <div
            style={{
                position: "fixed",
                bottom: 96,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 9999,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                pointerEvents: "none",
            }}
        >
            <AnimatePresence mode="popLayout">
                {toasts.map((t) => {
                    const colors = TOAST_COLORS[t.type];
                    return (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 350, damping: 25 }}
                            style={{
                                background: colors.bg,
                                color: "white",
                                padding: "12px 20px",
                                borderRadius: 14,
                                fontFamily: "'DM Sans', sans-serif",
                                fontWeight: 600,
                                fontSize: 14,
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
                                pointerEvents: "auto",
                                whiteSpace: "nowrap",
                            }}
                        >
                            <span style={{ fontSize: 16 }}>{colors.icon}</span>
                            {t.message}
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}

/* ─── Fade-in wrapper for sections ─────────────────────────── */

interface FadeInProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    delay?: number;
}

export function FadeIn({ children, className, style, delay = 0 }: FadeInProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay, ease: "easeOut" }}
            className={className}
            style={style}
        >
            {children}
        </motion.div>
    );
}
