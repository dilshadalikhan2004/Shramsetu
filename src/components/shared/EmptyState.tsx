"use client";

import React from "react";

interface EmptyStateProps {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    action?: () => void;
    actionLabel?: string;
}

export default function EmptyState({ icon, title, subtitle, action, actionLabel }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                {icon}
            </div>
            <h3 className="font-semibold text-gray-800 text-lg mb-2">{title}</h3>
            <p className="text-gray-500 text-sm mb-6 max-w-xs">{subtitle}</p>
            {action && actionLabel && (
                <button
                    onClick={action}
                    className="bg-[#e85d26] text-white rounded-xl px-6 py-2.5 font-semibold text-sm hover:bg-[#d14e1c] transition-colors"
                >
                    {actionLabel}
                </button>
            )}
        </div>
    );
}
