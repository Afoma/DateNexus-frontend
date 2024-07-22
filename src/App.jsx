import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import AppLoader from "./components/AppLoader";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setShowContent(true), 100);
    }, 6000);

    return () => clearTimeout(loadingTimer);
  }, []);

  const handleGetStarted = () => {
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen font-sans">
      {isLoading && <AppLoader />}
      <div
        className={`transition-opacity duration-1000 ease-in-out ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        {!isLoading && (
          location.pathname === '/' ? 
            <Outlet context={{ onGetStarted: handleGetStarted }} /> :
            <Outlet />
        )}
      </div>
    </div>
  );
};

export default App;