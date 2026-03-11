"use client";

import { Star, Pencil } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { useTranslation } from "@/lib/i18n/TranslationProvider";

export default function EmployerProfilePage() {
    const { t } = useTranslation();
    const { generalProfile, employerProfile } = useUserStore();

    const companyName = employerProfile?.companyName || generalProfile?.name || "Company";
    const initials = companyName.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();
    const city = generalProfile?.city || "";
    const categories = employerProfile?.categories ?? [];
    const gst = employerProfile?.gstNumber;

    return (
        <div className="max-w-2xl space-y-5">
            {/* Company Header */}
            <div className="bg-white rounded-2xl border p-6" style={{ borderColor: "#e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                <div className="flex items-start gap-5">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center font-outfit font-bold text-white text-2xl shrink-0" style={{ background: "#0a2540" }}>
                        {initials}
                    </div>
                    <div className="flex-1">
                        <h1 className="font-outfit font-bold" style={{ fontSize: 24, color: "#111827" }}>{companyName}</h1>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {(categories.length > 0 ? categories : [city || "India"]).map((t) => (
                                <span key={t} className="px-3 py-0.5 rounded-full font-dmsans" style={{ fontSize: 12, background: "#f3f4f6", color: "#6b7280" }}>{t}</span>
                            ))}
                        </div>
                        {gst && <p className="font-mono mt-2" style={{ fontSize: 11, color: "#9ca3af" }}>GST: {gst}</p>}
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-0 mt-5 rounded-xl overflow-hidden border" style={{ borderColor: "#f3f4f6" }}>
                    {[
                        { label: t('employer.hiresMade'), value: employerProfile?.hiringHistoryCount ?? "—" },
                        { label: t('employer.activeJobs'), value: "—" },
                        { label: t('worker.rating'), value: employerProfile?.rating ? `★ ${employerProfile.rating}` : "—" },
                    ].map((s, i) => (
                        <div key={s.label} className="py-4 text-center" style={{ borderRight: i < 2 ? "1px solid #f3f4f6" : "none" }}>
                            <p className="font-outfit font-bold" style={{ fontSize: 20, color: "#111827" }}>{s.value}</p>
                            <p style={{ fontSize: 11, color: "#9ca3af" }}>{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl border p-5" style={{ borderColor: "#e5e7eb" }}>
                <h2 className="font-outfit font-semibold mb-4" style={{ fontSize: 16, color: "#111827" }}>{t('worker.employerReviews')}</h2>
                <div className="py-6 text-center">
                    <Star className="w-8 h-8 mx-auto mb-2" style={{ color: "#d1d5db" }} />
                    <p style={{ fontSize: 13, color: "#9ca3af" }}>{t('worker.noReviews')}</p>
                </div>
            </div>

            {/* Edit Button */}
            <button
                className="w-full h-12 rounded-xl font-dmsans font-semibold flex items-center justify-center gap-2 transition-all active:scale-95"
                style={{ border: "1.5px solid #e85d26", color: "#e85d26", background: "white" }}
            >
                <Pencil className="w-4 h-4" />
                {t('settings.editProfile')}
            </button>
        </div>
    );
}
