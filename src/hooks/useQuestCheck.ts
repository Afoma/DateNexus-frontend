import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/services/api-client';

interface UseQuestCheckResult {
  isQuestModalOpen: boolean;
  closeQuestModal: () => void;
  openQuestModal: () => void;
  handleQuestSuccess: () => void;
  isLoading: boolean;
  error: Error | null;
}

export const useQuestCheck = (): UseQuestCheckResult => {
  const [isQuestModalOpen, setIsQuestModalOpen] = useState(false);
  const [modalChecked, setModalChecked] = useState(false);
  const queryClient = useQueryClient();

  // Fetch user profile
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get('/users/profile');
        return response.data.data;
      } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
      }
    },
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Check if user has a quest set
  useEffect(() => {
    if (!isLoading && data && !modalChecked) {
      // If user doesn't have a quest, open the modal
      if (!data.quest) {
        setIsQuestModalOpen(true);
      }
      setModalChecked(true);
    }
  }, [data, isLoading, modalChecked]);

  // Close modal
  const closeQuestModal = () => {
    setIsQuestModalOpen(false);
  };

  // Open modal
  const openQuestModal = () => {
    setIsQuestModalOpen(true);
  };

  // Handle success
  const handleQuestSuccess = async () => {
    closeQuestModal();
    // Refetch user profile to update the quest information
    await refetch();
    // Also invalidate the query to ensure fresh data next time
    queryClient.invalidateQueries({ queryKey: ['userProfile'] });
  };

  return {
    isQuestModalOpen,
    closeQuestModal,
    openQuestModal,
    handleQuestSuccess,
    isLoading,
    error: error as Error | null,
  };
};

export default useQuestCheck;