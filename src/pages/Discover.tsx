import Layout from '@/components/layouts/AuthLayout';
import FocusCarousel from '@/components/Discover/FocusCarousel';
import Header from '@/components/global/Header';
import Carousel from '@/components/ui/carousel';

const Discover = () => {
  return (
    <Layout>
      <div className='z-10 relative mt-10'>
        <Header />
      </div>
      <div className='w-full'>
        <div className='text-start lg:text-center gap-2 text-2xl lg:text-4xl font-semibold lg:mt-24 md:mt-2  p-2 pb-10 lg:flex  '>
          <h1 className='text-[#000000] text-nowrap '>Connect and Be </h1>
          <span className='bg-gradient-to-r from-[#F83E67] to-[#A50976] text-transparent bg-clip-text'>
            Discovered
          </span>
        </div>

        <div className=''>
          <Carousel />
        </div>
      </div>
    </Layout>
  );
};

export default Discover;
