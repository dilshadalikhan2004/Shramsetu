"use client";

import { Button } from "@/components/ui/button";
import { History, ShieldCheck, IndianRupee } from "lucide-react";

export default function EmployerPaymentsPage() {
    return (
        <div className="pb-20">
            <div className="bg-employer-primary px-4 py-6 text-white mb-6">
                <div className="flex items-center gap-2 mb-2 opacity-80">
                    <ShieldCheck className="w-5 h-5" />
                    <span className="text-sm font-medium">Escrow Protected</span>
                </div>
                <h1 className="text-3xl font-bold flex items-center">
                    <IndianRupee className="w-7 h-7" /> 2,400
                </h1>
                <p className="text-sm opacity-90 mt-1">Held in safe deposit</p>
            </div>

            <div className="px-4">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <History className="w-4 h-4" /> Payment History
                </h3>

                <div className="space-y-3">
                    <div className="bg-white p-3 rounded-lg border border-gray-100 flex justify-between items-center">
                        <div>
                            <p className="font-medium text-gray-900">Escrow Deposit</p>
                            <p className="text-xs text-gray-400">For: House Painting</p>
                        </div>
                        <span className="font-bold text-gray-900">- ₹2,400</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-100 flex justify-between items-center">
                        <div>
                            <p className="font-medium text-gray-900">Payment Released</p>
                            <p className="text-xs text-gray-400">To: Sunil Electrician</p>
                        </div>
                        <span className="font-bold text-green-600">- ₹800</span>
                    </div>
                </div>

                <div className="mt-8 p-4 bg-orange-50 rounded-xl border border-orange-100 text-center">
                    <h4 className="font-semibold text-orange-800 text-sm mb-2">Pending Release</h4>
                    <p className="text-xs text-orange-600 mb-4">Job "House Painting" marked complete by worker.</p>
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                        Release Payment
                    </Button>
                </div>
            </div>
        </div>
    );
}
