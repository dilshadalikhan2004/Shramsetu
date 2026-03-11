import { Briefcase, Building2, ShieldCheck, Sparkles } from "lucide-react";

export function FeaturesSection() {
    return (
        <>
            {/* Dual Solutions Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 text-center mb-16">
                    <h2 className="font-outfit font-black text-3xl sm:text-5xl mb-4 tracking-tight">One Platform, Dual Solutions.</h2>
                    <p className="text-gray-600 font-dmsans text-lg max-w-2xl mx-auto leading-relaxed">Whether you are looking for your next gig or need a reliable team, ShramSetu has you covered with cutting-edge verification.</p>
                </div>

                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 px-4">
                    {/* Worker Card */}
                    <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-xl shadow-blue-900/5 hover:-translate-y-2 transition-all group">
                        <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mb-8 group-hover:bg-[#e85d26] transition-colors">
                            <Briefcase className="w-7 h-7 text-[#e85d26] group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="font-outfit font-black text-2xl mb-4">I am a Worker</h3>
                        <p className="text-gray-600 mb-8 leading-relaxed">Access hundreds of daily wage jobs. Get paid on time, directly via UPI. Build your reputation and get hired for larger projects.</p>
                        <ul className="space-y-4 mb-10">
                            {[
                                "Aadhaar Verified Professional Profile",
                                "Direct Digital Payments (UPI/Bank)",
                                "Priority Matching for Urgent Jobs",
                                "Bhashini Voice & Multilingual Support"
                            ].map(item => (
                                <li key={item} className="flex items-center gap-3 text-sm font-bold text-[#0a2540]">
                                    <ShieldCheck className="w-4 h-4 text-green-500" /> {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Employer Card */}
                    <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-xl shadow-blue-900/5 hover:-translate-y-2 transition-all group">
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-8 group-hover:bg-[#0a2540] transition-colors">
                            <Building2 className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="font-outfit font-black text-2xl mb-4">I am an Employer</h3>
                        <p className="text-gray-600 mb-8 leading-relaxed">Find and hire verified, skilled workers instantly. Manage attendance via OTP and eliminate cash disbursement headaches.</p>
                        <ul className="space-y-4 mb-10">
                            {[
                                "Instant Access to Verified Workers",
                                "OTP-Based Secure Attendance Tracking",
                                "Automated Payroll & UPI Disbursement",
                                "AI-Powered Skills Matching"
                            ].map(item => (
                                <li key={item} className="flex items-center gap-3 text-sm font-bold text-[#0a2540]">
                                    <ShieldCheck className="w-4 h-4 text-green-500" /> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Core Features Grid */}
            <section className="py-24 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="font-outfit font-black text-3xl sm:text-5xl mb-4 tracking-tight">Features Built for Trust and Efficiency</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: "Verified Worker Profiles", desc: "Rigorous identity checks ensure you only hire trusted professionals." },
                            { title: "Digital Payments", desc: "Fast, transparent, and secure UPI/Bank transfers for every job." },
                            { title: "Smart Job Matching", desc: "Our algorithm connects the right skills to the right site." },
                            { title: "Attendance Verification", desc: "OTP-based entry ensures accurate daily wage calculation." },
                            { title: "Multilingual Support", desc: "Available in 22+ regional languages via Bhashini API integration." }
                        ].map((feature, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3">
                                <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-orange-500" />
                                </div>
                                <h3 className="font-bold text-lg text-[#0a2540]">{feature.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
