"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap, Plus, X } from "lucide-react";
import { useAppDataStore } from "@/store/useAppDataStore";
import { useUserStore } from "@/store/useUserStore";
import { useTranslation } from "@/lib/i18n/TranslationProvider";

const SKILLS_OPTIONS = ["Bricklaying", "Blueprint Reading", "Site Safety", "Pipe Fitting", "Welding", "Electrical Wiring", "Masonry", "Carpentry"];

type Step = 1 | 2 | 3;

const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
    <button onClick={onToggle} className="w-11 h-6 rounded-full transition-all duration-300 relative shrink-0"
        style={{ background: on ? "#e85d26" : "#d1d5db" }}>
        <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-300"
            style={{ left: on ? "calc(100% - 22px)" : "2px" }} />
    </button>
);

export default function PostJobPage() {
    const { t } = useTranslation();
    const router = useRouter();
    const { addJob } = useAppDataStore();
    const { generalProfile, employerProfile } = useUserStore();
    const [step, setStep] = useState<Step>(1);
    const [urgent, setUrgent] = useState(false);
    const [skills, setSkills] = useState<string[]>([]);
    const [newSkill, setNewSkill] = useState("");
    const [positions, setPositions] = useState(3);
    const [dailyRate, setDailyRate] = useState(950);
    const [perks, setPerks] = useState({ food: true, transport: false, safety: true, accommodation: false });
    const [experience, setExperience] = useState<"fresher" | "1-3" | "3+">("1-3");
    const [jobTitle, setJobTitle] = useState("");
    const [category, setCategory] = useState("Construction");
    const [description, setDescription] = useState("");
    const [posted, setPosted] = useState(false);

    const removeSkill = (s: string) => setSkills((prev) => prev.filter((x) => x !== s));
    const addSkill = (s: string) => { if (s && !skills.includes(s)) setSkills([...skills, s]); setNewSkill(""); };

    const handlePost = async () => {
        // Build active perks list
        const activePerks: string[] = [];
        if (perks.food) activePerks.push(t('employer.perks_list.food'));
        if (perks.transport) activePerks.push(t('employer.perks_list.transport'));
        if (perks.safety) activePerks.push(t('employer.perks_list.safety'));
        if (perks.accommodation) activePerks.push(t('employer.perks_list.accommodation'));

        const expLabel = t(`employer.exp_labels.${experience}` as any);
        const employerName = employerProfile?.companyName || generalProfile?.name || t('common.employer');
        const city = generalProfile?.city || "India";

        // Save the job to the store so it appears in My Jobs
        addJob({
            id: `job-${Date.now()}`,
            title: jobTitle || "Untitled Job",
            location: city,
            city,
            wage: `₹${dailyRate}/day`,
            daily_rate: dailyRate,
            category,
            description,
            skills_required: skills,
            status: "active",
            posted: t('common.justNow'),
            applicants: 0,
            filled: 0,
            total: positions,
            employer_id: generalProfile?.id || "self",
            employer_name: employerName,
            employer_verified: true,
            is_urgent: urgent,
            duration: expLabel,
            perks: activePerks,
            candidates: [],
        });

        setPosted(true);
    };

    const StepCircle = ({ n, label }: { n: number; label: string }) => {
        const done = step > n; const active = step === n;
        return (
            <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-outfit font-bold text-sm transition-all duration-300"
                    style={{ background: done || active ? "#e85d26" : "#e5e7eb", color: done || active ? "white" : "#9ca3af" }}>
                    {done ? "✓" : n}
                </div>
                <span className="font-dmsans" style={{ fontSize: 11, color: active ? "#e85d26" : "#9ca3af", fontWeight: active ? 600 : 400 }}>{label}</span>
            </div>
        );
    };

    if (posted) return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "#ecfdf5" }}>
                <span style={{ fontSize: 32 }}>✓</span>
            </div>
            <h2 className="font-outfit font-bold" style={{ fontSize: 24, color: "#111827" }}>{t('employer.postJobSuccess')}</h2>
            <p style={{ fontSize: 14, color: "#6b7280" }}>{t('employer.workersNotified')}</p>
            <button onClick={() => router.push("/my-jobs")} className="px-6 py-2.5 rounded-xl font-dmsans font-semibold text-white" style={{ background: "#e85d26" }}>
                {t('employer.viewMyJobs')}
            </button>
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-end justify-between">
                <div>
                    <p className="font-dmsans mb-1" style={{ fontSize: 12, color: "#9ca3af" }}>{t('common.home')} › {t('employer.postNewJob')}</p>
                    <h1 className="font-outfit font-bold" style={{ fontSize: 28, color: "#111827" }}>{t('employer.createJobPosting')}</h1>
                    <p style={{ fontSize: 14, color: "#6b7280" }}>{t('employer.reachWorkersInstantly')}</p>
                </div>
            </div>

            {/* Stepper */}
            <div className="flex items-center gap-0">
                <StepCircle n={1} label={t('common.details')} />
                <div className="flex-1 h-0.5 mb-5" style={{ background: step > 1 ? "#e85d26" : "#e5e7eb" }} />
                <StepCircle n={2} label={t('common.requirements')} />
                <div className="flex-1 h-0.5 mb-5" style={{ background: step > 2 ? "#e85d26" : "#e5e7eb" }} />
                <StepCircle n={3} label={t('common.review')} />
            </div>

            {/* Step 1 */}
            {step === 1 && (
                <div className="bg-white rounded-2xl border p-6 space-y-6" style={{ borderColor: "#e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="font-outfit font-bold" style={{ fontSize: 16, color: "#111827" }}>{t('employer.jobDetailsStep')}</p>
                            <p style={{ fontSize: 13, color: "#6b7280" }}>{t('employer.provideBasicInfo')}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4" style={{ fill: urgent ? "#e85d26" : "none", color: urgent ? "#e85d26" : "#6b7280" }} />
                                <span className="font-dmsans font-semibold" style={{ fontSize: 13, color: urgent ? "#e85d26" : "#4b5563" }}>{t('employer.urgentHiring')}</span>
                            </div>
                            <Toggle on={urgent} onToggle={() => setUrgent(!urgent)} />
                        </div>
                    </div>
                    {urgent && (
                        <div className="rounded-xl px-4 py-3 flex items-center gap-2" style={{ background: "#fffbeb", border: "1px solid #fde68a" }}>
                            <Zap className="w-4 h-4" style={{ color: "#d97706" }} />
                            <p style={{ fontSize: 13, color: "#d97706" }}>{t('employer.urgentBadgeDesc')}</p>
                        </div>
                    )}

                    <div className="space-y-3">
                        <div>
                            <label className="block font-dmsans font-semibold mb-1.5" style={{ fontSize: 13, color: "#374151" }}>{t('employer.jobTitle')}</label>
                            <input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder={t('employer.jobTitlePlaceholder')}
                                className="w-full h-12 rounded-xl border px-4 font-dmsans text-sm outline-none" style={{ borderColor: "#e5e7eb", color: "#111827" }}
                                onFocus={(e) => (e.target.style.borderColor = "#e85d26", e.target.style.boxShadow = "0 0 0 3px rgba(232,93,38,0.1)")}
                                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb", e.target.style.boxShadow = "none")} />
                        </div>
                        <div>
                            <label className="block font-dmsans font-semibold mb-1.5" style={{ fontSize: 13, color: "#374151" }}>{t('employer.category')}</label>
                            <select value={category} onChange={(e) => setCategory(e.target.value)}
                                className="w-full h-12 rounded-xl border px-4 font-dmsans text-sm outline-none" style={{ borderColor: "#e5e7eb", color: "#111827" }}>
                                {["construction", "plumbing", "electrical", "logistics", "agriculture", "manufacturing"].map((c) => (
                                    <option key={c} value={c}>{t(`employer.categories.${c}` as any)}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block font-dmsans font-semibold mb-1.5" style={{ fontSize: 13, color: "#374151" }}>{t('employer.jobDescription')}</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder={t('employer.descriptionPlaceholder')}
                                className="w-full rounded-xl border px-4 py-3 font-dmsans text-sm outline-none resize-none" style={{ borderColor: "#e5e7eb", color: "#111827" }}
                                onFocus={(e) => (e.target.style.borderColor = "#e85d26")} onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")} />
                        </div>

                        {/* Skills */}
                        <div>
                            <label className="block font-dmsans font-semibold mb-2" style={{ fontSize: 13, color: "#374151" }}>{t('employer.requiredSkills')}</label>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {skills.map((s) => (
                                    <span key={s} className="flex items-center gap-1.5 px-3 py-1 rounded-full font-dmsans font-medium" style={{ fontSize: 12, background: "#fff1eb", color: "#e85d26", border: "1px solid #fbd8c8" }}>
                                        {s}
                                        <button onClick={() => removeSkill(s)}><X className="w-3 h-3" /></button>
                                    </span>
                                ))}
                                <select value="" onChange={(e) => addSkill(e.target.value)} className="px-3 py-1 rounded-full border font-dmsans text-sm" style={{ borderColor: "#e85d26", color: "#e85d26", background: "white" }}>
                                    <option value="">{t('employer.addSkill')}</option>
                                    {SKILLS_OPTIONS.filter((s) => !skills.includes(s)).map((s) => <option key={s}>{s}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button onClick={() => setStep(2)} className="px-6 py-2.5 rounded-xl font-dmsans font-semibold text-white transition-all active:scale-95" style={{ background: "#e85d26" }}>
                            {t('employer.nextRequirements')}
                        </button>
                    </div>
                </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
                <div className="bg-white rounded-2xl border p-6 space-y-6" style={{ borderColor: "#e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                    <div>
                        <p className="font-outfit font-bold" style={{ fontSize: 16, color: "#111827" }}>{t('employer.requirementsStep')}</p>
                        <p style={{ fontSize: 13, color: "#6b7280" }}>{t('employer.setPayPerks')}</p>
                    </div>

                    {/* Daily Rate */}
                    <div>
                        <label className="block font-dmsans font-semibold mb-2" style={{ fontSize: 13, color: "#374151" }}>{t('employer.dailyRate')}</label>
                        <div className="flex items-center gap-3">
                            <button onClick={() => setDailyRate((p) => Math.max(200, p - 50))} className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg transition-all active:scale-95" style={{ background: "#f3f4f6", color: "#374151" }}>−</button>
                            <div className="flex-1 h-12 rounded-xl border flex items-center justify-center font-outfit font-bold text-lg" style={{ borderColor: "#e5e7eb", color: "#111827" }}>₹ {dailyRate}</div>
                            <button onClick={() => setDailyRate((p) => p + 50)} className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg transition-all active:scale-95" style={{ background: "#f3f4f6", color: "#374151" }}>+</button>
                        </div>
                    </div>

                    {/* Perks */}
                    <div>
                        <label className="block font-dmsans font-semibold mb-2" style={{ fontSize: 13, color: "#374151" }}>{t('employer.perks')}</label>
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                ["food", t('employer.perks_list.food')],
                                ["transport", t('employer.perks_list.transport')],
                                ["safety", t('employer.perks_list.safety')],
                                ["accommodation", t('employer.perks_list.accommodation')],
                            ].map(([key, label]) => (
                                <label key={key} className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={perks[key as keyof typeof perks]} onChange={() => setPerks((p) => ({ ...p, [key]: !p[key as keyof typeof perks] }))}
                                        className="w-4 h-4 rounded" style={{ accentColor: "#e85d26" }} />
                                    <span style={{ fontSize: 13, color: "#374151" }}>{label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Experience */}
                    <div>
                        <label className="block font-dmsans font-semibold mb-2" style={{ fontSize: 13, color: "#374151" }}>{t('employer.experienceLevel')}</label>
                        <div className="flex gap-2">
                            {(["fresher", "1-3", "3+"] as const).map((e) => (
                                <button key={e} onClick={() => setExperience(e)}
                                    className="flex-1 py-2 rounded-xl font-dmsans font-semibold transition-all" style={{ fontSize: 13, background: experience === e ? "#e85d26" : "#f3f4f6", color: experience === e ? "white" : "#6b7280" }}>
                                    {t(`employer.exp_labels.${e}` as any)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button onClick={() => setStep(1)} className="px-5 py-2.5 rounded-xl font-dmsans font-semibold transition-all active:scale-95" style={{ border: "1px solid #e5e7eb", color: "#6b7280" }}>
                            {t('common.back')}
                        </button>
                        <button onClick={() => setStep(3)} className="flex-1 py-2.5 rounded-xl font-dmsans font-semibold text-white transition-all active:scale-95" style={{ background: "#e85d26" }}>
                            {t('employer.nextReview')}
                        </button>
                    </div>
                </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
                <div className="bg-white rounded-2xl border p-8 space-y-6" style={{ borderColor: "#e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                    <div>
                        <p className="font-outfit font-bold" style={{ fontSize: 16, color: "#111827" }}>{t('employer.reviewStep')}</p>
                        <p style={{ fontSize: 13, color: "#6b7280" }}>{t('employer.confirmDetails')}</p>
                    </div>
                    {[
                        [t('employer.jobTitle'), jobTitle || "Untitled Job"],
                        [t('employer.category'), t(`employer.categories.${category}` as any)],
                        [t('employer.dailyRate'), `₹${dailyRate}/day`],
                        [t('employer.experienceLevel'), t(`employer.exp_labels.${experience}` as any)],
                        [t('employer.urgentHiring'), urgent ? t('common.yes') + " ⚡" : t('common.no')],
                        [t('employer.requiredSkills'), skills.join(", ")],
                    ].map(([k, v]) => (
                        <div key={k} className="flex justify-between py-2.5 border-b" style={{ borderColor: "#f3f4f6" }}>
                            <span style={{ fontSize: 13, color: "#9ca3af" }}>{k}</span>
                            <span className="font-dmsans font-semibold text-right max-w-[65%]" style={{ fontSize: 13, color: "#111827" }}>{v}</span>
                        </div>
                    ))}
                    <div className="flex gap-3 pt-2">
                        <button onClick={() => setStep(2)} className="px-5 py-2.5 rounded-xl font-dmsans font-semibold transition-all active:scale-95" style={{ border: "1px solid #e5e7eb", color: "#6b7280" }}>
                            {t('common.back')}
                        </button>
                        <button onClick={handlePost} className="flex-1 py-3 rounded-xl font-dmsans font-bold text-white text-base transition-all active:scale-95" style={{ background: "#e85d26" }}>
                            {t('employer.postJob')}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
