import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import GetStarted from "@/components/GetStarted";
import OnboardingScreen from "@/components/Onboarding";
import Signin from "@/components/Signin";
import Signup from "@/components/Signup";
import OtpConfirmation from "@/components/OtpConfirmation";

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
    ],
  },
]);

export default router;
