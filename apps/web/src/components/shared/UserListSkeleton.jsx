export default function UserListSkeleton({ length = 20 }) {
    return (
        <div className="w-full animate-pulse space-y-4 rounded p-4 shadow md:p-6">
            {[...Array(length)].map((_, index) => (
                <div key={index} className="flex items-center justify-between pt-4">
                    <div>
                        <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                        <div className="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                    <div className="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                </div>
            ))}
        </div>
    );
}
