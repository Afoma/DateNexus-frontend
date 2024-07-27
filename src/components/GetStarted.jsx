import { useOutletContext } from "react-router-dom";
import TopCurve from "./TopCurve";
import { Button } from "./ui/button";
import TopCurveWhite from "./TopCurveWhite";
import BottomCurve from "./BottomCurve";
import Logo from "./Logo";
import BottomCurveWhite from "./BottomCurveWhite";

const GetStarted = () => {
  const { onGetStarted } = useOutletContext();

  return (
    <div className="h-screen grid lg:grid-cols-[550px_1fr] relative">
      <div className="hidden relative lg:flex lg:flex-col lg:items-center lg:justify-center min-h-screen lg:bg-custom-gradient lg:min-h-0">
        <div className="hidden lg:block absolute top-0 left-0 right-0">
          <TopCurveWhite />
        </div>
        <h3 className="text-white text-6xl text-center font-semibold">
          <span className="text-white_transparent text-4xl font-medium">
            Welcome to
          </span>{" "}
          DateNexus
        </h3>
        <div className="hidden lg:block absolute bottom-0 right-0">
          <BottomCurveWhite />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-screen lg:min-h-0">
        <div className="lg:hidden absolute top-0 left-0 right-0">
          <TopCurve />
        </div>
        <div className="md:px-[170px] py-20 lg:py-0 flex flex-col items-center justify-center z-10">
          <div className="flex flex-col items-center gap-6 justify-center">
            <Logo />
            <div className="flex flex-col items-center gap-2">
              <h3 className="text-4xl text-gradient-custom font-semibold">
                <span className="text-black">DateN</span>exus
              </h3>
              <p className="text-custom-text-secondary text-sm text-center">
                An On Chain Dating Site for Creatives
              </p>
            </div>
            <Button
              className="w-full bg-text-gradient rounded-[12px] text-whitish text-sm mt-[50px] h-[44px]"
              onClick={onGetStarted}
            >
              Get Started
            </Button>
          </div>
        </div>
        <div className="lg:hidden absolute bottom-0 right-0">
          <BottomCurve />
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
