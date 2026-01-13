"use client";

import { Button } from "@/components/ui/button";
import { Users, Phone, Plus } from "lucide-react";

const MOCK_TEAMS = [
    { id: 1, name: "Dwarka Painters Group", members: 5, active: true },
    { id: 2, name: "Sector 21 Electricians", members: 3, active: false },
    { id: 3, name: "Daily Wagers United", members: 12, active: true },
];

export default function TeamsPage() {
    return (
        <div className="pb-20">
            <div className="bg-worker-primary p-6 text-white rounded-b-3xl mb-6">
                <h1 className="text-2xl font-bold">My Teams</h1>
                <p className="opacity-90">Manage your work groups</p>
            </div>

            <div className="px-4">
                {MOCK_TEAMS.map((team) => (
                    <div key={team.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-100 p-3 rounded-full text-worker-primary">
                                <Users className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">{team.name}</h3>
                                <p className="text-xs text-gray-500">{team.members} Members</p>
                            </div>
                        </div>
                        {team.active ? (
                            <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded text-[10px] font-medium">Active</span>
                        ) : (
                            <span className="text-gray-400 bg-gray-50 px-2 py-0.5 rounded text-[10px] font-medium">Inactive</span>
                        )}
                    </div>
                ))}

                <button className="w-full mt-4 flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 p-4 rounded-xl text-gray-500 hover:border-worker-primary hover:text-worker-primary transition-colors">
                    <Plus className="w-5 h-5" />
                    <span className="font-medium">Create New Team</span>
                </button>
            </div>
        </div>
    );
}
