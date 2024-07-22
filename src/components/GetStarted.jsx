import { useOutletContext } from "react-router-dom";
import Brand from "./Brand";
import TopCurve from "./TopCurve";
import { Button } from "./ui/button";

const GetStarted = () => {
  const { onGetStarted } = useOutletContext();

  return (
    <>
      <TopCurve />
      <div className="px-6">
        <div className="flex flex-col items-center gap-8 justify-center mt-[100px]">
          <Brand />
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-4xl text-custom-pink font-semibold">
              <span className="text-black">DateN</span>exus
            </h3>
            <p className="text-custom-text-secondary text-sm text-center">An on chain dating site for creatives</p>
          </div>
        </div>
        <Button
          className="w-full bg-custom-pink rounded-[12px] text-whitish text-xs mt-[100px]"
          onClick={onGetStarted}
        >
          Get Started
        </Button>
      </div>
    </>
  );
};

export default GetStarted;
