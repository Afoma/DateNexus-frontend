import Layouts from "./Layouts";
import SmallerLogo from "@/assets/SmallerLogo.png";
import { PuffLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useState } from "react";

const Review = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleReview = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/app/farcaster");
    }, 5000);
  };

  return (
    <Layouts>
      <div className="h-full flex flex-col justify-between my-[120px] lg:my-[50px] lg:px-[100px] px-8 font-sans">
        <section>
          <div className="flex gap-3 mb-10">
            <div className="bg-whitish rounded-[4px] p-2">
              <img src={SmallerLogo} alt="Logo" />
            </div>
            <div>
              <h3 className="text-base font-medium text-custom-black">
                Review
              </h3>
              <p className="text-xs text-custom-text-secondary">
                Request from <span className="text-custom-pink">DateNexus</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-custom-text-secondary text-sm">
              Sign with <span className="text-custom-pink">0x53a1...57ba</span>
            </p>
            <div className="flex flex-col gap-3">
              <h3 className="text-custom-black text-sm font-bold">Message</h3>
              <p className="text-xs text-custom-text-secondary">
                DateNexus.cam uses this cryptographic signature in place of a
                password. notice: 54afss12112gysssus
              </p>
            </div>
          </div>
        </section>
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

export default Review;
