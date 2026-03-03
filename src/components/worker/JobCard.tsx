"use client";

import { Button } from "@/components/ui/button";
import { MapPin, Clock, IndianRupee } from "lucide-react";

interface JobProps {
    id: string;
    title: string;
    location: string;
    salary: number;
    type: string;
    timePosted: string;
    onApply: (id: string) => void;
}

export const JobCard = ({ id, title, location, salary, type, timePosted, onApply }: JobProps) => {
    return (
        <div className="bg-card text-card-foreground p-4 mb-4 border-b border-border last:border-0 shadow-sm">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <span className="inline-block px-2 py-0.5 rounded-full bg-muted text-foreground text-xs font-medium mb-1">
                        {type}
                    </span>
                    <h3 className="text-lg font-semibold leading-tight">{title}</h3>
                </div>
                <span className="text-xs text-muted-foreground">{timePosted}</span>
            </div>

            <div className="flex flex-col gap-1 mb-4">
                <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-1" />
                    {location}
                </div>
                <div className="flex items-center text-sm font-medium">
                    <IndianRupee className="w-4 h-4 mr-1" />
                    {salary} / day
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-1" />
                    Start Immediately
                </div>
            </div>

            <Button
                variant="worker"
                className="w-full text-white font-medium"
                onClick={() => onApply(id)}
            >
                Apply Now
            </Button>
        </div>
    );
};
