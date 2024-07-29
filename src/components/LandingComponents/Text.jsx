/* eslint-disable react/prop-types */
import { cn } from "@/lib/utils";

const Text = ({heading, children, size}) => {
  return (
    <>
      <h3 className={cn(`text-gradient-custom font-bold text-center lg:leading-none lg:w-[900px]`, size)}>
        {heading}
      </h3>
      <p className="text-custom-text-secondary lg:text-xl text-center lg:w-[800px]">
        {children}
      </p>
    </>
  );
};

export default Text;
