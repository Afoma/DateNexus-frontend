import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import MoreInfo from "./MoreInfo";
import Cancel from "@/assets/discover/cancel.svg";
import Cupscid from "@/assets/discover/cupscid.svg";

const ExpandableProfileCard = ({
  profile,
  index,
  currentIndex,
  isExpanded,
  setIsExpanded,
}) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSwipeUp = () => {
    if (isSubscribed) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  };

  const handleSubscribe = () => {
    setIsSubscribed(true);
    setShowGrid(true);
  };

  const handleSwipeDown = () => {
    setIsExpanded(false);
  };

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg bg-[#F5F6F8] shadow-lg">
      <ScrollArea className="h-full">
        <div
          className={`transition-all duration-300 ${
            isExpanded ? "h-[40%]" : "h-[70%]"
          }`}
        >
          <img
            src={profile.profileImage}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
          {index === currentIndex && !isExpanded && (
            <div
              className="absolute bottom-0 left-0 right-0 flex justify-center p-4 cursor-pointer"
              onClick={isExpanded ? handleSwipeDown : handleSwipeUp}
            >
              {/* <div className="w-12 h-1 bg-white/50 rounded-full" /> */}
            </div>
          )}
        </div>

        <div className="p-6 flex flex-col text-sans">
          <h3 className="text-xl text-center font-normal text-[#F83E67] mb-2 ">
            {profile.name}
          </h3>
          <p className="text-[#383838] font-normal text-center mb-4">
            {profile.bio}
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="px-7 py-1 bg-[#DBDBDB] rounded-md">
              <img src={Cancel} alt="cancel" />
            </div>
            <div className="px-7 py-1 bg-custom-gradient rounded-md">
              <img src={Cupscid} alt="home" />
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
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
