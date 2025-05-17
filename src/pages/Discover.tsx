import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Layout from "@/components/layouts/AuthLayout";
import Header from "@/components/global/Header";
import Carousel from "@/components/ui/carousel";
import QuestModal from "@/components/QuestModal"; // Make sure path is correct
import useQuestCheck from "@/hooks/useQuestCheck"; // Make sure path is correct

const Discover = () => {
  const queryClient = useQueryClient();
  
  // Use the quest check hook
  const { 
    isQuestModalOpen, 
    closeQuestModal, 
    handleQuestSuccess,
    isLoading 
  } = useQuestCheck();

  // Prefetch matches when component mounts
  useEffect(() => {
    // Invalidate user profile to ensure we have the latest data
    queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    
    // Prefetch matches data
    queryClient.prefetchQuery({ 
      queryKey: ['matches'],
      staleTime: 5 * 60 * 1000 // 5 minutes
    });
  }, [queryClient]);

  return (
    <Layout>
      <div className="z-10 relative mt-10">
        <Header />
      </div>
      <div className="w-full">
        <div className="text-start lg:text-center gap-2 text-2xl lg:text-4xl font-semibold lg:mt-24 md:mt-2 p-2 pb-10 lg:flex">
          <h1 className="text-[#000000] text-nowrap">Connect and Be </h1>
          <span className="bg-gradient-to-r from-[#F83E67] to-[#A50976] text-transparent bg-clip-text">
            Discovered
          </span>
        </div>

        <div className="pb-16">
          <Carousel />
        </div>
      </div>

      {/* Quest Modal */}
      <QuestModal 
        isOpen={isQuestModalOpen}
        onClose={closeQuestModal}
        onSuccess={handleQuestSuccess}
      />
    </Layout>
  );
};

export default Discover;