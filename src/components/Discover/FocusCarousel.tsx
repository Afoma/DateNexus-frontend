import { useState, useEffect, useCallback } from "react";
import { userData } from "@/assets/data";
import EmblaCarousel from "./EmblaCarousel";
import AnimatedPagination from "./Pagination";
import { EmblaOptionsType } from 'embla-carousel'


const FocusCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const SLIDE_COUNT = 5
  const OPTIONS: EmblaOptionsType = { loop: true }


  return (
    <div className="w-full relative">
      
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
         <EmblaCarousel slides={userData} options={OPTIONS} />

      
      {/* <AnimatedPagination total={userData.length} currentIndex={currentIndex} /> */}
      
      {/* Message input */}
      <div className="w-full max-w-xl mx-auto mt-8 relative">
        <input
          type="text"
          placeholder="Message Card"
          className="w-full py-3 px-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 18.333C14.6024 18.333 18.3334 14.6021 18.3334 9.99967C18.3334 5.39728 14.6024 1.66634 10 1.66634C5.39765 1.66634 1.66671 5.39728 1.66671 9.99967C1.66671 14.6021 5.39765 18.333 10 18.333Z" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-500">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 2L11 13" stroke="#FF0080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="#FF0080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FocusCarousel;