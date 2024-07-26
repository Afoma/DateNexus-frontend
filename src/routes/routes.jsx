import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import GetStarted from "@/components/GetStarted";
import OnboardingScreen from "@/components/Onboarding";
import Signin from "@/components/Signin";
import Signup from "@/components/Signup";
import OtpConfirmation from "@/components/OtpConfirmation";
import Passkey from "@/components/Passkey";
import CreateProfile from "@/components/CreateProfile";
import WalletActions from "@/components/WalletActions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <GetStarted /> },
      { path: "onboarding", element: <OnboardingScreen /> },
      { path: "signin", element: <Signin /> },
      { path: "signup", element: <Signup /> },
      { path: "otp", element: <OtpConfirmation /> },
      { path: "createwallet", element: <Passkey /> },
      { path: "createProfile", element: <CreateProfile /> },
      { path: "wallet", element: <WalletActions /> },
    ],
  },
]);

export default router;
