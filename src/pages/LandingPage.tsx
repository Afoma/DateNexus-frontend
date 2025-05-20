/* eslint-disable no-inner-declarations */
import { motion } from "framer-motion";
import Features from "@/components/LandingComponents/Features";
import NavBar from "@/components/LandingComponents/NavBar";
import Text from "@/components/LandingComponents/Text";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import SplashScreen from "@/assets/SplashScreen.svg";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/LandingComponents/Footer";

console.log("LandingPage component is being loaded");

const LandingPage = () => {
  console.log("LandingPage component is rendering");

  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById("waitlist");
    if (waitlistSection) {
      const startPosition = window.scrollY;
      const targetPosition =
        waitlistSection.getBoundingClientRect().top + window.scrollY;
      const distance = targetPosition - startPosition;
      const duration = 1500; // Adjust this value to control the speed (in milliseconds)
      let start: number | null = null;

      function step(timestamp: number) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = Math.min(progress / duration, 1);

        window.scrollTo(
          0,
          startPosition + distance * easeInOutCubic(percentage)
        );

        if (progress < duration) {
          window.requestAnimationFrame(step);
        }
      }

      window.requestAnimationFrame(step);
    }
  };

  // Easing function for smooth animation
  const easeInOutCubic = (t: number): number =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

  console.log("About to return JSX from LandingPage");

  return (
    <div className="font-sans">
      <section>
        <NavBar />
      </section>
      <div className="px-6 lg:px-10">
        <section>
          <div className="py-[40px]">
            <Logo />
          </div>
          <div className="flex flex-col gap-4 items-center">
            <h3 className="text-sm lg:text-4xl text-grey font-semibold">
              Welcome to <span className="text-gradient-custom">DateNexus</span>
            </h3>
            <Text
              heading="An Onchain Dating App For People in Tech"
              size="text-4xl lg:text-7xl"
            >
              Introducing DateNexus - the best onchain dating app created to
              offer a refined dating experience for people that value
              intellectual compatibility.
            </Text>
          </div>
        </section>
        <section className="flex justify-center py-[40px]">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              className="w-full md:w-[400px] bg-custom-gradient h-[56px] rounded-[12px]"
              onClick={scrollToWaitlist}
            >
              Join The Waitlist Today
            </Button>
          </motion.div>
        </section>
        <section className="py-[40px] mb-[100px]">
          <Features />
        </section>
        <section className="flex justify-center py-[40px]">
          <div className="relative bg-pattern w-[280px] md:w-[400px] lg:w-[420px] h-[400px] rounded-[24px] flex justify-center">
            <img
              className="w-[186px] absolute -top-[100px]"
              src={SplashScreen}
              alt="App Screenshot"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                console.error("Failed to load splash screen image");
              }}
            />
          </div>
        </section>
        <motion.section
          id="waitlist"
          className="flex justify-center py-[40px]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Waitlist />
        </motion.section>
      </div>
      <Footer />
    </div>
  );
};

console.log("LandingPage component is being exported");

export default LandingPage;
