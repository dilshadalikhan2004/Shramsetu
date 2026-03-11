"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import { motion } from "framer-motion";
import { ArrowRight, Star, ShieldCheck, Globe } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { HeroMockup } from "@/components/landing/HeroMockup";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";

export default function RootPage() {
    const router = useRouter();
    const { isAuthenticated } = useUserStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            router.replace("/splash");
        } else {
            setMounted(true);
        }
    }, [isAuthenticated, router]);

    if (!mounted) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-[#0a2540]">
                <div className="w-8 h-8 rounded-full border-4 border-white/20 border-t-[#e85d26] animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-[#0a2540] selection:bg-[#fff1eb] selection:text-[#e85d26]">
            {/* Header / Navbar */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 h-16 sm:h-20 flex items-center px-4 sm:px-8">
                <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
                    <div className="flex items-center">
                        <Logo className="w-32 sm:w-40 pt-1" />
                    </div>

                    <Link
                        href="/auth"
                        className="h-10 sm:h-12 px-5 sm:px-6 rounded-xl bg-[#0a2540] text-white font-outfit font-bold text-sm sm:text-base flex items-center gap-2 transition-all hover:scale-105 hover:bg-[#1a3550] shadow-xl shadow-blue-900/10 active:scale-95"
                    >
                        Sign In <ArrowRight className="w-4 h-4 hidden sm:block" />
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative pt-32 pb-16 sm:pt-48 sm:pb-32 overflow-hidden px-4">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-orange-50/50 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-80 h-80 bg-blue-50/50 rounded-full blur-3xl -z-10" />

                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-center lg:text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-[#e85d26] font-outfit font-extrabold text-[10px] sm:text-[12px] uppercase tracking-wider mb-6 sm:mb-8 animate-bounce-subtle">
                            <Star className="w-3 h-3 fill-[#e85d26]" /> Trusted by 10,000+ Workers
                        </div>
                        <h1 className="font-outfit font-black text-5xl sm:text-7xl lg:text-8xl leading-[0.9] mb-6 sm:mb-8 tracking-tighter">
                            Get <span className="text-[#e85d26] underline decoration-4 decoration-orange-200 underline-offset-8">Work</span>.<br />
                            Get <span className="text-blue-600 underline decoration-4 decoration-blue-200 underline-offset-8">Paid</span>.
                        </h1>
                        <p className="font-dmsans text-lg sm:text-2xl text-gray-600 max-w-xl mb-10 sm:mb-12 leading-relaxed mx-auto lg:mx-0">
                            India's first secure matching platform for skilled labor. Join ShramSetu to find verified jobs nearby or hire skilled professionals instantly.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <Link
                                href="/auth"
                                className="w-full sm:w-auto h-14 sm:h-16 px-8 sm:px-10 rounded-2xl bg-[#e85d26] text-white font-outfit font-black text-lg sm:text-xl flex items-center justify-center gap-3 shadow-2xl shadow-orange-500/30 transition-all hover:scale-105 active:scale-95"
                            >
                                Get Started Now
                            </Link>
                            <div className="flex items-center gap-2 text-gray-500 font-bold text-sm">
                                <ShieldCheck className="w-5 h-5 text-green-500" /> 100% Aadhaar Verified
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative"
                    >
                        <HeroMockup />
                    </motion.div>
                </div>
            </section>

            {/* Extracted Landing Sections */}
            <ProblemSection />
            <HowItWorksSection />
            <FeaturesSection />

            {/* New Section 4: Skills Supported */}
            <section className="py-24 bg-[#0a2540] text-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="font-outfit font-black text-3xl sm:text-5xl mb-12 tracking-tight">Skills Supported on ShramSetu</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        {["Mason", "Welder", "Fitter", "AC Mechanic", "Fabricator", "Tiles Setter", "Bar Bender", "Machine Operator"].map((skill) => (
                            <div key={skill} className="bg-white/10 hover:bg-white/20 transition-colors py-4 px-6 rounded-2xl border border-white/5 font-semibold text-lg flex items-center justify-center">
                                {skill}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* New Section 5: Our Vision */}
            <section className="py-24 bg-white border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="font-outfit font-black text-3xl sm:text-5xl mb-8 tracking-tight">Our Vision</h2>
                    <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed font-dmsans">
                        ShramSetu aims to empower India's skilled workforce by creating a trusted digital ecosystem connecting workers and employers. We focus on absolute <span className="text-[#e85d26] font-bold">transparency</span>, <span className="text-[#e85d26] font-bold">security</span>, and <span className="text-[#e85d26] font-bold">efficiency</span> in every hire.
                    </p>
                </div>
            </section>

            {/* New Section 6: FAQ Section */}
            <section className="py-24 bg-gray-50/50">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="font-outfit font-black text-3xl sm:text-5xl mb-12 tracking-tight text-center">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {[
                            { q: "Is ShramSetu free for workers?", a: "Yes, joining and finding jobs on ShramSetu is completely free for workers." },
                            { q: "How are workers verified?", a: "We use Aadhaar and other identity verification methods to ensure the authenticity of all profiles." },
                            { q: "How do payments work?", a: "Payments are processed securely through UPI or direct bank transfers upon job completion." },
                            { q: "Is identity verification required?", a: "Yes, to maintain a trusted ecosystem, identity verification is mandatory for both workers and employers." }
                        ].map((faq, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                <h3 className="font-bold text-lg text-[#0a2540] mb-2">{faq.q}</h3>
                                <p className="text-gray-600 text-base">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#0a2540] text-white py-16 px-4 border-t border-white/5">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 sm:gap-8">
                    <div className="col-span-2">
                        <div className="flex items-center mb-6">
                            <Logo className="w-32 pt-1" variant="dark" />
                        </div>
                        <p className="text-gray-400 max-w-sm mb-8 leading-relaxed">Empowering India's skilled workforce through trust, verification, and seamless digital connections.</p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-[#e85d26]">Product</h4>
                        <ul className="space-y-4 text-sm font-medium text-gray-400">
                            <li>Find Jobs</li>
                            <li>Post Jobs</li>
                            <li>Team Mode</li>
                            <li>Pricing</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-[#e85d26]">Company</h4>
                        <ul className="space-y-4 text-sm font-medium text-gray-400">
                            <li>About Us</li>
                            <li>Contact</li>
                            <li>Privacy Policy</li>
                            <li>Terms of Service</li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto pt-16 mt-16 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500 font-medium">
                    <p>© 2026 ShramSetu. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <span className="flex items-center gap-1.5"><Globe className="w-4 h-4" /> Available in 22+ Languages</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
