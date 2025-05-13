import TopCurve from "../TopCurve";
import TopCurveWhite from "../TopCurveWhite";
import BottomCurve from "../BottomCurve";
import BottomCurveWhite from "../BottomCurveWhite";

const Layouts = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen grid lg:grid-cols-[550px_1fr] relative font-sans">
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
        <div className=" h-full lg:py-0 flex flex-col items-center justify-center z-10">
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
