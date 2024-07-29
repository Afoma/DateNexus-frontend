import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopCurve from "./TopCurve";
import Text from "./Text";
import { Button } from "./ui/button";
import TopCurveWhite from "./TopCurveWhite";
import Logo from "./Logo";
import { PuffLoader } from "react-spinners";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

const Passkey = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleCreateWallet = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowModal(true);
    }, 5000);
  };

  const handleContinue = () => {
    setShowModal(false);
    navigate("/app/wallet");
  };

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
              <Logo />
            </div>
            <div className="">
              <Text title="DateNexus" pinkTitle="wallet">
                The quickest, simplest, and safest way to access the blockchain.
              </Text>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Button
              className="w-full rounded-[14px] h-[44px] bg-custom-gradient"
              onClick={handleCreateWallet}
              disabled={isLoading}
            >
              {isLoading ? (
                <PuffLoader color="#ffffff" size={24} />
              ) : (
                "Create a smart wallet"
              )}
            </Button>
            <Button variant="link" className="w-full rounded-[14px]">
              I already have a wallet
            </Button>
          </div>
          <p className="font-medium text-sm text-custom-text-secondary px-6 text-center py-4">
            By using Sage Wallet, you accept the{" "}
            <Button
              variant="link"
              className="text-custom-pink w-auto m-0 p-0 h-auto"
            >
              terms
            </Button>{" "}
            and{" "}
            <Button
              variant="link"
              className="text-custom-pink w-auto m-0 p-0 h-auto"
            >
              privacy policy.
            </Button>
          </p>
        </div>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="w-[90%] max-w-[500px] sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 bg-whitish rounded-[24px]">
          <DialogHeader>
            <DialogTitle>Smart Wallet Created</DialogTitle>
          </DialogHeader>
          <p className="text-center">
            Your smart wallet has been successfully created!
          </p>
          <DialogFooter className="flex flex-row justify-between items-center">
            <Button
              className="w-auto text-custom-text-secondary"
              variant="ghost"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
            <Button
              className="w-auto text-custom-pink"
              variant="link"
              onClick={handleContinue}
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Passkey;
