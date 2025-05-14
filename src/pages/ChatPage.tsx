import Layout from '@/components/layouts/AuthLayout';
import Header from '../components/global/Header';
import { useParams } from 'react-router-dom';

const ChatPage = () => {
  const { chatId } = useParams();

  console.log('Current chat ID:', chatId);
  return (
    <Layout>
      <div className='z-10 relative mt-10'>
        <Header />
      </div>
      <div className='w-full flex justify-center items-center'>
        jhdjsd
        {chatId}
      </div>
    </Layout>
  );
};

export default ChatPage;
