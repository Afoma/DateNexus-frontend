import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import MoreInfo from "./MoreInfo";
import {Profile} from "types"


interface ExpandableProfileCardProps {
  profile: Profile;
  index: number;
  currentIndex: number;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

const ExpandableProfileCard: React.FC<ExpandableProfileCardProps> = ({
  profile,
  index,
  currentIndex,
  isExpanded,
  setIsExpanded,
}) => {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const handleSwipeUp = (): void => {
    if (isSubscribed) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  };

  const handleSwipeDown = (): void => {
    setIsExpanded(false);
  };


  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg bg-[#F5F6F8] shadow-lg transition-all duration-300 embla__slide__number">
      <ScrollArea className="h-full">
        {/* Image section */}
        <div
          className={`transition-all duration-300 ${
            isExpanded ? "h-[40%]" : "h-[70%]"
          }`}
        >
          {profile.profileImage ? (
            <img
              src={profile.profileImage}
              alt={profile.name}
              className="w-full h-full object-cover"
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = "https://via.placeholder.com/400x500"; 
              }}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No Image</span>
            </div>
          )}
          
          {/* Swipe indicator only shows for current card when not expanded */}
          {index === currentIndex && !isExpanded && (
            <div
              className="absolute bottom-0 left-0 right-0 flex justify-center p-4 cursor-pointer"
              onClick={isExpanded ? handleSwipeDown : handleSwipeUp}
            >
              {/* Optional swipe indicator - uncomment if needed */}
              <div className="w-12 h-1 bg-white/50 rounded-full" />
            </div>
          )}
        </div>

        {/* Profile info section */}
        <div className="p-6 flex flex-col text-sans">
          <h3 className="text-xl text-center font-normal text-[#F83E67] mb-2">
            {profile.name || "No Name"}
          </h3>
          <p className="text-[#383838] font-normal text-center mb-4">
            {profile.bio || "No bio available"}
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="px-7 py-1 bg-[#DBDBDB] rounded-md">
              <img src="/assets/discover/cancel.svg" alt="cancel" />
            </div>
            <div className="px-7 py-1 bg-custom-gradient rounded-md">
              <img src="/assets/discover/cupscid.svg" alt="home" />
            </div>
          </div>
          
          {/* Add a toggle button to test expanding */}
          {index === currentIndex && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-4 text-blue-500 text-center"
            >
              {isExpanded ? "Show less" : "Show more"}
            </button>
          )}
        </div>

        {/* Expanded info section */}
        <AnimatePresence>
          {isExpanded && index === currentIndex && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-50 border-t border-gray-200"
            >
              <MoreInfo data={profile} />
            </motion.div>
          )}
        </AnimatePresence>
      </ScrollArea>
    </div>
  );
};

export default ExpandableProfileCard;