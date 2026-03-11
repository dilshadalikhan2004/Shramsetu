"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Star, Pencil, MapPin, CheckCircle2, Briefcase, TrendingUp, Award, X, Save, Plus, Trash2, Camera } from "lucide-react";
import Image from "next/image";
import { useUserStore } from "@/store/useUserStore";
import { useTranslation } from "@/lib/i18n/TranslationProvider";

const DEFAULT_SKILLS: string[] = [];

export default function WorkerProfilePage() {
    const { generalProfile, workerProfile, updateGeneralProfile, updateWorkerProfile } = useUserStore();
    const router = useRouter();
    const { t } = useTranslation();

    const [mounted, setMounted] = useState(false);
    const [editing, setEditing] = useState(false);

    // Editable fields
    const [editName, setEditName] = useState("");
    const [editCity, setEditCity] = useState("");
    const [editTitle, setEditTitle] = useState("");
    const [editRate, setEditRate] = useState("");
    const [editRadius, setEditRadius] = useState("");
    const [editBio, setEditBio] = useState("");
    const [editSkills, setEditSkills] = useState<string[]>([]);
    const [newSkill, setNewSkill] = useState("");

    useEffect(() => { setMounted(true); }, []);

    if (!mounted) return null;

    const name = generalProfile?.name || "User";
    const city = generalProfile?.city || "";
    const initials = name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();
    const skills = workerProfile?.skills?.length ? workerProfile.skills : DEFAULT_SKILLS;
    const dailyRate = workerProfile?.dailyRate || 800;
    const radius = workerProfile?.serviceRadiusKm || 15;

    const startEditing = () => {
        setEditName(name);
        setEditCity(city);
        setEditTitle(workerProfile?.title || "");
        setEditRate(String(dailyRate));
        setEditRadius(String(radius));
        setEditBio(workerProfile?.bio || "");
        setEditSkills([...skills]);
        setEditing(true);
    };

    const saveProfile = () => {
        updateGeneralProfile({ name: editName, city: editCity });
        updateWorkerProfile({
            title: editTitle,
            dailyRate: parseInt(editRate) || dailyRate,
            serviceRadiusKm: parseInt(editRadius) || radius,
            bio: editBio,
            skills: editSkills,
        });
        setEditing(false);
    };

    const addSkill = () => {
        if (newSkill.trim() && !editSkills.includes(newSkill.trim())) {
            setEditSkills([...editSkills, newSkill.trim()]);
            setNewSkill("");
        }
    };

    const removeSkill = (s: string) => {
        setEditSkills(editSkills.filter(sk => sk !== s));
    };

    return (
        <div className="space-y-5 w-full">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-outfit font-bold" style={{ fontSize: 24, color: "#111827" }}>{t('worker.myProfile')}</h1>
                    <p style={{ fontSize: 14, color: "#6b7280" }}>{t('worker.profileDesc')}</p>
                </div>
                {!editing ? (
                    <button onClick={startEditing}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-dmsans font-semibold transition-all active:scale-95"
                        style={{ border: "1.5px solid #e85d26", color: "#e85d26", background: "white", fontSize: 14 }}>
                        <Pencil className="w-4 h-4" /> {t('settings.editProfile')}
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <button onClick={() => setEditing(false)}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-dmsans font-semibold transition-all"
                            style={{ background: "#f3f4f6", color: "#374151", fontSize: 14 }}>
                            <X className="w-4 h-4" /> {t('common.cancel')}
                        </button>
                        <button onClick={saveProfile}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-dmsans font-semibold text-white transition-all active:scale-95"
                            style={{ background: "#e85d26", fontSize: 14 }}>
                            <Save className="w-4 h-4" /> {t('settings.saveChanges')}
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                {/* ── Left Column — Profile Card + Skills */}
                <div className="lg:col-span-1 space-y-4">
                    {/* Profile Card */}
                    <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: "#e5e7eb" }}>
                        {/* Banner */}
                        <div className="h-20 w-full relative" style={{ background: "linear-gradient(135deg, #0a2540 0%, #1a3a5c 100%)" }}>
                            {editing && (
                                <button className="absolute bottom-2 right-2 px-3 py-1.5 rounded-lg font-dmsans font-semibold text-xs flex items-center gap-1"
                                    style={{ background: "rgba(255,255,255,0.2)", color: "white" }}>
                                    <Camera className="w-3 h-3" /> {t('worker.changeBanner')}
                                </button>
                            )}
                        </div>

                        <div className="px-5 pb-5">
                            {/* Avatar — only this overlaps the banner */}
                            <div className="relative -mt-8 mb-3 w-fit">
                                <div className="w-16 h-16 rounded-2xl border-4 border-white flex items-center justify-center font-outfit font-bold text-white text-xl shadow-lg"
                                    style={{ background: "#e85d26" }}>{initials}</div>
                                {editing && (
                                    <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center border"
                                        style={{ borderColor: "#e5e7eb" }}>
                                        <Camera className="w-3 h-3" style={{ color: "#e85d26" }} />
                                    </button>
                                )}
                            </div>

                            {/* Name & Title — fully on white */}
                            {editing ? (
                                <div className="space-y-2 mb-3">
                                    <input value={editName} onChange={(e) => setEditName(e.target.value)}
                                        className="w-full px-3 py-1.5 rounded-lg border font-outfit font-bold"
                                        style={{ fontSize: 18, color: "#111827", borderColor: "#e5e7eb" }}
                                        placeholder={t('settings.name')} />
                                    <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)}
                                        className="w-full px-3 py-1.5 rounded-lg border font-dmsans"
                                        style={{ fontSize: 13, color: "#6b7280", borderColor: "#e5e7eb" }}
                                        placeholder={t('worker.jobTitleExperiencePlaceholder')} />
                                </div>
                            ) : (
                                <div className="mb-3">
                                    <div className="flex items-center gap-2">
                                        <h2 className="font-outfit font-bold truncate" style={{ fontSize: 20, color: "#111827" }}>{name}</h2>
                                        <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: "#0e9f6e" }} />
                                    </div>
                                    <p style={{ fontSize: 13, color: "#6b7280" }}>{workerProfile?.title || t('worker.defaultWorkerTitle')} &middot; {workerProfile?.experienceYears ?? 0} {t('worker.yearsExp')}</p>
                                </div>
                            )}

                            {/* Rating */}
                            <div className="flex items-center gap-1 mb-1">
                                {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4" style={{ color: i <= Math.round(workerProfile?.rating ?? 0) ? "#f59e0b" : "#e5e7eb" }} fill={i <= Math.round(workerProfile?.rating ?? 0) ? "#f59e0b" : "none"} />)}
                                <span className="font-dmsans font-bold ml-1" style={{ fontSize: 14, color: "#111827" }}>{workerProfile?.rating ?? 0}</span>
                                <span style={{ fontSize: 13, color: "#9ca3af" }}>({workerProfile?.ratingCount ?? 0} {t('common.reviews')})</span>
                            </div>

                            {/* Location */}
                            <div className="flex items-center gap-1.5 mb-4">
                                <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: "#e85d26" }} />
                                {editing ? (
                                    <input value={editCity} onChange={(e) => setEditCity(e.target.value)}
                                        className="flex-1 px-3 py-1 rounded-lg border font-dmsans"
                                        style={{ fontSize: 13, color: "#6b7280", borderColor: "#e5e7eb" }}
                                        placeholder={t('settings.city')} />
                                ) : (
                                    <span style={{ fontSize: 13, color: "#6b7280" }}>{city}</span>
                                )}
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { label: t('worker.jobsDone'), value: "—", editable: false },
                                    { label: t('worker.dailyRate'), value: editing ? editRate : `₹${dailyRate}`, editable: true, field: "rate" },
                                    { label: t('worker.radius'), value: editing ? editRadius : `${radius}km`, editable: true, field: "radius" },
                                ].map((s) => (
                                    <div key={s.label} className="rounded-xl border text-center py-2.5" style={{ borderColor: "#e5e7eb" }}>
                                        {editing && s.editable ? (
                                            <input
                                                value={s.field === "rate" ? editRate : editRadius}
                                                onChange={(e) => s.field === "rate" ? setEditRate(e.target.value) : setEditRadius(e.target.value)}
                                                className="w-full text-center font-outfit font-bold bg-transparent outline-none"
                                                style={{ fontSize: 16, color: "#0a2540" }}
                                                placeholder={s.field === "rate" ? "₹800" : "15"} />
                                        ) : (
                                            <p className="font-outfit font-bold" style={{ fontSize: 18, color: "#0a2540" }}>{s.value}</p>
                                        )}
                                        <p style={{ fontSize: 11, color: "#9ca3af" }}>{s.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="bg-white rounded-2xl border p-5" style={{ borderColor: "#e5e7eb" }}>
                        <h3 className="font-outfit font-bold mb-3" style={{ fontSize: 16, color: "#111827" }}>{t('worker.skills')}</h3>
                        <div className="flex flex-wrap gap-2">
                            {(editing ? editSkills : skills).map((s) => (
                                <span key={s} className="px-3 py-1.5 rounded-full font-dmsans font-medium flex items-center gap-1"
                                    style={{ fontSize: 12, background: "#fff1eb", color: "#e85d26" }}>
                                    {s}
                                    {editing && (
                                        <button onClick={() => removeSkill(s)} className="ml-0.5 hover:opacity-70">
                                            <X className="w-3 h-3" />
                                        </button>
                                    )}
                                </span>
                            ))}
                        </div>
                        {editing && (
                            <div className="flex gap-2 mt-3">
                                <input value={newSkill} onChange={(e) => setNewSkill(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && addSkill()}
                                    className="flex-1 px-3 py-2 rounded-lg border font-dmsans"
                                    style={{ fontSize: 13, borderColor: "#e5e7eb" }}
                                    placeholder={t('worker.addSkillPlaceholder')} />
                                <button onClick={addSkill}
                                    className="px-3 py-2 rounded-lg font-dmsans font-semibold text-sm transition-all active:scale-95"
                                    style={{ background: "#e85d26", color: "white" }}>
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Bio */}
                    <div className="bg-white rounded-2xl border p-5" style={{ borderColor: "#e5e7eb" }}>
                        <h3 className="font-outfit font-bold mb-3" style={{ fontSize: 16, color: "#111827" }}>{t('worker.aboutMe')}</h3>
                        {editing ? (
                            <textarea value={editBio} onChange={(e) => setEditBio(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border font-dmsans resize-none"
                                style={{ fontSize: 14, color: "#374151", borderColor: "#e5e7eb", minHeight: 100 }}
                                placeholder={t('worker.bioPlaceholder')} />
                        ) : (
                            <p className="font-dmsans" style={{ fontSize: 14, color: "#374151", lineHeight: 1.6 }}>
                                {workerProfile?.bio || t('worker.noBio')}
                            </p>
                        )}
                    </div>
                </div>

                {/* ── Right Column — Stats, Portfolio, Reviews */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { icon: Briefcase, label: t('worker.jobsCompleted'), value: "—", color: "#e85d26", bg: "#fff1eb" },
                            { icon: TrendingUp, label: t('worker.monthlyEarnings'), value: "—", color: "#0e9f6e", bg: "#ecfdf5" },
                            { icon: Award, label: t('worker.successRate'), value: "—", color: "#0a2540", bg: "#eff6ff" },
                        ].map(({ icon: Icon, label, value, color, bg }) => (
                            <div key={label} className="bg-white rounded-2xl border p-4 flex items-center gap-3" style={{ borderColor: "#e5e7eb" }}>
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: bg }}>
                                    <Icon className="w-5 h-5" style={{ color }} />
                                </div>
                                <div>
                                    <p className="font-outfit font-bold" style={{ fontSize: 20, color }}>{value}</p>
                                    <p style={{ fontSize: 12, color: "#9ca3af" }}>{label}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Portfolio */}
                    <div className="bg-white rounded-2xl border p-5" style={{ borderColor: "#e5e7eb" }}>
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-outfit font-bold" style={{ fontSize: 16, color: "#111827" }}>{t('worker.portfolio')}</h3>
                            {editing && <button style={{ fontSize: 13, color: "#e85d26" }}>{t('worker.addPhotos')}</button>}
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {(workerProfile?.portfolioImages?.length ? workerProfile.portfolioImages : []).map((img, i) => (
                                <div key={i} className="aspect-square rounded-xl overflow-hidden bg-gray-100 relative group">
                                    <Image src={img} alt="portfolio" className="w-full h-full object-cover" width={200} height={200} />
                                    {editing && (
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                                                <Trash2 className="w-4 h-4" style={{ color: "#dc2626" }} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                            {!workerProfile?.portfolioImages?.length && !editing && (
                                <div className="col-span-4 py-8 text-center">
                                    <Camera className="w-8 h-8 mx-auto mb-2" style={{ color: "#d1d5db" }} />
                                    <p style={{ fontSize: 13, color: "#9ca3af" }}>{t('worker.noImages')}</p>
                                </div>
                            )}
                            {editing && (
                                <div className="aspect-square rounded-xl border-2 border-dashed flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                                    style={{ borderColor: "#d1d5db" }}>
                                    <div className="text-center">
                                        <Plus className="w-6 h-6 mx-auto mb-1" style={{ color: "#9ca3af" }} />
                                        <p style={{ fontSize: 11, color: "#9ca3af" }}>{t('worker.addPhoto')}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Reviews */}
                    <div className="bg-white rounded-2xl border p-5" style={{ borderColor: "#e5e7eb" }}>
                        <h3 className="font-outfit font-bold mb-4" style={{ fontSize: 16, color: "#111827" }}>{t('worker.employerReviews')}</h3>
                        {workerProfile?.ratingCount && workerProfile.ratingCount > 0 ? (
                            <p className="font-dmsans" style={{ fontSize: 14, color: "#9ca3af" }}>{t('worker.reviewsAppear')}</p>
                        ) : (
                            <div className="py-6 text-center">
                                <Star className="w-8 h-8 mx-auto mb-2" style={{ color: "#d1d5db" }} />
                                <p style={{ fontSize: 13, color: "#9ca3af" }}>{t('worker.noReviews')}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div >
        </div >
    );
}
