import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopCurve from "../TopCurve";
import BottomCurve from "../BottomCurve";
import BottomNavigation from "../BottomNavigation";
import LeftNavigation from "@/components/global/LeftNavigation";
import Header from "@/components/global/Header";
import { ChevronDown, ChevronUp } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = React.useState(true);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  return (
    <div className="min-h-screen relative  ">
      {!isMobile && (
        <div className="hidden lg:block fixed top-0 left-0 h-screen w-80 z-20">
          <LeftNavigation />
        </div>
      )}

      <div className={`lg:ml-80 flex flex-col min-h-screen`}>
        <div className="flex-1 p-0 overflow-y-auto ">{children}</div>
      </div>

      {isMobile && (
        <>
          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="z-20 fixed bottom-16 right-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full p-2 shadow-lg transition-colors duration-200"
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
                className="z-10 fixed bottom-0 left-0 right-0"
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
        </>
      )}
    </div>
  );
};

export default Layout;
