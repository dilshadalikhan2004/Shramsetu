"use client";
import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function SalaryAdvisor({
    skill,
    city,
    experienceYears,
    currentRate,
}: {
    skill: string;
    city: string;
    experienceYears: number;
    currentRate: number;
}) {
    const [advice, setAdvice] = useState<{
        min: number; max: number; recommended: number;
        insight: string; trend: string;
    } | null>(null);

    useEffect(() => {
        if (!skill || !city) return;
        const timer = setTimeout(() => {
            fetch("/api/ai/salary-advice", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ skill, city, experienceYears }),
            })
                .then((r) => r.json())
                .then(setAdvice)
                .catch(() => setAdvice(null));
        }, 800);
        return () => clearTimeout(timer);
    }, [skill, city, experienceYears]);

    if (!advice) return null;

    const isLow = currentRate < advice.min;
    const isHigh = currentRate > advice.max;
    const isGood = !isLow && !isHigh;

    const TrendIcon = advice.trend === "up" ? TrendingUp
        : advice.trend === "down" ? TrendingDown : Minus;

    return (
        <div className={`mt-2 p-3 rounded-xl border text-sm ${isLow ? "bg-amber-50 border-amber-200" : isGood ? "bg-green-50 border-green-200" : "bg-blue-50 border-blue-200"}`}>
            <div className="flex justify-between items-center mb-1">
                <span className="text-gray-600 text-xs">Market Rate · {city}</span>
                <div className="flex items-center gap-1">
                    <TrendIcon className="w-3 h-3 text-gray-500" />
                    <span className="font-semibold text-xs">
                        ₹{advice.min}–₹{advice.max}/day
                    </span>
                </div>
            </div>
            {isLow && (
                <p className="text-amber-700 text-xs">
                    ⚠️ Below market. Suggested: ₹{advice.recommended}/day
                </p>
            )}
            {isGood && (
                <p className="text-green-700 text-xs">✓ Your rate is competitive</p>
            )}
            {isHigh && (
                <p className="text-blue-700 text-xs">
                    Your rate is above market average
                </p>
            )}
            <p className="text-gray-500 text-xs mt-1">{advice.insight}</p>
        </div>
    );
}
