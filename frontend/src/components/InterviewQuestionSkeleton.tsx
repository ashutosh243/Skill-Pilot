
const QuestionSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-xl border border-gray-200 bg-white p-5 space-y-4"
        >
          <div className="h-5 w-3/4 bg-gray-200 rounded" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-100 rounded" />
            <div className="h-4 w-11/12 bg-gray-100 rounded" />
            <div className="h-4 w-10/12 bg-gray-100 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionSkeleton;
