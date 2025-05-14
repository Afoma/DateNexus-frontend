import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import GetStarted from '@/components/GetStarted';
import OnboardingScreen from '@/components/Onboarding';
import Signin from '@/components/Signin';
import Signup from '@/components/Signup';
import OtpConfirmation from '@/components/OtpConfirmation';
import Passkey from '@/components/Passkey';
import CreateProfile from '@/components/CreateProfile';
import WalletActions from '@/components/WalletActions';
import InstallationGuide from '@/components/InstallationGuide';
import Installation from '@/components/Installation';
import SmartWalletSignIn from '@/components/SmartWalletSignIn';
import Waitlist from '@/components/Waitlist';
import Thanks from '@/components/Thanks';
import LandingPage from '@/pages/LandingPage';
import Verify from '@/components/Verify';
import Review from '@/components/Review';
import Farcaster from '@/components/Farcaster';
import ForgotPassword from '@/components/ForgotPassword';
import NewPassword from '@/components/NewPassword';
import Explore from '@/pages/Explore';
import Discover from '@/pages/Discover';
import CommunityChatDemo from '@/pages/CommunityChat';
import ChatPage from '@/pages/ChatPage';
import MessagesPage from '@/pages/MessagesPage';
import MapSelection from '@/components/MapSelection/MapSelection';
import MatchPage from '@/pages/MatchPage';
import UploadYourPhotos from '@/pages/UploadPhotos';
import ProfileDetails from '@/pages/ProfileDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/app',
    element: <App />,
    children: [
      { index: true, element: <GetStarted /> },
      { path: 'onboarding', element: <OnboardingScreen /> },
      { path: 'installation-guide', element: <InstallationGuide /> },
      { path: 'installation', element: <Installation /> },
      { path: 'signin', element: <Signin /> },
      { path: 'signup', element: <Signup /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'new-password', element: <NewPassword /> },
      { path: 'otp', element: <OtpConfirmation /> },
      { path: 'createwallet', element: <Passkey /> },
      { path: 'createProfile', element: <CreateProfile /> },
      { path: 'upload-photos', element: <UploadYourPhotos /> },
      { path: 'wallet', element: <WalletActions /> },
      { path: 'smartSignin', element: <SmartWalletSignIn /> },
      { path: 'verify', element: <Verify /> },
      { path: 'review', element: <Review /> },
      { path: 'farcaster', element: <Farcaster /> },
      { path: 'waitlist', element: <Waitlist /> },
      { path: 'thanks', element: <Thanks /> },
      { path: 'discover', element: <Discover /> },
      { path: 'explore', element: <Explore /> },
      { path: 'chat', element: <MessagesPage /> },
      { path: 'chat/:chatId', element: <ChatPage /> },
      { path: 'map-selection', element: <MapSelection /> },
      { path: 'match', element: <MatchPage /> },
      {
        path: 'profile/:profileId',
        element: <ProfileDetails />,
     
      },
    ],
  },
]);

export default router;
