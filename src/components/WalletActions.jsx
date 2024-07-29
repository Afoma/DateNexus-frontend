import TopCurve from "./TopCurve";
import TopCurveWhite from "./TopCurveWhite";
import Wallet from "@/assets/Wallet.svg";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const WalletActions = () => {
  return (
    <div className="h-screen grid lg:grid-cols-[550px_1fr]">
      <div className="hidden lg:grid lg:min-h-screen lg:bg-custom-gradient">
        <TopCurveWhite />
        <h3 className=" text-white text-6xl text-center font-semibold">
          <span className="text-white_transparent text-4xl font-medium">
            Welcome to
          </span>{" "}
          DateNexus
        </h3>
      </div>
      <div className="flex items-end justify-center min-h-screen lg:min-h-0">
        <div className="lg:hidden absolute top-0 left-0 right-0">
          <TopCurve />
        </div>
        <div className="px-6 md:px-[170px] flex flex-col justify-between h-[70%]">
          <div className="">
            <div className="flex justify-center">
              <img src={Wallet} alt="" />
            </div>
            <h3 className="text-center text-2xl lg:text-4xl text-black font-semibold">
              Your Smart Wallet is{" "}
              <span className="text-gradient-custom">ready!</span>
            </h3>
          </div>
          <div className="flex flex-col gap-4 py-10">
            <Button className="w-full bg-custom-gradient rounded-[14px] h-[44px]">
              Fund Wallet
            </Button>
            <Button className="w-full bg-otp_grey text-gradient-custom rounded-[14px] h-[44px]">
              Explore Wallet
            </Button>
            <Link to="/app/smartSignin">
              <Button variant="ghost" className="w-full">
                Return to App
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletActions;
