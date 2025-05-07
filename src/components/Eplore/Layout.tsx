import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopCurve from "../TopCurve";
import BottomCurve from "../BottomCurve";
import BottomNavigation from "../BottomNavigation";
import { ChevronDown, ChevronUp } from "lucide-react";

const Layout = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState(true);

  return (
    <div className="h-screen relative font-sans ">
      <div className="w-full lg:w-[90%] mx-auto flex flex-col min-h-screen lg:min-h-0">
        <div className="flex-1 flex">
          <div className="lg:hidden absolute top-0 left-0 right-0">
            <TopCurve />
          </div>
          <div className="h-full w-full mb-10 lg:p-3 flex flex-col z-10">
            {children}
          </div>
          <div className="lg:hidden absolute bottom-0 right-0">
            <BottomCurve />
          </div>
        </div>

        <button
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="z-20 fixed bottom-16 right-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 shadow-lg transition-colors duration-200"
          aria-label={isNavOpen ? "Close navigation" : "Open navigation"}
        >
          {isNavOpen ? (
            <ChevronDown className="w-6 h-6" />
          ) : (
            <ChevronUp className="w-6 h-6" />
          )}
        </button>

        <AnimatePresence>
          {isNavOpen && (
            <motion.div
              className="z-10"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              <BottomNavigation />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Layout;
