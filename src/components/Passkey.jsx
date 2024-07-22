import Brand from "./Brand";
import TopCurve from "./TopCurve";
import Text from "./Text";
import { Button } from "./ui/button";

const Passkey = () => {
  return (
    <div className="h-screen grid justify-between">
      <TopCurve />
      <div className="px-6 flex flex-col gap-8">
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
      </div>
      <p className="font-medium text-sm text-custom-text-secondary self-end px-6 text-center py-6">
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
  );
};

export default Passkey;
