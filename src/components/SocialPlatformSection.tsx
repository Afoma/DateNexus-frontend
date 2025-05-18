import { GithubIcon, LinkedinIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { PuffLoader } from "react-spinners";

// Configuration for OAuth providers
const config = {
  github: {
    callbackUrl:
      process.env.NEXT_PUBLIC_GITHUB_CALLBACK_URL || window.location.origin,
  },
  twitter: {
    callbackUrl:
      process.env.NEXT_PUBLIC_TWITTER_CALLBACK_URL || window.location.origin,
  },
  linkedin: {
    callbackUrl:
      process.env.NEXT_PUBLIC_LINKEDIN_CALLBACK_URL || window.location.origin,
  },
};

const handleOAuthRedirect = (provider: string) => {
  // const baseURL = "http://localhost:7070/api/v1";
  const baseURL = "https://datenexus-be.onrender.com/api/v1";

  // Save selected provider to session to read it back after OAuth flow
  sessionStorage.setItem("oauth_provider", provider);

  const oauthURL = `${baseURL}/oauth/${provider}?redirect_uri=${
    process.env.VITE_BASE_URL || window.location.origin
  }/app/createProfile?`;

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

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("user"); // JWT alias
    const code = queryParams.get("code");
    const state = queryParams.get("state");
    const error = queryParams.get("error");

    const storedProvider = sessionStorage.getItem("oauth_provider");

    if (token) {
      console.log("Received token:", token);
      // localStorage.setItem("jwt", token);
      sessionStorage.removeItem("oauth_provider");
      return;
    }

    if (error) {
      console.error("OAuth error:", error);
      sessionStorage.removeItem("oauth_provider");
      window.history.replaceState({}, document.title, window.location.pathname);
      return;
    }

    if (code && storedProvider && !oauthProcessing) {
      setOauthProcessing(true);
      console.log(`Processing ${storedProvider} code...`);

      fetch(
        `https://datenexus-be.onrender.com/api/v1/oauth/${storedProvider}/callback?code=${code}&state=${
          state || ""
        }`,
        {
          method: "GET",
          credentials: "include",
          headers: { Accept: "application/json" },
        }
      )
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then((data) => {
          console.log(`${storedProvider} auth success:`, data);
        })
        .catch((err) => {
          console.error(`${storedProvider} auth error:`, err);
        })
        .finally(() => {
          sessionStorage.removeItem("oauth_provider");
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );
          setOauthProcessing(false);
        });
    }
  }, [oauthProcessing]);

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
