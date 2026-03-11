export default function StatCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-4 animate-pulse">
            <div className="flex items-start justify-between mb-3">
                <div className="h-3 bg-gray-200 rounded w-24" />
                <div className="w-8 h-8 bg-gray-100 rounded-lg" />
            </div>
            <div className="h-7 bg-gray-200 rounded w-20 mb-2" />
            <div className="h-3 bg-gray-100 rounded w-28" />
        </div>
    );
}
