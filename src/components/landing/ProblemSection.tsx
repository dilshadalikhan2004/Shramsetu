import { ShieldCheck, Globe, Star } from "lucide-react";

export function ProblemSection() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="font-outfit font-black text-3xl sm:text-5xl mb-12 tracking-tight">The Problem with Informal Hiring</h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
                    <div className="bg-orange-50/50 p-8 rounded-3xl border border-orange-100">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                            <ShieldCheck className="w-6 h-6 text-orange-500" />
                        </div>
                        <h3 className="font-bold text-xl mb-3 text-[#0a2540]">Lack of Trust</h3>
                        <p className="text-gray-600 leading-relaxed">No reliable way to verify identity or past work experience, leading to hiring risks and disputes.</p>
                    </div>
                    <div className="bg-blue-50/50 p-8 rounded-3xl border border-blue-100">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                            <Globe className="w-6 h-6 text-blue-500" />
                        </div>
                        <h3 className="font-bold text-xl mb-3 text-[#0a2540]">Poor Discoverability</h3>
                        <p className="text-gray-600 leading-relaxed">Workers struggle to find consistent nearby jobs, and employers rely on slow word-of-mouth.</p>
                    </div>
                    <div className="bg-green-50/50 p-8 rounded-3xl border border-green-100">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                            <Star className="w-6 h-6 text-green-500" />
                        </div>
                        <h3 className="font-bold text-xl mb-3 text-[#0a2540]">Payment Issues</h3>
                        <p className="text-gray-600 leading-relaxed">Delayed or disputed cash payments create financial instability for the daily wage workforce.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
