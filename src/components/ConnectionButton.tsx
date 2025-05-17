import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/services/api-client';
import toast from 'react-hot-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface QuestPrompt {
  _id: string;
  quest: string;
  title: string;
  createdAt: string;
  id: string;
}

interface QuestPromptResponse {
  status: string;
  data: {
    prompt: QuestPrompt;
  };
}

interface ConnectionRequest {
  receiverId: string;
  promptId: string;
  message: string;
}

interface ConnectButtonProps {
  userId: string;
  questId: string;
  onSuccess?: () => void;
  disabled?: boolean;
}

/**
 * Reusable component for handling the quest prompt and connection flow
 */
const ConnectButton = ({ userId, questId, onSuccess, disabled = false }: ConnectButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [promptData, setPromptData] = useState<QuestPrompt | null>(null);
  const [loadAttempts, setLoadAttempts] = useState(0);
  const [directFetchError, setDirectFetchError] = useState(false);
  const [errorAlert, setErrorAlert] = useState({ show: false, message: '' });
  const queryClient = useQueryClient();

  // Fetch a random prompt when modal opens
  const { 
    isLoading: isPromptLoading, 
    error: promptError,
    refetch: fetchPrompt,
    data: promptResponse
  } = useQuery({
    queryKey: ['prompt', questId, loadAttempts], // Include loadAttempts to force refetch
    queryFn: async () => {
      console.log(`Fetching prompt for questId: ${questId}, attempt: ${loadAttempts}`);
      try {
        const response = await axiosInstance.get<QuestPromptResponse>(`/prompts/random/${questId}`);
        console.log('Prompt response:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error in query function:', error);
        setDirectFetchError(true);
        throw error;
      }
    },
    enabled: false, // Don't fetch on component mount, only when needed
    retry: 1, // Retry once only to avoid excessive retries
    retryDelay: 1000 // Wait 1 second between retries
  });

  // Direct fetch fallback method
  const directFetchPrompt = async () => {
    try {
      setDirectFetchError(false);
      console.log(`Direct fetching prompt for questId: ${questId}`);
      const response = await axiosInstance.get<QuestPromptResponse>(`/prompts/random/${questId}`);
      console.log('Direct fetch response:', response.data);
      
      if (response.data?.data?.prompt) {
        setPromptData(response.data.data.prompt);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Direct fetch error:', error);
      setDirectFetchError(true);
      return false;
    }
  };

  // Update prompt data when the query succeeds
  useEffect(() => {
    if (promptResponse?.data?.prompt) {
      console.log('Setting prompt from response:', promptResponse.data.prompt);
      setPromptData(promptResponse.data.prompt);
    }
  }, [promptResponse]);

  // Effect to fetch prompt when modal opens
  useEffect(() => {
    if (isOpen) {
      console.log('Modal opened, fetching prompt...');
      // First try the React Query method
      fetchPrompt().then(result => {
        console.log('Fetch prompt result:', result);
        // If React Query fails, try direct fetch
        if (!result?.data?.prompt) {
          console.log('React Query failed, trying direct fetch...');
          directFetchPrompt();
        }
      }).catch(() => {
        // If React Query throws, try direct fetch
        console.log('React Query threw error, trying direct fetch...');
        directFetchPrompt();
      });
    }
  }, [isOpen, fetchPrompt, loadAttempts]);

  // Effect to reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setMessage('');
      // Don't reset promptData here to avoid flickering if modal reopens
    }
  }, [isOpen]);

  // Send connection request mutation
  const connectionMutation = useMutation({
    mutationFn: (data: ConnectionRequest) => 
      axiosInstance.post('/connections', data),
    onSuccess: () => {
      toast.success('Connection request sent!');
      setIsOpen(false);
      setMessage('');
      
      // Invalidate relevant queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['matches'] });
      
      // Call custom success handler if provided
      if (onSuccess) onSuccess();
    },
    onError: (error: any) => {
      console.error('Connection error:', error);
      
      // Handle specific error cases with alert dialog
      if (error.response?.data?.status === "Fail") {
        // Show error in alert dialog
        setErrorAlert({
          show: true,
          message: error.response.data.message || 'Failed to send connection request'
        });
      } else {
        // For other errors, use toast
        toast.error(error.response?.data?.message || 'Failed to send connection request');
      }
    }
  });

  // Pass request mutation (decline)
  const passMutation = useMutation({
    mutationFn: (userId: string) => 
      axiosInstance.post(`/users/match/${userId}/pass`),
    onSuccess: () => {
      toast.success('Profile passed');
      
      // Invalidate relevant queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['matches'] });
      
      // Call custom success handler if provided
      if (onSuccess) onSuccess();
    },
    onError: (error: any) => {
      console.error('Pass error:', error);
      toast.error(error.response?.data?.message || 'Failed to pass profile');
    }
  });

  // Open modal and fetch prompt
  const handleOpenModal = () => {
    setIsOpen(true);
    setLoadAttempts(0); // Reset load attempts
  };

  // Manually retry loading the prompt
  const handleRetryPrompt = () => {
    console.log('Retrying prompt fetch...');
    setLoadAttempts(prev => prev + 1);
    directFetchPrompt();
  };

  // Close error alert
  const closeErrorAlert = () => {
    setErrorAlert({ show: false, message: '' });
    // Also close the modal if we have a pending connection
    if (errorAlert.message.includes("pending connection")) {
      setIsOpen(false);
    }
  };

  // Submit connection request
  const handleSubmit = () => {
    if (!message.trim()) {
      toast.error('Please enter a response to the question');
      return;
    }

    if (!promptData) {
      toast.error('No question loaded. Please try again.');
      return;
    }

    connectionMutation.mutate({
      receiverId: userId,
      promptId: promptData.id,
      message: message.trim()
    });
  };

  return (
    <>
      {/* Like and Pass Buttons */}
      <div className='flex justify-center space-x-2'>
        <Button
          onClick={() => passMutation.mutate(userId)}
          disabled={disabled || passMutation.isPending}
          variant='outline'
          className='w-[78px] h-7 bg-[#dadada] rounded-[5.57px] p-0 disabled:opacity-50'
        >
          <img 
            src='/assets/discover/cancel.svg' 
            alt='Decline' 
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/24?text=X';
            }}
          />
        </Button>
        <Button 
          onClick={handleOpenModal}
          disabled={disabled || connectionMutation.isPending}
          className='w-[78px] h-7 rounded-[5.57px] p-0 [background:linear-gradient(90deg,rgba(248,62,103,1)_0%,rgba(165,9,118,1)_100%)] disabled:opacity-50'
        >
          <img 
            src='/assets/discover/cupscid.svg' 
            alt='Like' 
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/24?text=❤';
            }}
          />
        </Button>
      </div>

      {/* Error Alert Dialog */}
      <AlertDialog open={errorAlert.show} onOpenChange={closeErrorAlert}>
        <AlertDialogContent className="bg-white p-6 rounded-xl max-w-md mx-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-xl font-semibold text-gray-800">
              Connection Error
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-gray-600">
              {errorAlert.message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-center">
            <AlertDialogAction
              className="[background:linear-gradient(90deg,rgba(248,62,103,1)_0%,rgba(165,9,118,1)_100%)] text-white px-6 py-2 rounded-md"
              onClick={closeErrorAlert}
            >
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Quest Prompt Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-white p-6 rounded-xl max-w-md mx-auto">
          <DialogTitle className="text-center font-semibold mb-2">
            <span>Answer <span className="text-[#F83E67]">the Quest</span> to Connect</span>
          </DialogTitle>
          <DialogDescription className="text-center text-gray-500 mb-4">
            You must answer this Quest to connect.
          </DialogDescription>
          
          {isPromptLoading && !promptData ? (
            <div className="flex flex-col gap-3 my-4">
              {/* Skeleton loader for question */}
              <div className="animate-pulse bg-gray-200 h-5 w-full rounded-md"></div>
              <div className="animate-pulse bg-gray-200 h-5 w-4/5 rounded-md"></div>
              <div className="animate-pulse bg-gray-200 h-20 w-full rounded-md mt-2"></div>
            </div>
          ) : promptData ? (
            <div className="my-4">
              <div className="bg-[#F83E67] text-white px-2 py-1 text-xs inline-block rounded-sm rotate-[-3deg] absolute -left-1 -top-1">?</div>
              <div className="bg-gray-100 p-4 rounded-md">
                <h3 className="font-medium mb-2">{promptData.title}</h3>
                <Textarea
                  placeholder="enter your answer..."
                  className="w-full p-3 border border-gray-300 rounded-md min-h-[100px]"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>
          ) : (promptError || directFetchError) ? (
            <div className="text-center my-8 flex flex-col items-center">
              <p className="text-gray-500 mb-4">Failed to load question. Please try again.</p>
              <Button 
                onClick={handleRetryPrompt}
                className="bg-[#F83E67] text-white px-4 py-2 rounded-md"
              >
                Retry
              </Button>
            </div>
          ) : (
            <div className="text-center my-8 flex flex-col items-center">
              <p className="text-gray-500 mb-4">Something went wrong. Please try again.</p>
              <Button 
                onClick={handleRetryPrompt}
                className="bg-[#F83E67] text-white px-4 py-2 rounded-md"
              >
                Retry
              </Button>
            </div>
          )}
          
          <Button
            onClick={handleSubmit}
            disabled={connectionMutation.isPending || !message.trim() || !promptData}
            className="w-full mt-4 [background:linear-gradient(90deg,rgba(248,62,103,1)_0%,rgba(165,9,118,1)_100%)] text-white py-3 rounded-md disabled:opacity-50"
          >
            {connectionMutation.isPending ? 'Sending...' : 'Submit'}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ConnectButton;