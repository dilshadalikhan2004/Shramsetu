export default function JobCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-4 animate-pulse">
            <div className="flex justify-between mb-3">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-xl" />
                    <div>
                        <div className="h-4 bg-gray-200 rounded w-36 mb-2" />
                        <div className="h-3 bg-gray-200 rounded w-28" />
                    </div>
                </div>
                <div className="h-5 bg-gray-200 rounded w-20" />
            </div>
            <div className="h-px bg-gray-100 mb-3" />
            <div className="flex gap-4 mb-3">
                <div className="h-4 bg-gray-100 rounded w-32" />
                <div className="h-4 bg-gray-100 rounded w-24" />
            </div>
            <div className="h-11 bg-gray-100 rounded-xl w-full" />
        </div>
    );
}
