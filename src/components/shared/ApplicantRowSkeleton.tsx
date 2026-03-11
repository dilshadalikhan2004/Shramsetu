export default function ApplicantRowSkeleton() {
    return (
        <div className="flex items-center gap-3 p-4 animate-pulse">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0" />
            <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-36 mb-2" />
                <div className="h-3 bg-gray-100 rounded w-48" />
            </div>
            <div className="h-8 bg-gray-100 rounded-xl w-24" />
        </div>
    );
}
