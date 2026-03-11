"use client";

import { useEffect, useState } from "react";
import { Crown, Users, Star, Trophy, UserPlus, Shield } from "lucide-react";
import { AnimatedList, AnimatedListItem, AnimatedButton, AnimatedNumber, FadeIn, showToast } from "@/components/ui/animations";
import { motion } from "framer-motion";
import { useUserStore } from "@/store/useUserStore";
import EmptyState from "@/components/shared/EmptyState";
import { useTranslation } from "@/lib/i18n/TranslationProvider";

interface Team {
    id: string;
    name: string;
    specialty: string;
    rating_avg: number;
    jobs_done: number;
    owner_id: string;
    member_count?: number;
}

export default function TeamsPage() {
    const { t } = useTranslation();
    const { generalProfile } = useUserStore();
    const [myTeam, setMyTeam] = useState<Team | null>(null);
    const [discoverTeams, setDiscoverTeams] = useState<Team[]>([]);
    const [joinedIds, setJoinedIds] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const userId = generalProfile?.id;
            setLoading(true);

            // No backend connected yet — show empty state
            const allTeams: any[] = [];
            const memberTeamIds: string[] = [];

            setJoinedIds(new Set());
            setMyTeam(null);
            setDiscoverTeams([]);

            setLoading(false);
        }
        fetchData();
    }, [generalProfile?.id]);

    const handleToggleJoin = async (teamId: string) => {
        const userId = generalProfile?.id;
        if (!userId) { showToast(t('teams.loginFirst'), "warning"); return; }

        if (joinedIds.has(teamId)) {

            setJoinedIds(prev => { const n = new Set(prev); n.delete(teamId); return n; });
            showToast(t('teams.leftTeam'), "info");
        } else {
            const error = null;
            if (error) { showToast(t('teams.failedToJoin'), "error"); return; }
            setJoinedIds(prev => new Set([...prev, teamId]));
            showToast(t('teams.joinedTeam'), "success");
        }
    };

    return (
        <div className="space-y-5">
            <FadeIn>
                <h1 className="font-outfit font-bold" style={{ fontSize: 24, color: "#111827" }}>{t('teams.title')}</h1>
            </FadeIn>

            {/* My Team */}
            {myTeam && (
                <FadeIn delay={0.1}>
                    <div className="bg-gradient-to-br from-[#0a2540] to-[#1a3a5c] rounded-2xl p-5 text-white">
                        <div className="flex items-center gap-2 mb-3">
                            <Crown className="w-5 h-5 text-amber-400" />
                            <span className="font-outfit font-bold">{myTeam.name}</span>
                            <Shield className="w-4 h-4 text-green-400 ml-2" />
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-4">
                            <div>
                                <p className="text-xs text-white/60">{t('teams.members')}</p>
                                <AnimatedNumber value={myTeam.member_count ?? 0} className="font-outfit font-bold text-lg" />
                            </div>
                            <div>
                                <p className="text-xs text-white/60">{t('teams.rating')}</p>
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                    <span className="font-outfit font-bold text-lg">{myTeam.rating_avg}</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-white/60">{t('teams.jobsDone')}</p>
                                <AnimatedNumber value={myTeam.jobs_done} className="font-outfit font-bold text-lg" />
                            </div>
                        </div>
                    </div>
                </FadeIn>
            )}

            {/* Discover Section */}
            <FadeIn delay={0.2}>
                <div className="flex items-center justify-between">
                    <h2 className="font-outfit font-semibold" style={{ fontSize: 16, color: "#111827" }}>
                        {t('teams.discoverSquads')}
                    </h2>
                </div>
            </FadeIn>

            {loading ? (
                <div className="space-y-3">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="bg-white rounded-2xl border p-4 animate-pulse" style={{ borderColor: "#e5e7eb" }}>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-gray-200 rounded-xl" />
                                <div className="flex-1">
                                    <div className="h-4 bg-gray-200 rounded w-32 mb-1" />
                                    <div className="h-3 bg-gray-100 rounded w-20" />
                                </div>
                                <div className="h-9 bg-gray-100 rounded-xl w-20" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : discoverTeams.length === 0 && !myTeam ? (
                <EmptyState
                    icon={<Users className="w-8 h-8" />}
                    title={t('teams.noTeamsYet')}
                    subtitle={t('teams.beFirstSquad')}
                />
            ) : (
                <AnimatedList className="space-y-3">
                    {discoverTeams.map((team) => (
                        <AnimatedListItem key={team.id}>
                            <motion.div
                                className="bg-white rounded-2xl border p-4"
                                style={{ borderColor: "#e5e7eb" }}
                                whileHover={{ y: -2, boxShadow: "0 8px 20px rgba(0,0,0,0.08)" }}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                                            {team.name[0]}
                                        </div>
                                        <div>
                                            <p className="font-outfit font-semibold" style={{ fontSize: 15, color: "#111827" }}>{team.name}</p>
                                            <div className="flex items-center gap-3 mt-0.5">
                                                <span className="text-xs text-gray-500">{team.specialty}</span>
                                                <span className="flex items-center gap-1 text-xs text-gray-500">
                                                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                                    {team.rating_avg}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    <Users className="w-3 h-3 inline mr-0.5" />{team.member_count}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <AnimatedButton
                                        onClick={() => handleToggleJoin(team.id)}
                                        tapScale={0.93}
                                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-dmsans font-semibold text-sm"
                                        style={{
                                            background: joinedIds.has(team.id) ? "#f3f4f6" : "#0a2540",
                                            color: joinedIds.has(team.id) ? "#6b7280" : "white",
                                        }}
                                    >
                                        {joinedIds.has(team.id) ? t('teams.leave') : <>
                                            <UserPlus className="w-4 h-4" /> {t('teams.join')}
                                        </>}
                                    </AnimatedButton>
                                </div>
                            </motion.div>
                        </AnimatedListItem>
                    ))}
                </AnimatedList>
            )}
        </div>
    );
}
