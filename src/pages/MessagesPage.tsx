import Layout from '../components/layouts/AuthLayout';
import Header from '../components/global/Header';
import { Card, CardContent } from '../components/ui/card';
import { useNavigate } from 'react-router-dom';

const messages = [
  {  
    id: 1,
    name: 'Jennifer Lopez',
    message: 'What is your issue about this...',
    time: '12:04 pm',
    hasNotification: true,
    profileImage: '/ellipse-8-2.png',
  },
  {
    id: 2,
    name: 'Jennifer Lopez',
    message: 'What is your issue about this...',
    time: '12:04 pm',
    hasNotification: true,
    profileImage: '/ellipse-8-2.png',
  },
  {
    id: 3,
    name: 'Jennifer Lopez',
    message: 'What is your issue about this...',
    time: '12:04 pm',
    hasNotification: true,
    profileImage: '/ellipse-8-2.png',
  },
];

const MessagesPage = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className='z-10 relative mt-10'>
        <Header />
      </div>
      <div className='w-full'>
        <div className='text-start lg:text-center gap-2 text-2xl lg:text-4xl font-semibold mt-24 md:mt-2  p-2 pb-10 lg:flex  '>
          <h2 className='text-[#000000] text-nowrap bg-gradient-to-r from-[#f83e67] to-[#a50976] bg-clip-text text-transparent'>
            Messages
          </h2>
        </div>

        <div className='flex flex-wrap gap-10'>
          {messages.map((message, index) => (
            <Card
              key={`col1-${message.id}`}
              className='px-4 p-8 bg-[#f5f6f8] rounded-[17.38px] relative cursor-pointer hover:bg-[#f0f1f3] transition-colors'
              onClick={() => navigate(`/app/chat/${message.id}`)}
              style={{ marginTop: index === 0 ? 0 : undefined }}
            >
              <CardContent className='p-0 flex flex-row items-center gap-3'>
                <img
                  src='/assets/community-1.jpeg'
                  alt=''
                  className='w-[35px] h-[35px] rounded-full'
                />
                <div>
                  <div className="  left-[78px] font-medium text-[17.4px] font-['Poppins',Helvetica] bg-gradient-to-r from-[#f83e67] to-[#a50976] bg-clip-text text-transparent">
                    {message.name}
                  </div>
                  <div className=" left-[78px] font-normal text-[#383838] text-[14.5px] font-['Poppins',Helvetica]">
                    {message.message}
                  </div>
                </div>

                <div>
                  <div className=" top-[23px] left-[393px] font-medium text-[#f83e67] text-[8.7px] font-['Poppins',Helvetica]">
                    {message.time}
                  </div>
                  <div className=' w-4 h-4 top-[45px] left-[416px] bg-[#f83e67] rounded-[7.97px]' />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};
export default MessagesPage;
