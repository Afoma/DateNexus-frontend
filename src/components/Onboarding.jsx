import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Placeholder from "@/assets/onbordingPlaceholder.svg";
import Boarding1 from "@/assets/boarding1.png";
import Boarding2 from "@/assets/boarding2.png";
import Boarding3 from "@/assets/boarding3.png";

const OnboardingScreen = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const navigate = useNavigate();

  const screens = [
    {
      title: "Interact And Connect:",
      subtitle: "Message And Call.",
      description:
        "Communicate Easily and Build Stronger Connections Through Conversations",
      image: Boarding1,
    },
    {
      title: "Engage with Your",
      subtitle: "Ideal Matches.",
      description:
        "Start Meaningful Conversations and Build Lasting Connections",
      image: Boarding2,
    },
    {
      title: "Network with New",
      subtitle: "People in Your Field.",
      description:
        "Expand Your Professional Circle and Discover New Opportunities",
      image: Boarding3,
    },
  ];

  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    } else {
      navigate("/signin");
    }
  };

  const handleSkip = () => {
    navigate("/signin");
  };

  const isLastScreen = currentScreen === screens.length - 1;

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="flex-1 relative overflow-hidden"
        >
          <div className="relative">
            <img className="absolute mt-[80px]" src={Placeholder} alt="" />
            <img
              src={screens[currentScreen].image}
              alt="Onboarding"
              className="w-full h-full object-cover relative"
            />
          </div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white flex justify-center items-center flex-col"
          >
            <h2 className="text-xl font-semibold">
              {screens[currentScreen].title}
            </h2>
            <h3 className="text-xl font-semibold text-custom-pink">
              {screens[currentScreen].subtitle}
            </h3>
            <p className="mt-2 text-center text-sm text-custom-text-secondary">
              {screens[currentScreen].description}
            </p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
      <div className="p-4">
        <div className="flex justify-center mb-4">
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
        >
          <Button onClick={handleNext} className="w-full bg-custom-pink mb-2">
            {isLastScreen ? "Continue" : "Next"}
          </Button>
          <Button variant="ghost" onClick={handleSkip} className="w-full">
            Skip
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default OnboardingScreen;
