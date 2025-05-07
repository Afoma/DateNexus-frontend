import { useState, useEffect, useCallback } from "react";
import { userData } from "@/assets/data";
import ExpandableProfileCard from "./ExpandableProfileCard";
import EmblaCarousel from "./EmblaCarousel";
import AnimatedPagination from "./Pagination";

const FocusCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating && !isExpanded) {
        handleNext();
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [currentIndex, isAnimating, isExpanded]);

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === userData.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? userData.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const getCardClass = useCallback(
    (index) => {
      const baseClass =
        "absolute flex flex-col bg-[#F5F6F8] rounded-xl shadow-lg overflow-hidden transition-all duration-500 ease-in-out overflow-hidden";

      // Set current card to 60% width
      const currentCardClass =
        "w-[90%] lg:w-[60%] h-[600px] left-1/2 -translate-x-1/2 z-10 opacity-100";
      const sideCardClass = "w-[25%] h-[450px] opacity-50";

      if (index === currentIndex) {
        return `${baseClass} ${currentCardClass}`;
      }
      if (index === (currentIndex - 1 + userData.length) % userData.length) {
        return `${baseClass} ${sideCardClass} left-0`;
      }
      if (index === (currentIndex + 1) % userData.length) {
        return `${baseClass} ${sideCardClass} right-0`;
      }
      return `${baseClass} w-0 h-0 translate-x-full opacity-0`;
    },
    [currentIndex]
  );

  return (
    <div className="w-full relative ">
      {/* Progress Indicators */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {userData.map((_, index) => (
          <div
            key={index}
            className={`w-10 h-1 rounded transition-colors duration-300 ${
              index === currentIndex
                ? "bg-gradient-to-r from-[#F83E67] to-[#A50976]"
                : "bg-[#F5F6F8]"
            }`}
          />
        ))}
      </div>
      {/* Carousel container */}
      <EmblaCarousel
        slides={userData}
        options={{
          loop: true,
          containScroll: "trimSnaps",
          selectedClass: "embla__slide--selected",
          draggableClass: "embla__slide--draggable",
        }}
        onPrev={handlePrev}
        onNext={handleNext}
      >
        {userData.map((profile, index) => (
          <div key={profile.id} className={getCardClass(index)}>
            <ExpandableProfileCard
              profile={profile}
              index={index}
              currentIndex={currentIndex}
              isExpanded={isExpanded}
              setIsExpanded={setIsExpanded}
            />
          </div>
        ))}
      </EmblaCarousel>
      <AnimatedPagination total={userData.length} currentIndex={currentIndex} />
    </div>
  );
};

export default FocusCarousel;
