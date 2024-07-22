import Brand from "./Brand";
import TopCurve from "./TopCurve";
import Text from "./Text";
import { Button } from "./ui/button";
import TopCurveWhite from "./TopCurveWhite";

const Passkey = () => {
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
      <div className="lg:hidden">
        <TopCurve />
      </div>
      <div className="px-6 md:px-[170px] md:py-[100px] flex flex-col justify-between gap-8">
        <div className="flex justify-center">
          <Brand />
        </div>
        <div className="mb-14">
          <Text title="DateNexus" pinkTitle="wallet">
            The quickest, simplest, and safest way to access the blockchain.
          </Text>
        </div>
        <div className="">
          <Button className="w-full rounded-[14px] h-[44px]">
            Create a smart wallet
          </Button>
          <Button variant="link" className="w-full rounded-[14px]">
            I already have a wallet
          </Button>
        </div>
        <p className="font-medium text-sm text-custom-text-secondary px-6 text-center py-6">
          By using Sage Wallet, you accept the{" "}
          <Button
            variant="link"
            className="text-custom-pink w-auto m-0 p-0 h-auto"
          >
            terms
          </Button>{" "}
          and
          <Button
            variant="link"
            className="text-custom-pink w-auto m-0 p-0 h-auto"
          >
            privacy policy.
          </Button>
        </p>
      </div>
    </div>
  );
};

export default Passkey;
