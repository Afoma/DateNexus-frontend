import React from "react";
import { motion } from "framer-motion";

const AnimatedPagination = ({ total, currentIndex }) => {
  return (
    <div className="fixed bottom-8 left-0 right-0 z-50 ">
      <div className="max-w-xl mx-auto flex items-center justify-center gap-3">
        {Array.from({ length: total }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ scale: 1 }}
            animate={{
              scale: index === currentIndex ? 1.5 : 1,
            }}
            transition={{ duration: 0.3 }}
            className={`rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-5 h-5 bg-gradient-to-r from-[#F83E67] to-[#A50976] shadow-lg"
                : "w-4 h-4 bg-[#F5F6F8]"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedPagination;
