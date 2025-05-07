import Layout from "@/components/Eplore/Layout";
import FocusCarousel from "@/components/Discover/FocusCarousel";

const Discover = () => {
  return (
    <Layout>
      <div className="w-full">
        <div className="text-center gap-2 text-2xl lg:text-4xl font-semibold mt-24 md:mt-2  p-2 pb-10 ">
          <h1 className="text-[#000000] text-nowrap ">Connect and Be </h1>
          <span className="bg-gradient-to-r from-[#F83E67] to-[#A50976] text-transparent bg-clip-text">
            Discovered
          </span>
        </div>
        <div className="">
          <FocusCarousel />
        </div>
      </div>
    </Layout>
  );
};

export default Discover;
