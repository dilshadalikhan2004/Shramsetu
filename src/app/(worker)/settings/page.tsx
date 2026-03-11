"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore, type SupportedLanguage } from "@/store/useUserStore";
import { useTranslation } from "@/lib/i18n/TranslationProvider";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useTheme } from "next-themes";
import {
    Globe, Shield, LogOut, ChevronRight, User,
    HelpCircle, Check, Smartphone, Moon,
    Mail, Briefcase, CreditCard, X, Trash2, AlertTriangle,
} from "lucide-react";

const LANGUAGES = [
    { code: "hi" as SupportedLanguage, label: "हिंदी", sub: "Hindi" },
    { code: "en" as SupportedLanguage, label: "English", sub: "English" },
    { code: "or" as SupportedLanguage, label: "ଓଡ଼ିଆ", sub: "Odia" },
    { code: "mr" as SupportedLanguage, label: "मराठी", sub: "Marathi" },
    { code: "ta" as SupportedLanguage, label: "தமிழ்", sub: "Tamil" },
    { code: "te" as SupportedLanguage, label: "తెలుగు", sub: "Telugu" },
    { code: "bn" as SupportedLanguage, label: "বাংলা", sub: "Bengali" },
    { code: "gu" as SupportedLanguage, label: "ગુજરાતી", sub: "Gujarati" },
    { code: "pa" as SupportedLanguage, label: "ਪੰਜਾਬի", sub: "Punjabi" },
];

const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
    <button
        type="button"
        onClick={onToggle}
        className={`w-11 h-6 rounded-full transition-all duration-300 relative shrink-0 ${on ? "bg-orange" : "bg-slate-200 dark:bg-slate-700"}`}
    >
        <span
            className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-300"
            style={{ left: on ? "calc(100% - 22px)" : "2px" }}
        />
    </button>
);

