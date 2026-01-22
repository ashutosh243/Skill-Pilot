const LearningPathSkeleton: React.FC = () => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6  mx-auto animate-pulse">

            {/* Goal */}
            <div className="mb-8">
                <div className="h-4 w-24 bg-gray-300 rounded mb-2" />
                <div className="h-6 w-3/4 bg-gray-200 rounded" />
            </div>

            {/* Timeline */}
            <div className="relative pl-8 space-y-6">
                {/* Vertical line */}
                <div className="absolute left-3 top-0 bottom-0 w-1 bg-gray-200 rounded" />
                {[1, 2, 3, 4].map((_, index) => (
                    <div key={index} className="relative">
                        <div className="absolute left-[-2px] top-2 h-4 w-4 bg-gray-300 rounded-full" />


                        <div className="border border-slate-300 rounded-lg p-4 ml-4">
                            <div className="h-3 w-16 bg-gray-300 rounded mb-2" />
                            <div className="h-5 w-1/2 bg-gray-200 rounded mb-2" />
                            <div className="h-4 w-full bg-gray-200 rounded mb-1" />
                            <div className="h-4 w-5/6 bg-gray-200 rounded" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-8">
                <div className="h-10 w-24 bg-gray-300 rounded-lg" />
                <div className="h-10 w-24 bg-gray-300 rounded-lg" />
                <div className="h-10 w-24 bg-gray-300 rounded-lg" />
            </div>
        </div>
    );
};

export default LearningPathSkeleton;
