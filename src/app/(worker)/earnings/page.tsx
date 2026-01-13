"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownLeft, Wallet, IndianRupee } from "lucide-react";

const MOCK_TRANSACTIONS = [
    { id: 1, type: 'credit', amount: 800, date: 'Today, 2:00 PM', title: 'Payment for Plumbing' },
    { id: 2, type: 'debit', amount: 500, date: 'Yesterday', title: 'Withdrawal to UPI' },
    { id: 3, type: 'credit', amount: 1200, date: '12 Jan', title: 'Payment for Painting' },
];

export default function EarningsPage() {
    return (
        <div className="pb-20">
            <div className="bg-worker-primary p-6 text-white rounded-b-3xl shadow-lg mb-6">
                <div className="flex items-center gap-2 opacity-80 mb-1">
                    <Wallet className="w-4 h-4" />
                    <span className="text-sm font-medium">Total Balance</span>
                </div>
                <h1 className="text-4xl font-bold flex items-center">
                    <IndianRupee className="w-8 h-8" /> 1,500
                </h1>
                <div className="mt-6 flex gap-3">
                    <Button className="flex-1 bg-white/20 hover:bg-white/30 text-white border-0">
                        <ArrowDownLeft className="w-4 h-4 mr-2" /> Request
                    </Button>
                    <Button className="flex-1 bg-white text-worker-primary hover:bg-gray-100">
                        <ArrowUpRight className="w-4 h-4 mr-2" /> Withdraw
                    </Button>
                </div>
            </div>

            <div className="px-4">
                <h3 className="font-bold text-gray-900 mb-4">Recent Transactions</h3>
                <div className="space-y-4">
                    {MOCK_TRANSACTIONS.map((tx) => (
                        <div key={tx.id} className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-full ${tx.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                    {tx.type === 'credit' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 text-sm">{tx.title}</p>
                                    <p className="text-xs text-gray-400">{tx.date}</p>
                                </div>
                            </div>
                            <span className={`font-bold ${tx.type === 'credit' ? 'text-green-600' : 'text-gray-900'}`}>
                                {tx.type === 'credit' ? '+' : '-'} ₹{tx.amount}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
