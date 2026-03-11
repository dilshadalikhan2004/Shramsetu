"use client";
import { useEffect, useState } from "react";

export default function JobMatchBadge({
    workerId,
    jobId,
}: {
    workerId: string;
    jobId: string;
}) {
    const [match, setMatch] = useState<{
        score: number; label: string; reason: string;
    } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!workerId || !jobId) { setLoading(false); return; }
        fetch("/api/ai/match-score", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ workerId, jobId }),
        })
            .then((r) => r.json())
            .then(setMatch)
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, [workerId, jobId]);

    if (loading) return <div className="h-4 bg-gray-100 rounded animate-pulse mt-2" />;
    if (error || !match) return null;

    const barColor = match.score >= 80 ? "bg-green-500"
        : match.score >= 60 ? "bg-amber-500" : "bg-red-400";
    const textColor = match.score >= 80 ? "text-green-700"
        : match.score >= 60 ? "text-amber-700" : "text-red-600";

    return (
        <div className="mt-2 pt-2 border-t border-gray-50">
            <div className="flex justify-between items-center mb-1">
                <span className={`text-xs font-bold ${textColor}`}>{match.score}% Match</span>
                <span className={`text-xs ${textColor}`}>{match.label}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5 mb-1">
                <div
                    className={`h-1.5 rounded-full ${barColor} transition-all duration-700`}
                    style={{ width: `${match.score}%` }}
                />
            </div>
            <p className="text-xs text-gray-400">{match.reason}</p>
        </div>
    );
}
