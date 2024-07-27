import { useState, useEffect, useRef } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AppLoader from "./components/AppLoader";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const hasInitialized = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const hasSeenLoader = sessionStorage.getItem("hasSeenLoader");
    if (location.pathname === "/" && !hasSeenLoader) {
      sessionStorage.setItem("hasSeenLoader", "true");
    } else {
      setIsLoading(false);
    }
  }, [location.pathname]);

  const handleLoadingComplete = () => setIsLoading(false);
  const handleGetStarted = () => navigate("/installation-guide");

  return (
    <div className="min-h-screen font-sans">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <AppLoader key="loader" onLoadingComplete={handleLoadingComplete} />
        ) : (
          <div key="content">
            {location.pathname === "/" ? (
              <Outlet context={{ onGetStarted: handleGetStarted }} />
            ) : (
              <Outlet />
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
