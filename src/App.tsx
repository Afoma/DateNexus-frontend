import { useState, useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AppLoader from "./components/AppLoader";
import { Providers } from "./components/Providers";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const hasInitialized = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const hasSeenLoader = sessionStorage.getItem("hasSeenLoader");
    if (!hasSeenLoader) {
      sessionStorage.setItem("hasSeenLoader", "true");
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleLoadingComplete = () => setIsLoading(false);
  const handleGetStarted = () => navigate("/app/installation-guide");

  return (
    <Providers>
      <div className="min-h-screen font-sans">
        <Toaster position="top-right" />
        <AnimatePresence mode="wait">
          {isLoading ? (
            <AppLoader key="loader" onLoadingComplete={handleLoadingComplete} />
          ) : (
            <div key="content">
              <Outlet context={{ onGetStarted: handleGetStarted }} />
            </div>
          )}
        </AnimatePresence>
      </div>
    </Providers>
  );
};

export default App;