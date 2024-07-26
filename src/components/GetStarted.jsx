import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import TopCurve from "./TopCurve";
import { Button } from "./ui/button";
import TopCurveWhite from "./TopCurveWhite";
import BottomCurve from "./BottomCurve";
import Logo from "./Logo";

function InstallButton() {
  const [showInstall, setShowInstall] = useState(!!window.deferredPrompt);

  useEffect(() => {
    const handleAppInstallable = () => setShowInstall(true);

    window.addEventListener("appInstallable", handleAppInstallable);

    // Check if the app is already installable
    if (window.deferredPrompt) {
      setShowInstall(true);
    }

    return () => {
      window.removeEventListener("appInstallable", handleAppInstallable);
    };
  }, []);

  if (!showInstall) return null;

  const handleInstall = async () => {
    if (window.deferredPrompt) {
      await window.installPWA();
      setShowInstall(false);
    }
  };

  return (
    <Button
      onClick={handleInstall}
      className="w-full bg-text-gradient rounded-[12px] text-whitish text-sm mt-4 h-[44px]"
    >
      Install App
    </Button>
  );
}

const GetStarted = () => {
  const { onGetStarted } = useOutletContext();

  return (
    <div className="h-screen grid lg:grid-cols-[550px_1fr] relative">
      <div className="hidden lg:grid lg:min-h-screen lg:bg-custom-gradient">
        <TopCurveWhite />
        <h3 className="text-white text-6xl text-center font-semibold">
          <span className="text-white_transparent text-4xl font-medium">
            Welcome to
          </span>{" "}
          DateNexus
        </h3>
      </div>
      <div className="flex items-center justify-center min-h-screen lg:min-h-0">
        <div className="lg:hidden absolute top-0 left-0 right-0">
          <TopCurve />
        </div>
        <div className="md:px-[170px] py-20 lg:py-0 flex flex-col items-center justify-center z-10">
          <div className="flex flex-col items-center gap-6 justify-center">
            <Logo />
            <div className="flex flex-col items-center gap-2">
              <h3 className="text-4xl text-gradient-custom font-semibold">
                <span className="text-black">DateN</span>exus
              </h3>
              <p className="text-custom-text-secondary text-sm text-center">
                An on chain dating site for creatives
              </p>
            </div>
            <Button
              className="w-full bg-text-gradient rounded-[12px] text-whitish text-sm mt-[50px] h-[44px]"
              onClick={onGetStarted}
            >
              Get Started
            </Button>
            <InstallButton />
          </div>
        </div>
        <div className="lg:hidden absolute bottom-0 right-0">
          <BottomCurve />
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