export default function SettingsPage() {
    const router = useRouter();
    const { mode, logout, generalProfile, preferredLanguage, setLanguage } = useUserStore();
    const { t } = useTranslation();
    const { theme, setTheme } = useTheme();
    const language = generalProfile?.language || preferredLanguage || "en";

    const [langModal, setLangModal] = useState(false);
    const [logoutConfirm, setLogoutConfirm] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Persisted notification preferences (using localStorage)
    const [notifJobs, setNotifJobs] = useState(true);
    const [notifMsg, setNotifMsg] = useState(true);
    const [notifPay, setNotifPay] = useState(true);

    useEffect(() => {
        setMounted(true);
        // Load persisted preferences
        const prefs = localStorage.getItem("shramsetu-settings");
        if (prefs) {
            try {
                const p = JSON.parse(prefs);
                setNotifJobs(p.notifJobs ?? true);
                setNotifMsg(p.notifMsg ?? true);
                setNotifPay(p.notifPay ?? true);
            } catch { }
        }
    }, []);

    // Save preferences whenever they change
    useEffect(() => {
        if (!mounted) return;
        localStorage.setItem("shramsetu-settings", JSON.stringify({ notifJobs, notifMsg, notifPay }));
    }, [notifJobs, notifMsg, notifPay, mounted]);

    if (!mounted) return null;

    const phone = generalProfile?.phone || "";

    const handleLogout = async () => {
        setLogoutConfirm(false);
        try {
            await signOut(auth);
        } catch (err) {
            console.warn("Firebase sign out failed", err);
        }
        logout();
        window.location.replace("/");
    };

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    const isDarkMode = theme === "dark";
    const lang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[1];

    return (
        <div className="space-y-5 w-full text-text-primary">
            <div>
                <h1 className="font-outfit font-bold" style={{ fontSize: 24 }}>{t('settings.title')}</h1>
                <p className="text-text-secondary" style={{ fontSize: 14 }}>{t('sidebar.preferences')}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* ── Main Settings Groups (Left/Center) ── */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Account */}
                    <div className="bg-bg-card rounded-2xl border overflow-hidden border-border">
                        <p className="px-5 pt-4 pb-2 font-dmsans font-bold tracking-widest text-text-muted" style={{ fontSize: 11, textTransform: "uppercase" }}>{t('settings.account')}</p>
                        {[
                            { icon: User, label: t('settings.editProfile'), sub: t('worker.setupSubtitle'), action: () => router.push(mode === "employer" ? "/employer-profile" : "/worker-profile") },
                            ...(mode === "employer" ? [{ 
                                icon: CreditCard, 
                                label: t('settings.subscription'), 
                                sub: t('settings.manageSubscription'), 
                                badge: t('settings.freePlan'),
                                action: () => router.push("/subscription") 
                            }] : []),
                            { icon: Shield, label: t('settings.kycVerification'), sub: t('settings.aadhaarStatus'), badge: t('common.success'), badgeColor: "var(--green)", badgeBg: "var(--green-light)", action: () => { } },
                            { icon: Globe, label: t('settings.language'), sub: `${t('common.status_labels.active')}: ${lang.label}`, extra: lang.label, action: () => setLangModal(true) },
                            { icon: Smartphone, label: t('settings.mobileChange'), sub: phone, action: () => { } },
                        ].map(({ icon: Icon, label, sub, action, badge, badgeColor, badgeBg }, i) => (
                            <button key={label} onClick={action}
                                className="w-full flex items-center gap-4 px-5 py-3.5 hover:bg-bg-page transition-colors text-left"
                                style={{ borderTop: i > 0 ? "1px solid var(--border)" : "none" }}>
                                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-orange-light">
                                    <Icon className="w-5 h-5 text-orange" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-dmsans font-semibold text-text-primary" style={{ fontSize: 14 }}>{label}</p>
                                    <p className="text-text-muted" style={{ fontSize: 12 }}>{sub}</p>
                                </div>
                                {badge && <span className="px-2.5 py-0.5 rounded-full font-bold shrink-0" style={{ fontSize: 11, background: badgeBg || "var(--orange-light)", color: badgeColor || "var(--orange)" }}>{badge}</span>}
                                <ChevronRight className="w-4 h-4 shrink-0 text-text-muted" />
                            </button>
                        ))}
                    </div>

                    {/* Notifications */}
                    <div className="bg-bg-card rounded-2xl border overflow-hidden border-border">
                        <p className="px-5 pt-4 pb-2 font-dmsans font-bold tracking-widest text-text-muted" style={{ fontSize: 11, textTransform: "uppercase" }}>{t('settings.notifications')}</p>
                        {[
                            { label: t('settings.jobMatches'), sub: t('settings.jobMatchesSub'), icon: Briefcase, on: notifJobs, toggle: () => setNotifJobs((v) => !v) },
                            { label: t('settings.newMessages'), sub: t('settings.newMessagesSub'), icon: Mail, on: notifMsg, toggle: () => setNotifMsg((v) => !v) },
                            { label: t('settings.paymentUpdates'), sub: t('settings.paymentSub'), icon: CreditCard, on: notifPay, toggle: () => setNotifPay((v) => !v) },
                        ].map(({ label, sub, icon: Icon, on, toggle }, i) => (
                            <div key={label} className="flex items-center gap-4 px-5 py-3.5"
                                style={{ borderTop: i > 0 ? "1px solid var(--border)" : "none" }}>
                                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-orange-light">
                                    <Icon className="w-4 h-4 text-orange" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-dmsans font-semibold text-text-primary" style={{ fontSize: 14 }}>{label}</p>
                                    <p className="text-text-muted" style={{ fontSize: 12 }}>{sub}</p>
                                </div>
                                <Toggle on={on} onToggle={toggle} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Sidebar Groups (Right) ── */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Appearance */}
                    <div className="bg-bg-card rounded-2xl border overflow-hidden border-border">
                        <p className="px-5 pt-4 pb-2 font-dmsans font-bold tracking-widest text-text-muted" style={{ fontSize: 11, textTransform: "uppercase" }}>{t('settings.appearance')}</p>
                        <div className="flex items-center gap-4 px-5 py-3.5">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-bg-page">
                                <Moon className="w-4 h-4 text-text-primary" />
                            </div>
                            <div className="flex-1">
                                <p className="font-dmsans font-semibold text-text-primary" style={{ fontSize: 14 }}>{t('settings.darkMode')}</p>
                                <p className="text-text-muted" style={{ fontSize: 12 }}>{t('settings.darkModeSub')}</p>
                            </div>
                            <Toggle on={isDarkMode} onToggle={toggleTheme} />
                        </div>
                    </div>

                    {/* Support */}
                    <div className="bg-bg-card rounded-2xl border overflow-hidden border-border">
                        <p className="px-5 pt-4 pb-2 font-dmsans font-bold tracking-widest text-text-muted" style={{ fontSize: 11, textTransform: "uppercase" }}>{t('settings.support')}</p>
                        <button onClick={() => router.push("/help")}
                            className="w-full flex items-center gap-4 px-5 py-3.5 hover:bg-bg-page transition-colors">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-orange-light">
                                <HelpCircle className="w-4 h-4 text-orange" />
                            </div>
                            <div className="flex-1 text-left">
                                <p className="font-dmsans font-semibold text-text-primary" style={{ fontSize: 14 }}>{t('sidebar.help')}</p>
                                <p className="text-text-muted" style={{ fontSize: 12 }}>{t('settings.supportSub')}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-text-muted" />
                        </button>
                    </div>

                    {/* Danger Zone */}
                    <div className="bg-bg-card rounded-2xl border overflow-hidden border-border">
                        <p className="px-5 pt-4 pb-2 font-dmsans font-bold tracking-widest text-text-muted" style={{ fontSize: 11, textTransform: "uppercase" }}>{t('settings.dangerZone')}</p>
                        <button onClick={() => setLogoutConfirm(true)}
                            className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-red-500/5 transition-colors border-t border-border group-hover:bg-red-500/5">
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: "var(--red-light)" }}>
                                <LogOut className="w-4 h-4" style={{ color: "var(--red)" }} />
                            </div>
                            <span className="flex-1 font-dmsans font-medium text-left" style={{ fontSize: 14, color: "var(--red)" }}>{t('settings.logout')}</span>
                            <ChevronRight className="w-4 h-4" style={{ color: "var(--red)" }} />
                        </button>
                        <button onClick={() => setDeleteConfirm(true)}
                            className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-red-500/5 transition-colors border-t border-border">
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: "var(--red-light)" }}>
                                <Trash2 className="w-4 h-4" style={{ color: "var(--red)" }} />
                            </div>
                            <span className="flex-1 font-dmsans font-medium text-left" style={{ fontSize: 14, color: "var(--red)" }}>{t('settings.deleteAccount')}</span>
                            <ChevronRight className="w-4 h-4" style={{ color: "var(--red)" }} />
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Language Modal ── */}
            {langModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setLangModal(false)}>
                    <div className="w-full max-w-sm bg-bg-card rounded-2xl p-5 mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-outfit font-bold text-text-primary" style={{ fontSize: 18 }}>{t('settings.language')}</h3>
                            <button onClick={() => setLangModal(false)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-bg-page text-text-muted">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="max-h-[60vh] overflow-y-auto no-scrollbar">
                            {LANGUAGES.map((l) => (
                                <button key={l.code} onClick={() => { setLanguage(l.code); setLangModal(false); }}
                                    className="w-full flex items-center gap-3 py-3 border-b border-border text-left hover:bg-bg-page transition-colors">
                                    <span className="font-dmsans font-medium flex-1 text-text-primary" style={{ fontSize: 15 }}>
                                        {l.label} <span className="text-text-muted">/ {l.sub}</span>
                                    </span>
                                    {language === l.code && <Check className="w-4 h-4 text-orange" />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ── Logout Confirmation Modal ── */}
            {logoutConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setLogoutConfirm(false)}>
                    <div className="w-full max-w-sm bg-bg-card rounded-2xl p-6 mx-4 shadow-2xl text-center" onClick={(e) => e.stopPropagation()}>
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-red-500/10">
                            <LogOut className="w-6 h-6 text-red-500" />
                        </div>
                        <h3 className="font-outfit font-bold mb-2 text-text-primary" style={{ fontSize: 18 }}>{t('settings.logout')}?</h3>
                        <p className="font-dmsans mb-5 text-text-secondary" style={{ fontSize: 14 }}>{t('settings.logoutConfirm')}</p>
                        <div className="flex gap-3">
                            <button onClick={() => setLogoutConfirm(false)}
                                className="flex-1 py-2.5 rounded-xl font-dmsans font-semibold text-sm transition-all bg-bg-page text-text-primary">
                                {t('common.cancel')}
                            </button>
                            <button onClick={handleLogout}
                                className="flex-1 py-2.5 rounded-xl font-dmsans font-semibold text-sm text-white transition-all active:scale-95 bg-red-500">
                                {t('settings.logout')}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Delete Account Confirmation Modal ── */}
            {deleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setDeleteConfirm(false)}>
                    <div className="w-full max-w-sm bg-bg-card rounded-2xl p-6 mx-4 shadow-2xl text-center" onClick={(e) => e.stopPropagation()}>
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-red-500/10">
                            <AlertTriangle className="w-6 h-6 text-red-500" />
                        </div>
                        <h3 className="font-outfit font-bold mb-2 text-text-primary" style={{ fontSize: 18 }}>{t('settings.deleteAccount')}?</h3>
                        <p className="font-dmsans mb-5 text-text-secondary" style={{ fontSize: 14 }}>
                            {t('settings.deleteConfirm')}
                        </p>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleteConfirm(false)}
                                className="flex-1 py-2.5 rounded-xl font-dmsans font-semibold text-sm transition-all bg-bg-page text-text-primary">
                                {t('common.cancel')}
                            </button>
                            <button onClick={async () => {
                                setDeleteConfirm(false);
                                try {
                                    await signOut(auth);
                                } catch (e) { }
                                logout();
                                window.location.replace("/");
                            }}
                                className="flex-1 py-2.5 rounded-xl font-dmsans font-semibold text-sm text-white transition-all active:scale-95 bg-red-500">
                                {t('settings.deleteAccount')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
