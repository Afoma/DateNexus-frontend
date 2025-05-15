import Header from '@/components/global/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { XIcon } from 'lucide-react';
import React from 'react';
import { CardContent } from '@/components/ui/card';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layouts/AuthLayout';

// Navigation menu items data
const navItems = [
  { name: 'Discover', icon: '/white-icon-2.png', active: true },
  { name: 'Inbox', icon: '/fluent-chat-20-filled.svg', active: false },
  { name: 'Matches', iconSrc: '/group-5.png', active: false },
  { name: 'Explore', iconSrc: '/group-4.png', active: false },
  { name: 'My Profile', icon: '/solar-user-bold.svg', active: false },
];

// UserIcon photos data
const photos = [
  {
    src: 'https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=',
  },
  {
    src: 'https://www.shutterstock.com/image-photo/horizontal-shot-carefree-confident-lesbian-260nw-1376301152.jpg',
  },
  {
    src: 'https://www.shutterstock.com/image-photo/horizontal-shot-carefree-confident-lesbian-260nw-1376301152.jpg',
  },
  {
    src: 'https://www.shutterstock.com/image-photo/horizontal-shot-carefree-confident-lesbian-260nw-1376301152.jpg',
  },
];

// UserIcon essentials data
const essentials = [
  { icon: '/assets/birthday.svg', text: '20th December' },
  { icon: '/assets/location.svg', text: 'Abuja, Nigeria' },
  { icon: '/assets/gender.svg', text: 'Male' },
];

const ProfileDetails = () => {
  const id = useParams();

  console.log(id, 'id');

  const card = {
    id: 1,
    name: 'Sarah Johnson',
    bio: 'Creative Director | Design Enthusiast',
    likes: 1.2,
    comments: 234,
    profileImage:
      'https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=',
    images: [
      'https://www.shutterstock.com/image-photo/horizontal-shot-carefree-confident-lesbian-260nw-1376301152.jpg',
      'https://writestylesonline.com/wp-content/uploads/2018/11/Three-Statistics-That-Will-Make-You-Rethink-Your-Professional-Profile-Picture-1024x1024.jpg',
      'https://img.freepik.com/premium-photo/professional-photo-linkedin-profile-picture-beautiful-looking-woman-light-color_1078199-10840.jpg',
      'https://img.freepik.com/premium-photo/professional-photo-linkedin-profile-picture-beautiful-looking-woman-light-color_1078199-10484.jpg?w=360',
    ],
    occupation: 'We Designer',
    essentials: {
      age: 27,
      location: 'Paris, France',
      gender: 'Female',
    },
  };
  return (
    <Layout>
      <div className='z-10 relative mt-10'>
        <Header />
      </div>
      <div>
        <div className=' bg-white p-5'>
          {/* Main Profile Card */}
          <div className='  bg-[#f5f6f8] rounded-[20.72px] p-6'>
            <div className='relative max-w-[223px] '>
              <div
                className='relative rounded-[9.55px] overflow-hidden'
                // style={{
                //   background: `url(${card.profileImage}) 50% 50% / cover`,
                // }}
              >
                <img
                  src={card.profileImage}
                  alt={card.name}
                  className=' h-[250px] bg-cover bg-no-repeat bg-center '
                />

                <button
                  //  onClick={() => navigate('/app/profile/jdksd')}
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
                    Swipe down
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

            <div className='space-y-6 mt-6'>
              {/* Photos Section */}
              <div className='bg-gradient-to-r from-[#F83E67] to-[#A50976] text-transparent bg-clip-text font-medium text-xl'>
                Photos
              </div>

              {/* Photo Grid */}
              <div className=' top-[505px] left-10 flex gap-[15px]'>
                {photos.map((photo, index) => (
                  <div
                    key={index}
                    className='w-[136px] h-[147px] rounded-[17.1px]'
                    style={{
                      backgroundImage: `url(${photo.src})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                ))}
              </div>

              {/* About Section */}
              <div className='bg-gradient-to-r from-[#F83E67] to-[#A50976] text-transparent bg-clip-text font-medium text-xl'>
                About
              </div>

              <div className=" w-[507px] top-[727px] left-10 [font-family:'Poppins',Helvetica] font-normal text-[#383838] text-base tracking-[0] leading-[normal]">
                Enthusiast of AI and machine learning.
              </div>

              {/* Profession Section */}
              <div className='bg-gradient-to-r from-[#F83E67] to-[#A50976] text-transparent bg-clip-text font-medium text-xl'>
                Profession
              </div>

              <div className=" w-[270px] top-[829px] left-10 [font-family:'Poppins',Helvetica] font-normal text-[#383838] text-base tracking-[0] leading-[normal]">
                AI and Machine learning
              </div>

              {/* User's Essentials Section */}
              <div className='bg-gradient-to-r from-[#F83E67] to-[#A50976] text-transparent bg-clip-text font-medium text-xl'>
                User's Essentials
              </div>

              {/* Essentials List */}
              <div className=' top-[934px] left-[45px] flex flex-col gap-6'>
                {essentials.map((item, index) => (
                  <div key={index} className='flex items-center gap-2'>
                    <img className='w-5 h-5' alt={item.text} src={item.icon} />

                    <div className="[font-family:'Poppins',Helvetica] font-normal text-[#383838] text-base tracking-[0] leading-[normal]">
                      {item.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileDetails;
