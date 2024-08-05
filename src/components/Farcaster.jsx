import Layouts from "./Layouts";
import { PuffLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useState } from "react";
import BrandLogo from "@/assets/DateNexus.svg";

const Farcaster = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleReview = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/app/createProfile");
    }, 5000);
  };

  return (
    <Layouts>
      <div className="h-full flex flex-col justify-between my-[120px] lg:my-[50px] px-8">
        <div className="h-[65%] flex flex-col justify-between">
          <div className="text-center flex flex-col gap-4 items-center">
            <h3 className="font-semibold text-4xl">
              Connect <span className="text-gradient-custom">Farcaster</span>
            </h3>
            <p className="text-custom-text-secondary text-sm">
              This lets us show your username, profile picture, and find friends
            </p>
          </div>
          <div className="flex justify-center">
            <img className="w-[250px]" src={BrandLogo} alt="" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Button
            onClick={handleReview}
            className="w-full bg-custom-gradient h-[44px] rounded-[12px]"
          >
            {isLoading ? <PuffLoader color="#ffffff" size={24} /> : "Approve"}
          </Button>

          <Button className="w-full bg-input-bg h-[44px] rounded-[12px]">
            <span className="text-gradient-custom">Deny</span>
          </Button>
        </div>
      </div>
    </Layouts>
  );
};

export default Farcaster;
