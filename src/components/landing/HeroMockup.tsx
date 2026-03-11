"use client";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Users, Globe, ShieldCheck, Star } from "lucide-react";

export function HeroMockup() {
    return (
        <div className="aspect-square rounded-[3rem] bg-gradient-to-tr from-gray-50 to-orange-50 overflow-hidden border-8 border-white shadow-2xl rotate-3 relative">
            {/* Decorative Floating Elements */}
            <div className="absolute top-8 left-8 bg-white p-4 rounded-2xl shadow-xl z-20 animate-float">
                <MapPin className="text-[#e85d26] w-6 h-6" />
            </div>
            <div className="absolute bottom-12 right-12 bg-white p-4 rounded-2xl shadow-xl z-20 animate-float-delayed">
                <Users className="text-blue-600 w-6 h-6" />
            </div>
            {/* Dynamic UI Mockup (Replaces static image) */}
            <div className="absolute inset-0 bg-slate-50 flex flex-col items-center justify-center overflow-hidden">
                {/* Abstract Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                {/* Floating Background Job Card 1 */}
                <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                    className="absolute -right-12 top-10 w-64 bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-gray-100 opacity-60 rotate-[12deg]"
                >
                    <div className="flex gap-3 items-center mb-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center"><Briefcase className="w-5 h-5 text-orange-500" /></div>
                        <div>
                            <div className="h-3 w-20 bg-gray-200 rounded-full mb-1.5"></div>
                            <div className="h-2 w-12 bg-gray-100 rounded-full"></div>
                        </div>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full mb-1.5"></div>
                    <div className="h-2 w-2/3 bg-gray-100 rounded-full"></div>
                </motion.div>

                {/* Floating Background Job Card 2 */}
                <motion.div
                    animate={{ y: [10, -10, 10] }}
                    transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1 }}
                    className="absolute -left-16 bottom-16 w-64 bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-gray-100 opacity-50 -rotate-[8deg]"
                >
                    <div className="flex gap-3 items-center mb-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center"><Globe className="w-5 h-5 text-blue-500" /></div>
                        <div>
                            <div className="h-3 w-24 bg-gray-200 rounded-full mb-1.5"></div>
                            <div className="h-2 w-16 bg-gray-100 rounded-full"></div>
                        </div>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full mb-1.5"></div>
                    <div className="h-2 w-4/5 bg-gray-100 rounded-full"></div>
                </motion.div>

                {/* New Floating Element: Action Badge */}
                <motion.div
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
                    className="absolute top-[20%] right-6 bg-white px-4 py-2.5 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 flex items-center gap-2.5 z-20 rotate-6"
                >
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#e85d26]"></span>
                    </span>
                    <span className="text-xs font-bold text-[#0a2540]">New Match ✨</span>
                </motion.div>

                {/* New Floating Element: Payment Notification */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.5, type: "spring", stiffness: 100 }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%] max-w-[260px] bg-[#0a2540] text-white p-3 rounded-2xl shadow-[0_20px_40px_rgb(0,0,0,0.2)] z-30 flex items-center gap-3 border border-gray-700/50"
                >
                    <div className="w-9 h-9 rounded-xl bg-green-500/20 flex items-center justify-center shrink-0 border border-green-500/30">
                        <ShieldCheck className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Payment Completed</p>
                        <div className="flex justify-between items-baseline">
                            <p className="font-outfit font-black text-sm text-white">₹850</p>
                            <span className="text-[10px] font-bold text-gray-400">UPI</span>
                        </div>
                    </div>
                </motion.div>

                {/* Main Focus Card (Foreground) */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="relative z-10 w-[280px] bg-white rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-50 p-5 sm:p-6 flex flex-col items-center text-center -rotate-3"
                >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-orange-400 to-[#e85d26] p-1 mb-4 shadow-xl shadow-orange-500/20">
                        <div className="w-full h-full bg-white rounded-full border-2 border-white overflow-hidden bg-gray-50 flex items-center justify-center">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=ShramSetuWorker&backgroundColor=b6e3f4" alt="Worker Avatar" className="w-full h-full object-cover" />
                        </div>
                    </div>

                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-600 font-bold text-[10px] uppercase tracking-wider mb-3 border border-green-100">
                        <ShieldCheck className="w-3.5 h-3.5" /> Verified Pro
                    </div>

                    <h3 className="font-outfit font-black text-xl text-[#0a2540]">Ramesh Kumar</h3>
                    <p className="text-xs font-bold text-gray-400 mb-5">Master Electrician • 5km away</p>

                    <div className="w-full grid grid-cols-2 gap-3 mb-5">
                        <div className="bg-gray-50 rounded-xl p-3 flex flex-col items-center border border-gray-100">
                            <span className="text-[10px] uppercase text-gray-400 font-bold tracking-widest mb-1">Rating</span>
                            <div className="flex items-center gap-1 text-[#0a2540] font-black text-sm"><Star className="w-3.5 h-3.5 fill-orange-500 text-orange-500" /> 4.9</div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-3 flex flex-col items-center border border-gray-100">
                            <span className="text-[10px] uppercase text-gray-400 font-bold tracking-widest mb-1">Daily Rate</span>
                            <div className="text-[#0a2540] font-black text-sm">₹850</div>
                        </div>
                    </div>

                    <button className="w-full py-3.5 bg-[#0a2540] hover:bg-[#1a3550] transition-colors text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 active:scale-95">
                        View Profile
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
