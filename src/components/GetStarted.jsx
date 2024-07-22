import { useOutletContext } from "react-router-dom";
import Brand from "./Brand";
import TopCurve from "./TopCurve";
import { Button } from "./ui/button";
import TopCurveWhite from "./TopCurveWhite";

const GetStarted = () => {
  const { onGetStarted } = useOutletContext();

  return (
    <div className="h-screen grid lg:grid-cols-[550px_1fr]">
      <div className="hidden lg:grid lg:h-screen lg:bg-custom-gradient">
        <TopCurveWhite />
        <h3 className=" text-white text-6xl text-center font-semibold">
          <span className="text-white_transparent text-4xl font-medium">Welcome to</span> DateNexus
        </h3>
      </div>
      <div className="lg:hidden">
        <TopCurve />
      </div>
      <div className="px-6 lg:px-[170px] lg:self-center">
        <div className="flex flex-col items-center gap-8 justify-center">
          <Brand />
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-4xl text-custom-pink font-semibold">
              <span className="text-black">DateN</span>exus
            </h3>
            <p className="text-custom-text-secondary text-sm text-center">
              An on chain dating site for creatives
            </p>
          </div>
          <Button
            className="w-full bg-custom-pink rounded-[12px] text-whitish text-xs mt-[100px] h-[44px]"
            onClick={onGetStarted}
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
