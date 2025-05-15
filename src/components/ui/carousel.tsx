import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Button } from './button';
import { userData } from '@/assets/data';
import { useNavigate } from 'react-router-dom';

interface CarouselProps {
  items: {
    id: number;
    name: string;
    bio: string;
    verified: boolean;
    imageSrc: string;
  }[];
}

const Carousel = () => {
  const items = userData;

  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '10px',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
        },
      },
    ],
    // beforeChange: (current: number, next: number) => {
    //   const cards = document.querySelectorAll('.profile-card');
    //   cards.forEach((card, index) => {
    //     if (index === next) {
    //       card.classList.remove('opacity-[0.48]');
    //       card.classList.add('scale-125', 'z-10');
    //     } else {
    //       card.classList.add('opacity-[0.48]');
    //       card.classList.remove('scale-125', 'z-10');
    //     }
    //   });
    // },
    // customPaging: (i: number, slick) => {
    //   const isActive =
    //     slick && slick.currentSlide !== undefined && i === slick.currentSlide;
    //   return (
    //     <div
    //       className={`w-3 h-3 rounded-md ${
    //         isActive ? 'bg-[#f83e67]' : 'bg-[#d9d9d9] w-2 h-2 mt-0.5'
    //       }`}
    //     />
    //   );
    // },
  };

  return (
    <div className='relative px-12 max-w-[1200px] mx-auto'>
      <Slider {...settings}>
        {items.map((card) => (
          <div key={card.id} className='px-4'>
            <div className='profile-card bg-[#f5f6f8] rounded-[16.7px] overflow-hidden transition-all duration-300 max-w-[265px] p-4'>
              <div className='relative'>
                <div
                  className='relative mx-auto rounded-[9.55px] overflow-hidden'
                  // style={{
                  //   background: `url(${card.profileImage}) 50% 50% / cover`,
                  // }}
                >
                  <img
                    src={card.profileImage}
                    alt={card.name}
                    className='w-full h-[250px] bg-cover bg-no-repeat bg-center '
                  />

                  <div className='absolute top-2 left-[50%] -translate-x-1/2  mx-auto flex space-x-2 mt-2.5'>
                    <div className='w-7 h-1 rounded-[7.77px] [background:linear-gradient(90deg,rgba(248,62,103,1)_0%,rgba(165,9,118,1)_100%)]' />
                    <div className='w-7 h-1 bg-white rounded-[7.77px]' />
                    <div className='w-7 h-1 bg-white rounded-[7.77px]' />
                    <div className='w-7 h-1 bg-white rounded-[7.77px]' />
                  </div>

                  <button
                    onClick={() => navigate('/app/profile/jdksd')}
                    className='absolute bottom-3 left-1/2 transform -translate-x-1/2 w-[22px] h-[29px] text-center'
                  >
                    <div className='w-[19px] h-[19px] mx-auto bg-[#d9d9d98a] rounded-[9.67px] border-[0.81px] border-solid border-white backdrop-blur-[1.61px]'>
                      <img
                        className='w-2 h-[5px] mx-auto mt-1.5'
                        alt='Swipe up'
                        src='/assets/swipeup.svg'
                      />
                    </div>
                    <div className='font-semibold text-white text-[4.1px] mt-1'>
                      Swipe up
                    </div>
                  </button>
                </div>

                <div className='flex justify-center items-center mt-4'>
                  <div className='font-medium text-[#f83e67] text-sm'>
                    {card.name}
                  </div>
                  {card.verified && (
                    <img
                      className='w-4 h-4 ml-2'
                      alt='Verified'
                      src='/material-symbols-verified-2.svg'
                    />
                  )}
                </div>

                <div className='text-center font-normal text-[#383838] text-[10.4px] mt-2 mx-auto max-w-[155px]'>
                  {card.bio}
                </div>

                <div className='flex justify-center space-x-2 mt-3'>
                  <Button
                    variant='outline'
                    className='w-[78px] h-7 bg-[#dadada] rounded-[5.57px] p-0'
                  >
                    <img src='/assets/discover/cancel.svg' alt='cancel' />
                  </Button>
                  <Button className='w-[78px] h-7 rounded-[5.57px] p-0 [background:linear-gradient(90deg,rgba(248,62,103,1)_0%,rgba(165,9,118,1)_100%)]'>
                    <img src='/assets/discover/cupscid.svg' alt='home' />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
