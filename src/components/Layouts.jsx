/* eslint-disable react/prop-types */
import TopCurve from "./TopCurve";
import TopCurveWhite from "./TopCurveWhite";
import BottomCurve from "./BottomCurve";

const Layouts = ({ children }) => {
  return (
    <div className="h-screen grid lg:grid-cols-[550px_1fr] relative">
      <div className="hidden lg:grid lg:min-h-screen lg:bg-custom-gradient">
        <TopCurveWhite />
        <h3 className="text-white text-6xl text-center font-semibold">
          <span className="text-white_transparent text-4xl font-medium">
            Welcome to
          </span>{" "}
          DateNexus
        </h3>
      </div>
      <div className="flex items-center justify-center min-h-screen lg:min-h-0">
        <div className="lg:hidden absolute top-0 left-0 right-0">
          <TopCurve />
        </div>
        <div className="md:px-[170px] py-20 lg:py-0 flex flex-col items-center justify-center z-10">
          {children}
        </div>
        <div className="lg:hidden absolute bottom-0 right-0">
          <BottomCurve />
        </div>
      </div>
    </div>
  );
};

export default Layouts;


