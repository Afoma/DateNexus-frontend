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
  { icon: '/hugeicons-birthday-cake.svg', text: '20th December' },
  { iconSrc: '/group-3.png', text: 'Abuja, Nigeria' },
  { icon: '/ph-gender-male-light.svg', text: 'Male' },
];

const ProfileDetails = () => {
  const id = useParams();

  console.log(id, 'id');
  return (
    <Layout>
      <div className='z-10 relative mt-10'>
        <Header />
      </div>
      <div>
        <div className='absolute w-[1044px] h-[1668px] top-0 left-[396px] bg-white'>
          {/* Top Navigation Buttons */}
          <Button
            variant='outline'
            className='absolute w-12 h-12 top-[75px] left-[946px] bg-[#f5f6f8] rounded-lg p-0'
          >
            <div className='relative top-0 left-0 w-6 h-6 flex items-center justify-center'>
              <img className='w-[19px] h-[22px]' alt='Group' src='/group.png' />
            </div>
          </Button>

          <Button
            variant='outline'
            className='absolute w-12 h-12 top-[75px] left-[50px] bg-[#f5f6f8] rounded-lg p-0'
          >
            <div className='relative top-0 left-0 w-6 h-6 flex items-center justify-center'>
              <img
                className='w-[18px] h-[22px]'
                alt='Group'
                src='/group-1.png'
              />
            </div>
          </Button>

          {/* Main Profile Card */}
          <Card className='absolute w-[944px] h-[1137px] top-[183px] left-[50px] bg-[#f5f6f8] rounded-[20.72px] overflow-hidden border-none'>
            <CardContent className='p-0'>
              {/* Profile Image */}
              <div className='absolute w-[223px] h-[271px] top-10 left-10 rounded-[9.55px] overflow-hidden [background:url(..//frame-3474040.png)_50%_50%_/_cover]'>
                <div className='relative w-[34px] h-9 top-[231px] left-[95px]'>
                  <div className='absolute w-6 h-6 top-0 left-1 bg-[#d9d9d98a] rounded-xl border border-solid border-white backdrop-blur-[2px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(2px)_brightness(100%)]'>
                    <img
                      className='absolute w-2.5 h-[7px] top-[7px] left-1.5'
                      alt='Group'
                      src='/group-44449.png'
                    />
                  </div>

                  <div className="absolute top-7 left-0 [font-family:'Poppins',Helvetica] font-semibold text-white text-[5.1px] text-center tracking-[0] leading-[normal]">
                    Swipe down
                  </div>
                </div>
              </div>

              {/* UserIcon Info Section */}
              <div className='absolute w-[197px] h-[100px] top-[326px] left-[55px]'>
                <div className="absolute w-[195px] top-7 left-0 [font-family:'Poppins',Helvetica] font-normal text-[#383838] text-[10.4px] text-center tracking-[0] leading-[normal]">
                  Enthusiast of AI and machine learning
                </div>

                {/* Like/Dislike Buttons */}
                <div className='absolute w-[163px] h-7 top-[72px] left-[15px] flex gap-2'>
                  <Button
                    variant='outline'
                    className='w-[78px] h-7 p-0 bg-[#dadada] rounded-[6.91px] border-none flex items-center justify-center'
                  >
                    <XIcon className='w-5 h-5' />
                  </Button>

                  <Button className='w-[78px] h-7 p-0 rounded-[6.91px] [background:linear-gradient(90deg,rgba(248,62,103,1)_0%,rgba(165,9,118,1)_100%)] border-none flex items-center justify-center'>
                    <img
                      className='w-[19px] h-[17px]'
                      alt='Heart'
                      src='/group-2.png'
                    />
                  </Button>
                </div>

                {/* UserIcon Name with Verification */}
                <div className='absolute w-[131px] h-[21px] top-0 left-[33px] flex items-center justify-center'>
                  <div className="absolute w-[101px] top-0 left-0 [font-family:'Poppins',Helvetica] font-medium text-[#f83e67] text-sm text-center tracking-[0] leading-[normal]">
                    Jennifer Lopez
                  </div>

                  <img
                    className='absolute w-4 h-4 top-[3px] left-[113px]'
                    alt='Verified'
                    src='/material-symbols-verified.svg'
                  />
                </div>
              </div>

              {/* Photos Section */}
              <div className="absolute w-[184px] top-[455px] left-10 [background:linear-gradient(90deg,rgba(248,62,103,1)_0%,rgba(165,9,118,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Poppins',Helvetica] font-medium text-transparent text-xl text-justify tracking-[0] leading-[normal]">
                Photos
              </div>

              {/* Photo Grid */}
              <div className='absolute top-[505px] left-10 flex gap-[15px]'>
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
              <div className="absolute w-[184px] top-[681px] left-10 [background:linear-gradient(90deg,rgba(248,62,103,1)_0%,rgba(165,9,118,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Poppins',Helvetica] font-medium text-transparent text-xl text-justify tracking-[0] leading-[normal]">
                About
              </div>

              <div className="absolute w-[507px] top-[727px] left-10 [font-family:'Poppins',Helvetica] font-normal text-[#383838] text-base tracking-[0] leading-[normal]">
                Enthusiast of AI and machine learning.
              </div>

              {/* Profession Section */}
              <div className="absolute w-[184px] top-[783px] left-10 [background:linear-gradient(90deg,rgba(248,62,103,1)_0%,rgba(165,9,118,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Poppins',Helvetica] font-medium text-transparent text-xl text-justify tracking-[0] leading-[normal]">
                Profession
              </div>

              <div className="absolute w-[270px] top-[829px] left-10 [font-family:'Poppins',Helvetica] font-normal text-[#383838] text-base tracking-[0] leading-[normal]">
                AI and Machine learning
              </div>

              {/* User's Essentials Section */}
              <div className="absolute w-[172px] top-[885px] left-[45px] [background:linear-gradient(90deg,rgba(248,62,103,1)_0%,rgba(165,9,118,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Poppins',Helvetica] font-medium text-transparent text-xl text-justify tracking-[0] leading-[normal]">
                UserIcon&apos;s Essentials
              </div>

              {/* Essentials List */}
              <div className='absolute top-[934px] left-[45px] flex flex-col gap-6'>
                {essentials.map((item, index) => (
                  <div key={index} className='flex items-center gap-2'>
                    {item.icon ? (
                      <img
                        className='w-5 h-5'
                        alt={item.text}
                        src={item.icon}
                      />
                    ) : (
                      <div className='w-5 h-5 flex items-center justify-center'>
                        <img
                          className='w-3.5 h-4'
                          alt={item.text}
                          src={item.iconSrc}
                        />
                      </div>
                    )}
                    <div className="[font-family:'Poppins',Helvetica] font-normal text-[#383838] text-base tracking-[0] leading-[normal]">
                      {item.text}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Navigation */}
        <div className='absolute w-[396px] h-[1024px] top-0 left-0 bg-[#f5f6f8] overflow-hidden'>
          {/* Decorative Top Gradient */}
          <div className='absolute w-[432px] h-[145px] -top-11 left-[-177px]'>
            <div className='absolute w-[429px] h-[55px] top-[23px] left-0.5 rounded-[0px_0px_119.06px_35.72px] rotate-[-6.07deg] [background:linear-gradient(252deg,rgba(248,62,103,1)_0%,rgba(165,9,118,1)_100%)]' />
            <div className='absolute w-[292px] h-[37px] top-[93px] left-[5px] rounded-[0px_0px_81.03px_24.31px] rotate-[-6.07deg] [background:linear-gradient(252deg,rgba(248,62,103,1)_0%,rgba(165,9,118,1)_100%)]' />
          </div>

          {/* Decorative Bottom Gradient */}
          <div className='absolute w-[432px] h-[145px] top-[922px] left-[141px] rotate-180'>
            <div className='absolute w-[429px] h-[55px] top-[68px] left-0.5 rounded-[0px_0px_119.06px_35.72px] rotate-[-6.07deg] [background:linear-gradient(250deg,rgba(248,62,103,1)_0%,rgba(165,9,118,1)_100%)]' />
            <div className='absolute w-[292px] h-[37px] top-[15px] left-[29px] rounded-[0px_0px_81.03px_24.31px] rotate-[-6.07deg] [background:linear-gradient(250deg,rgba(248,62,103,1)_0%,rgba(165,9,118,1)_100%)]' />
          </div>

          {/* Navigation Menu */}
          <div className='absolute top-[180px] left-[50px] flex flex-col gap-5'>
            {navItems.map((item, index) => (
              <Button
                key={index}
                variant={item.active ? 'default' : 'outline'}
                className={`w-[296px] h-11 rounded-xl ${
                  item.active
                    ? '[background:linear-gradient(90deg,rgba(248,62,103,1)_0%,rgba(165,9,118,1)_100%)]'
                    : 'bg-white'
                } justify-start`}
              >
                {item.icon ? (
                  <img
                    className='w-6 h-6 ml-8 mr-4'
                    alt={item.name}
                    src={item.icon}
                  />
                ) : (
                  <div className='w-6 h-6 ml-8 mr-4 flex items-center justify-center'>
                    <img
                      className='w-[19px] h-[19px]'
                      alt={item.name}
                      src={item.iconSrc}
                    />
                  </div>
                )}
                <span
                  className={`font-medium ${
                    item.active ? 'text-white' : 'text-[#a2a2a2]'
                  }`}
                >
                  {item.name}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileDetails;
