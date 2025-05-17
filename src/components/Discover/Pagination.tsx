import { useCallback } from "react";

const AnimatedPagination = ({ total, currentIndex }: {total: number, currentIndex: number}) => {
  const renderDots = useCallback(() => {
    const dots = [];
    for (let i = 0; i < total; i++) {
      dots.push(
        <div
          key={i}
          className={`h-2 rounded-full transition-all duration-300 ${
            i === currentIndex 
              ? "w-6 bg-pink-500" 
              : "w-2 bg-gray-300"
          }`}
          aria-label={`Profile ${i + 1} of ${total}`}
        />
      );
    }
    return dots;
  }, [total, currentIndex]);

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      {renderDots()}
    </div>
  );
};

export default AnimatedPagination;