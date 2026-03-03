"use client";

import { Button } from "@/components/ui/button";
import { Star, MapPin, IndianRupee } from "lucide-react";

interface WorkerProps {
    id: string;
    name: string;
    role: string;
    rating: number;
    location: string;
    rate: number;
    onContact: () => void;
    onHire: () => void;
}

export const WorkerCard = ({ name, role, rating, location, rate, onContact, onHire }: WorkerProps) => {
    return (
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col gap-3">
            <div className="flex justify-between items-start">
                <div className="flex gap-3">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-slate-800 rounded-full flex items-center justify-center font-bold text-shram-neutral dark:text-gray-400">
                        {name.charAt(0)}
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{name}</h3>
                        <p className="text-sm text-shram-neutral dark:text-gray-400">{role}</p>
                    </div>
                </div>
                <div className="flex items-center text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-0.5 rounded text-xs font-bold">
                    <Star className="w-3 h-3 fill-current mr-1" /> {rating}
                </div>
            </div>

            <div className="flex items-center justify-between text-sm text-shram-neutral dark:text-gray-400 border-t border-b py-2 border-gray-50 dark:border-slate-800">
                <div className="flex items-center">
                    <MapPin className="w-3 h-3 mr-1" /> {location}
                </div>
                <div className="flex items-center font-medium text-gray-900 dark:text-white">
                    <IndianRupee className="w-3 h-3 mr-1" /> {rate}/day
                </div>
            </div>

            <div className="flex gap-2">
                <Button variant="outline" className="flex-1 text-xs h-8 dark:text-gray-200 dark:border-slate-700 dark:hover:bg-slate-800" onClick={onContact}>
                    Chat
                </Button>
                <Button variant="employer" className="flex-1 text-xs h-8" onClick={onHire}>
                    Hire
                </Button>
            </div>
        </div>
    );
};
