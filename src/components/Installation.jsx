import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Layouts from "./Layouts";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Cancel from "@/assets/cancel.svg";

const Installation = () => {
  const navigate = useNavigate();
  const [canInstall, setCanInstall] = useState(true);
  const [debugMessage, setDebugMessage] = useState('');

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      window.deferredPrompt = e;
      setCanInstall(true);
      setDebugMessage('Install prompt detected');
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Debug: Check if the event listener is set
    setDebugMessage('Event listener set');

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!window.deferredPrompt) {
      setDebugMessage('No deferred prompt available');
      return;
    }

    window.deferredPrompt.prompt();
    const { outcome } = await window.deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDebugMessage('User accepted the install prompt');
    } else {
      setDebugMessage('User declined the install prompt');
    }
    window.deferredPrompt = null;
    setCanInstall(false);
  };

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
          <Card className="w-full max-w-md relative rounded-[24px] bg-whitish">
            <Button
              onClick={handleClose}
              className="absolute top-2 right-2 p-2"
              variant="ghost"
            >
              <img src={Cancel} alt="Icon" />
            </Button>
            <CardHeader>
              <CardTitle className="text-center text-sm font-medium text-custom-black">
                Add To Home Screen
              </CardTitle>
            </CardHeader>
            <CardContent>
              {canInstall ? (
                <Button onClick={handleInstall}>Install</Button>
              ) : (
                <p>Installation not available</p>
              )}
              <p className="mt-4 text-sm text-gray-500">{debugMessage}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layouts>
  );
};

export default Installation;