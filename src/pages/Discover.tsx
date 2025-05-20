import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Layout from "@/components/layouts/AuthLayout";
import Header from "@/components/global/Header";
import Carousel from "@/components/ui/carousel";
import QuestModal from "@/components/QuestModal"; // Make sure path is correct
import useQuestCheck from "@/hooks/useQuestCheck"; // Make sure path is correct
import axiosInstance from "@/services/api-client";
import { AxiosResponse } from "axios";

const Discover = () => { 
  const queryClient = useQueryClient();
  const [userQuest, setUserQuest] = useState<string | null>(null);

  // Use the quest check hook
  const { isQuestModalOpen, closeQuestModal, handleQuestSuccess, isLoading } =
    useQuestCheck();

  // Prefetch matches when component mounts
  useEffect(() => {
    // Invalidate user profile to ensure we have the latest data
    queryClient.invalidateQueries({ queryKey: ["userProfile"] });

    async function fetchUserInfo() {
      const response = (await axiosInstance.get(
        "/users/profile"
      )) as AxiosResponse;
      console.log(response.data.data.user.quest);

      setUserQuest(response.data.data.user.quest);
    }

    // Prefetch matches data
    queryClient.prefetchQuery({
      queryKey: ["matches"],
      staleTime: 5 * 60 * 1000, // 5 minutes
    });

    fetchUserInfo();
    // also fetch the user info here to check if the user has completed the quest
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
      {!userQuest && (
        <QuestModal
          isOpen={isQuestModalOpen}
          onClose={closeQuestModal}
          onSuccess={handleQuestSuccess}
        />
      )}
    </Layout>
  );
};

export default Discover;
