import { useState } from "react";
import Layouts from "./Layouts";
import Logo from "./Logo";
import { Button } from "./ui/button";
import { Card, CardContent, CardTitle } from "./ui/card";
import Scan from "@/assets/scanOutline.svg";
import { PuffLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignMessage = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/app/review");
    }, 5000);
  };

  return (
    <Layouts>
      <div className="h-full flex flex-col justify-center gap-14 md:gap-8 my-[120px] lg:my-[50px] px-8 md:w-[400px]">
        <div className="flex flex-col gap-8 items-center justify-center">
          <Logo />
          <div className="text-center flex flex-col gap-4">
            <h3 className="text-4xl text-black font-semibold">
              Date<span className="text-gradient-custom">Nexus</span>
            </h3>
            <p className="text-custom-text-secondary">
              An on chain dating site for creatives
            </p>
          </div>
        </div>
        <Card className="w-full bg-whitish rounded-[24px] flex flex-col gap-10 items-center">
          <CardTitle className="w-[250px] text-center pt-5">
            <h3 className="text-sm text-custom-black font-semibold mb-3">
              Verify Account
            </h3>
            <p className="text-xs text-custom-text-secondary">
              Looking good! let’s test your passkey and verify your account by
              signing a message
            </p>
          </CardTitle>
          <CardContent className="w-full flex flex-col gap-6">
            <div className="flex justify-center">
              <img src={Scan} alt="Scan icon" />
            </div>
            <Button
              onClick={handleSignMessage}
              className="w-full bg-custom-gradient h-[44px] rounded-[12px]"
            >
              {isLoading ? (
                <PuffLoader color="#ffffff" size={24} />
              ) : (
                "Sign message"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layouts>
  );
};

export default Verify;
