import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Boarding1Mobile from "@/assets/onBoarding1.svg";
import Boarding2Mobile from "@/assets/onBoarding2.svg";
import Boarding3Mobile from "@/assets/onBoarding3.svg";
import Boarding1Desktop from "@/assets/onboard1.svg";
import Boarding2Desktop from "@/assets/onboard2.png";
import Boarding3Desktop from "@/assets/onboard3.svg";

const OnboardingScreen = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const navigate = useNavigate();

  const screens = [
    {
      title: "Network with New",
      subtitle: "People in Your Field.",
      description:
        "Expand Your Professional Circle and Discover New Opportunities",
      imageMobile: Boarding1Mobile,
      imageDesktop: Boarding1Desktop,
    },
    {
      title: "Engage with Your",
      subtitle: "Ideal Matches.",
      description:
        "Start Meaningful Conversations and Build Lasting Connections",
      imageMobile: Boarding2Mobile,
      imageDesktop: Boarding2Desktop,
    },
    {
      title: "Interact And Connect",
      subtitle: "Message And Call.",
      description:
        "Communicate Easily and Build Stronger Connections Through Conversations",
      imageMobile: Boarding3Mobile,
      imageDesktop: Boarding3Desktop,
    },
  ];

  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    } else {
      navigate("/app/signin");
    }
  };

  const handleSkip = () => {
    navigate("/app/signin");
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: () => {
      if (currentScreen > 0) {
        setCurrentScreen(currentScreen - 1);
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const isLastScreen = currentScreen === screens.length - 1;

  return (
    <div
      className="h-screen flex flex-col font-sans overflow-hidden"
      {...swipeHandlers}
    >
      <div className="flex flex-col justify-between h-full md:flex-row">
        <div className="md:w-1/2 md:h-full relative overflow-hidden">
          <AnimatePresence initial={false} custom={currentScreen}>
            <motion.div
              key={currentScreen}
              custom={currentScreen}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="w-full h-full"
            >
              <picture>
                <source
                  media="(min-width: 768px)"
                  srcSet={screens[currentScreen].imageDesktop}
                />
                <img
                  src={screens[currentScreen].imageMobile}
                  alt="Onboarding"
                  className="w-full h-full object-cover relative"
                />
              </picture>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="py-12 md:w-1/2 md:flex md:flex-col md:justify-center md:px-12">
          <motion.div
            key={currentScreen}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 text-center bg-gradient-to-t from-white md:bg-none md:p-0"
          >
            <h2 className="text-xl md:text-4xl font-semibold text-gradient-custom">
              {screens[currentScreen].title}
            </h2>
            <h3 className="text-xl md:text-4xl font-semibold text-custom-black">
              {screens[currentScreen].subtitle}
            </h3>
            <p className="mt-2 text-center text-sm md:text-lg text-custom-text-secondary text-balance">
              {screens[currentScreen].description}
            </p>
          </motion.div>

          <div className="p-4 md:mt-8">
            <div className="flex justify-center mb-4 md:mb-8">
              {screens.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-2 h-2 rounded-full mx-1 ${
                    index === currentScreen ? "bg-custom-pink" : "bg-gray-300"
                  }`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: index === currentScreen ? 1.2 : 1 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="flex flex-col"
            >
              <Button
                onClick={handleNext}
                className="w-full md:w-auto text-whitish font-semibold bg-text-gradient mb-2 md:mb-0 h-[44px] rounded-[12px] px-12"
              >
                {isLastScreen ? "Continue" : "Next"}
              </Button>
              <Button
                variant="ghost"
                onClick={handleSkip}
                className="w-full md:w-auto text-custom-pink text-xs font-medium"
              >
                Skip
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;
