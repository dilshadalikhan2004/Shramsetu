"use client";

import { useState } from "react";
import { Check, Zap, Shield, Star, Crown, CreditCard, ArrowRight, Loader2 } from "lucide-react";
import { useTranslation } from "@/lib/i18n/TranslationProvider";
import { showToast } from "@/components/ui/animations";
import Script from "next/script";

declare global {
    interface Window {
        Razorpay: any;
    }
}

const PLANS = [
    {
        id: "basic",
        name: "Basic",
        price: "0",
        description: "Perfect for small projects",
        features: [
            "Up to 3 job postings",
            "Basic worker search",
            "Standard support",
            "Local profile visibility"
        ],
        icon: Star,
        color: "blue",
    },
    {
        id: "premium",
        name: "Premium",
        price: "999",
        description: "For fast-growing companies",
        features: [
            "Unlimited job postings",
            "Priority AI matching",
            "24/7 Priority support",
            "Advanced analytics",
            "Verified badge for jobs",
            "Bulk SMS notifications"
        ],
        icon: Crown,
        color: "orange",
        recommended: true,
    },
    {
        id: "enterprise",
        name: "Enterprise",
        price: "4,999",
        description: "Bulk hiring for large scale",
        features: [
            "Bulk Worker Hiring Tool",
            "Dedicated Account Manager",
            "Custom Contract Support",
            "API Access for ERP",
            "White-glove onboarding",
            "Unlimited verified teams"
        ],
        icon: Zap,
        color: "purple",
    }
];

export default function SubscriptionPage() {
    const { t } = useTranslation();
    const [loading, setLoading] = useState<string | null>(null);
    const [currentPlan, setCurrentPlan] = useState("basic");

    const handleUpgrade = (planId: string) => {
        if (planId === currentPlan) return;
        setLoading(planId);

        // Razorpay Options
        const options = {
            key: "rzp_test_YOUR_ID", // This should be moved to env variables
            amount: parseInt(PLANS.find(p => p.id === planId)?.price.replace(',', '') || "0") * 100,
            currency: "INR",
            name: "ShramSetu",
            description: `${planId.toUpperCase()} Subscription Plan`,
            image: "https://shramsetu.app/logo.png",
            handler: function (response: any) {
                setLoading(null);
                setCurrentPlan(planId);
                showToast(`Payment Successful! ID: ${response.razorpay_payment_id}`, "success");
            },
            prefill: {
                name: "Employer Name",
                email: "employer@example.com",
                contact: "9999999999"
            },
            theme: {
                color: "#e85d26"
            },
            modal: {
                ondismiss: function() {
                    setLoading(null);
                }
            }
        };

        try {
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Razorpay SDK failed to load", error);
            showToast("Please wait while we initialize the payment gateway...", "info");
            setLoading(null);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-20">
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                onLoad={() => console.log("Razorpay SDK Loaded")}
            />
            <header className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange/10 text-orange rounded-full text-xs font-bold tracking-widest uppercase">
                    <Zap className="w-3 h-3 fill-orange" /> Growth & Scale
                </div>
                <h1 className="text-3xl md:text-5xl font-outfit font-black text-text-primary tracking-tight">
                    {t('settings.manageSubscription')}
                </h1>
                <p className="max-w-xl mx-auto text-text-secondary font-dmsans text-lg leading-relaxed">
                    Unlock elite hiring tools and priority matching to build your dream team faster.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 px-4">
                {PLANS.map((plan) => (
                    <div 
                        key={plan.id}
                        className={`relative rounded-3xl border-2 p-8 transition-all duration-500 overflow-hidden group flex flex-col ${
                            plan.recommended 
                            ? "border-orange bg-bg-card shadow-2xl shadow-orange/10 lg:scale-105 z-10" 
                            : "border-border bg-bg-card/50 hover:bg-bg-card"
                        }`}
                    >
                        {plan.recommended && (
                            <div className="absolute top-0 right-0 bg-orange text-white px-6 py-1.5 rounded-bl-2xl font-outfit font-bold text-xs uppercase tracking-widest shadow-lg">
                                Recommended
                            </div>
                        )}

                        <div className="flex items-start justify-between mb-8">
                            <div className={`p-4 rounded-2xl ${
                                plan.color === 'orange' ? 'bg-orange/10' : 
                                plan.color === 'purple' ? 'bg-purple-500/10' : 'bg-blue-500/10'
                            }`}>
                                <plan.icon className={`w-8 h-8 ${
                                    plan.color === 'orange' ? 'text-orange' : 
                                    plan.color === 'purple' ? 'text-purple-500' : 'text-blue-500'
                                }`} />
                            </div>
                            <div className="text-right">
                                <div className="flex items-baseline justify-end gap-1">
                                    <span className="text-xl font-bold text-text-muted">₹</span>
                                    <span className="text-5xl font-black font-outfit text-text-primary tracking-tight">{plan.price}</span>
                                    <span className="text-text-muted font-bold">/mo</span>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-2xl font-outfit font-black text-text-primary mb-2">{plan.name}</h3>
                        <p className="text-text-secondary font-dmsans mb-8">{plan.description}</p>

                        <div className="space-y-4 mb-10">
                            {plan.features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                                        plan.recommended ? "bg-orange/20 text-orange" : "bg-text-muted/20 text-text-muted"
                                    }`}>
                                        <Check className="w-3 h-3 stroke-[3]" />
                                    </div>
                                    <span className="text-sm font-dmsans font-medium text-text-secondary">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-auto">
                            <button 
                                onClick={() => handleUpgrade(plan.id)}
                                disabled={currentPlan === plan.id || (loading !== null)}
                                className={`w-full h-14 rounded-2xl font-outfit font-bold text-lg transition-all flex items-center justify-center gap-3 active:scale-[0.98] ${
                                    currentPlan === plan.id
                                    ? "bg-ds-green/10 text-ds-green border-2 border-ds-green/20"
                                    : plan.recommended
                                    ? "bg-orange text-white hover:bg-orange-mid shadow-xl shadow-orange/20"
                                    : "bg-bg-page text-text-primary hover:bg-border/50 border-2 border-border"
                                }`}
                            >
                                {loading === plan.id ? (
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                ) : currentPlan === plan.id ? (
                                    <>Current Plan <Check className="w-5 h-5" /></>
                                ) : (
                                    <>Choose {plan.name} <ArrowRight className="w-5 h-5" /></>
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Trusted By Section */}
            <footer className="mt-20 text-center space-y-8 animate-fade-in">
                <p className="text-sm font-outfit font-bold text-text-muted uppercase tracking-[0.2em]">Trusted by 5,000+ Enterprises</p>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
                   <Shield className="w-8 h-8" />
                   <div className="font-outfit font-black text-2xl">RAZORPAY</div>
                   <div className="font-outfit font-black text-2xl">M-PESA</div>
                   <div className="font-outfit font-black text-2xl">STRIPE</div>
                   <Shield className="w-8 h-8" />
                </div>
            </footer>
        </div>
    );
}
