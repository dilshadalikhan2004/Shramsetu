import { ShieldCheck, Globe, Star, Briefcase } from "lucide-react";

export function HowItWorksSection() {
    return (
        <section className="py-24 bg-gray-50/50 relative">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="font-outfit font-black text-3xl sm:text-5xl mb-4 tracking-tight">How ShramSetu Works</h2>
                    <p className="text-gray-600 font-dmsans text-lg max-w-2xl mx-auto leading-relaxed">A seamless, 4-step process designed for speed and security.</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative items-start">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-12 left-24 right-24 h-[2px] bg-gradient-to-r from-orange-200 via-blue-200 to-orange-200" />

                    {[
                        { step: "1", title: "Create Profile", desc: "Workers and employers create their verified profiles in minutes." },
                        { step: "2", title: "Find or Post Jobs", desc: "Workers search for jobs and employers post specific requirements." },
                        { step: "3", title: "Secure Verification", desc: "Workers check in using robust OTP or identity verification." },
                        { step: "4", title: "Digital Payments", desc: "Payments are processed directly, securely, and digitally." }
                    ].map((s, idx) => (
                        <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                            <div className="w-24 h-24 rounded-full bg-white border-4 border-[#0a2540] shadow-xl flex items-center justify-center mb-6 text-3xl font-black font-outfit text-[#0a2540]">
                                {s.step}
                            </div>
                            <h3 className="font-bold text-xl mb-3">{s.title}</h3>
                            <p className="text-gray-600">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
