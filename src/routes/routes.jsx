import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import GetStarted from "@/components/GetStarted";
import OnboardingScreen from "@/components/Onboarding";
import Signin from "@/components/Signin";
import Signup from "@/components/Signup";
import OtpConfirmation from "@/components/OtpConfirmation";
import Passkey from "@/components/Passkey";
import CreateProfile from "@/components/profile/CreateProfile";
import WalletActions from "@/components/WalletActions";
import InstallationGuide from "@/components/InstallationGuide";
import Installation from "@/components/Installation";
import SmartWalletSignIn from "@/components/SmartWalletSignIn";
import Waitlist from "@/components/Waitlist";
import Thanks from "@/components/Thanks";
import LandingPage from "@/pages/LandingPage";
import Verify from "@/components/Verify";
import Review from "@/components/Review";
import Farcaster from "@/components/Farcaster";
import ForgotPassword from "@/components/ForgotPassword";
import NewPassword from "@/components/NewPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/app",
    element: <App />,
    children: [
      { index: true, element: <GetStarted /> },
      { path: "onboarding", element: <OnboardingScreen /> },
      { path: "installation-guide", element: <InstallationGuide /> },
      { path: "installation", element: <Installation /> },
      { path: "signin", element: <Signin /> },
      { path: "signup", element: <Signup /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "new-password", element: <NewPassword /> },
      { path: "otp", element: <OtpConfirmation /> },
      { path: "createwallet", element: <Passkey /> },
      { path: "createProfile", element: <CreateProfile /> },
      { path: "wallet", element: <WalletActions /> },
      { path: "smartSignin", element: <SmartWalletSignIn /> },
      { path: "verify", element: <Verify /> },
      { path: "review", element: <Review /> },
      { path: "farcaster", element: <Farcaster /> },
      { path: "waitlist", element: <Waitlist /> },
      { path: "thanks", element: <Thanks /> },
    ],
  },
]);

export default router;
