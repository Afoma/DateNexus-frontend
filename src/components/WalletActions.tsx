import Wallet from "@/assets/Wallet.svg";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import Layouts from "./layouts/NoAuthLayout";

const WalletActions = () => {
  return (
    <Layouts>
      <div className="h-full my-[120px] lg:my-[50px] px-8 flex flex-col justify-between">
        <div className="py-[100px] md:py-0">
          <div className="flex justify-center">
            <img src={Wallet} alt="" />
          </div>
          <h3 className="text-center text-2xl lg:text-4xl text-black font-semibold">
            Your Smart Wallet is{" "}
            <span className="text-gradient-custom">ready!</span>
          </h3>
        </div>
        <div className="flex flex-col gap-4 py-8 md:py-0">
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
    </Layouts>
  );
};

export default WalletActions;
