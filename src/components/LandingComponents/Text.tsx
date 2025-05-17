/* eslint-disable react/prop-types */
import { cn } from "@/lib/utils";

interface TextProps {
  heading: string;
  children: React.ReactNode;
  size: string;
}

const Text = ({ heading, children, size }: TextProps) => {
  return (
    <>
      <h3
        className={cn(
          `text-gradient-custom font-bold text-center lg:leading-none w-full md:w-[600px] lg:w-[900px]`,
          size
        )}
      >
        {heading}
      </h3>
      <p className="text-custom-text-secondary text-sm md:text-xl text-center w-full md:w-[500px] lg:w-[800px]">
        {children}
      </p>
    </>
  );
};

export default Text;
