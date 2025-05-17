import { GithubIcon, LinkedinIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { PuffLoader } from "react-spinners";

// Simple function to redirect to OAuth provider
const handleOAuthRedirect = (provider: string) => {
  // Use the backend URL you specified
  const baseURL = "https://datenexus-be.onrender.com/api/v1";

  // Create the OAuth URL for the specified provider
  const oauthURL = `${baseURL}/api/v1/oauth/${provider}/`;

  // Redirect to the OAuth endpoint
  window.location.href = oauthURL;
};

// Modal component for "Coming Soon" message
const ComingSoonModal = ({
  isOpen,
  onClose,
  platformName,
}: {
  isOpen: boolean;
  onClose: () => void;
  platformName: string;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal content */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-[#f83e67] to-[#a50976] rounded-full flex items-center justify-center mb-4">
            <span className="text-white text-2xl font-bold">!</span>
          </div>

          <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>

          <p className="text-[#6d6d6d] mb-6">
            Connection with{" "}
            <span className="font-medium text-[#383838]">{platformName}</span>{" "}
            will be available soon! We're working hard to bring this integration
            to you.
          </p>

          <Button
            onClick={onClose}
            className="bg-gradient-to-r from-[#f83e67] to-[#a50976] text-white rounded-xl px-8 py-2"
          >
            Got it
          </Button>
        </div>
      </div>
    </div>
  );
};

// Social platform options data
const socialPlatforms = [
  {
    name: "GitHub",
    icon: <GithubIcon className="w-6 h-6" />,
    provider: "github",
    available: true,
  },
  {
    name: "X/Twitter",
    icon: (
      <img className="w-6 h-6" alt="Token ens" src="/assets/onboarding/x.svg" />
    ),
    provider: "twitter",
    available: true,
  },
  {
    name: "LinkedIn",
    icon: <LinkedinIcon className="w-6 h-6" />,
    provider: "linkedin",
    available: false,
  },
  {
    name: "ENS",
    icon: (
      <img
        className="w-7 h-7"
        alt="Token ens"
        src="/assets/onboarding/ens.svg"
      />
    ),
    provider: "ens",
    available: false,
  },
  {
    name: "Base",
    icon: (
      <img
        className="w-7 h-7 object-cover"
        alt="Element"
        src="/assets/onboarding/token_base.svg"
      />
    ),
    provider: "base",
    available: false,
  },
  {
    name: "Lens",
    icon: (
      <img
        className="w-7 h-7 object-cover"
        alt="Lens Protocol"
        src="/assets/onboarding/lens.svg"
      />
    ),
    provider: "lens",
    available: false,
  },
  {
    name: "Farcaster",
    icon: (
      <img
        className="w-7 h-7"
        alt="Simple icons"
        src="/assets/onboarding/farcaster.svg"
      />
    ),
    provider: "farcaster",
    available: false,
  },
  {
    name: "Talent Protocol",
    icon: (
      <img
        className="w-7 h-7"
        alt="Simple icons"
        src="/assets/onboarding/talent.svg"
      />
    ),
    provider: "talent",
    available: false,
  },
];

const SocialPlatformSection = () => {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [oauthProcessing, setOauthProcessing] = useState(false);

  // Effect to handle OAuth callback
  useEffect(() => {
    // Check for GitHub OAuth callback in URL params
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");
    const error = queryParams.get("error");
    const state = queryParams.get("state"); // If you're using state parameter

    // If we have a code and we haven't processed this OAuth callback yet
    if (code && !oauthProcessing) {
      setOauthProcessing(true);

      // Log that we're processing the callback
      console.log("Detected GitHub authorization code, processing...");

      // Define your backend URL
      const baseURL = "https://datenexus-be.onrender.com/api/v1";

      // Call your backend endpoint to process the code
      fetch(`${baseURL}/oauth/github/callback?code=${code}`, {
        method: "GET",
        credentials: "include", // Include cookies if needed
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Successfully processed GitHub authentication:", data);
          // You can update UI or state based on successful authentication
          // For example, you might display a success message or update user profile
        })
        .catch((err) => {
          console.error("Error processing GitHub authentication:", err);
          // You might want to show an error message to the user
        })
        .finally(() => {
          // Clean up the URL parameters regardless of success/failure
          const cleanUrl = window.location.pathname;
          window.history.replaceState({}, document.title, cleanUrl);
          setOauthProcessing(false);
        });
    }

    // Handle potential errors from OAuth
    if (error) {
      console.error("OAuth error:", error);
      // Clean up the URL parameters
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, [oauthProcessing]); // Only re-run if oauthProcessing changes

  // Handle the connect button click
  const handleSocialConnect = (platform: string, available: boolean) => {
    if (available) {
      setLoadingProvider(platform);
      handleOAuthRedirect(platform);
    } else {
      // Show the coming soon modal
      setSelectedPlatform(platform === "linkedin" ? "LinkedIn" : platform);
      setModalOpen(true);
    }
  };

  return (
    <>
      <div className="bg-[#f5f6f8] rounded-2xl p-4 mb-6">
        <p className="font-medium text-[#383838] text-base text-center">
          Your first selection populates your Username, Profile picture and Bio
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {socialPlatforms.map((platform) => (
          <div
            key={platform.name}
            className="bg-[#f5f6f8] rounded-2xl p-4 md:p-6 flex flex-col justify-between items-center gap-2"
          >
            {platform.icon}
            <span className="text-sm font-medium text-center">
              {platform.name}
            </span>
            <Button
              type="button"
              onClick={() =>
                handleSocialConnect(platform.provider, platform.available)
              }
              disabled={
                loadingProvider === platform.provider || oauthProcessing
              }
              className="w-full bg-gradient-to-r from-[#f83e67] to-[#a50976] hover:bg-[#d42e63] text-white rounded-xl flex items-center justify-center"
            >
              {loadingProvider === platform.provider ||
              (oauthProcessing && platform.provider === "github") ? (
                <PuffLoader color="#ffffff" size={20} />
              ) : (
                "Connect"
              )}
            </Button>
          </div>
        ))}
      </div>

      {/* Coming Soon Modal */}
      <ComingSoonModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        platformName={selectedPlatform}
      />
    </>
  );
};

export default SocialPlatformSection;
