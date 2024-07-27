import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layouts from "./Layouts";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Cancel from "@/assets/cancel.svg";
import SmallerLogo from "@/assets/SmallerLogo.png";

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
      className="w-full rounded-[12px] bg-custom-gradient text-sm mt-4 "
    >
      Install App
    </Button>
  );
}

const Installation = () => {
  const navigate = useNavigate();
  const [canInstall, setCanInstall] = useState(!!window.deferredPrompt);

  useEffect(() => {
    const handleAppInstallable = (e) => {
      console.log("App became installable", e);
      setCanInstall(true);
    };

    const checkInstallability = () => {
      if (window.deferredPrompt) {
        console.log("deferredPrompt is available");
        setCanInstall(true);
      }
    };

    window.addEventListener("appinstallprompt", handleAppInstallable);
    window.addEventListener("appInstallable", handleAppInstallable);

    // Check immediately and after a short delay
    checkInstallability();
    setTimeout(checkInstallability, 1000);

    return () => {
      window.removeEventListener("appinstallprompt", handleAppInstallable);
      window.removeEventListener("appInstallable", handleAppInstallable);
    };
  }, []);

  const handleClose = () => {
    navigate("/onboarding");
  };

  return (
    <Layouts>
      <div className="flex flex-col items-center gap-6 justify-center">
        <Logo />
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-4xl text-gradient-custom font-semibold">
            <span className="text-black">DateN</span>exus
          </h3>
          <p className="text-custom-text-secondary text-sm text-center">
            Find Love Onchain
          </p>
        </div>
        <div className="flex flex-col items-center justify-center p-4">
          <Card className="w-full relative rounded-[24px] bg-whitish">
            <Button
              onClick={handleClose}
              className="absolute top-2 right-2 p-2"
              variant="ghost"
            >
              <img src={Cancel} alt="Icon" />
            </Button>
            <CardHeader>
              <CardTitle className="text-center text-sm font-medium text-custom-black">
                Install App
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3 justify-center mb-5">
                <div className="bg-white p-2">
                  <img src={SmallerLogo} alt="Logo" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-custom-black">
                    DateNexus
                  </h3>
                  <p className="text-xs text-custom-text-secondary">
                    datenexus.xyz
                  </p>
                </div>
              </div>
              {canInstall ? (
                <InstallButton />
              ) : (
                <p className="text-center text-sm text-custom-text-secondary">
                  App is already installed or not installable at this time.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layouts>
  );
};

export default Installation;
