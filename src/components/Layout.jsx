/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import TopCurve from "./TopCurve";
import TopCurveWhite from "./TopCurveWhite";
import BottomCurve from "./BottomCurve";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {
  return (
    <div className="h-screen grid lg:grid-cols-[550px_1fr] overflow-hidden">
      <Toaster />
      <div className="hidden lg:grid lg:min-h-screen lg:bg-custom-gradient">
        <TopCurveWhite />
        <h3 className=" text-white text-6xl text-center font-semibold">
          <span className="text-white_transparent text-4xl font-medium">
            Welcome to
          </span>{" "}
          DateNexus
        </h3>
      </div>
      <div className="flex items-center justify-center min-h-screen lg:min-h-0">
        <div className="lg:hidden fixed top-0 left-0 right-0">
          <TopCurve />
        </div>
        <div className="px-6 md:px-[170px] md:py-[100px] flex flex-col gap-8">
          {children}
        </div>
        <div className="lg:hidden fixed bottom-0 right-0">
          <BottomCurve />
        </div>
      </div>
    </div>
  );
};

export default Layout;
