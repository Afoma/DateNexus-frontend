import TopCurve from "./TopCurve";
import Text from "./Text";

import TopCurveWhite from "./TopCurveWhite";
import Logo from "./Logo";

const WalletCreation = () => {
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
          <div className="flex flex-col gap-4"></div>
        </div>
      </div>
    </div>
  );
};

export default WalletCreation;
