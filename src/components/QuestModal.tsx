import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import axiosInstance from '@/services/api-client';
import toast from 'react-hot-toast';
import QuestSuccessModal from './QuestSuccessModal';

interface QuestCategory {
  _id: string;
  title: string;
  createdAt: string;
}

interface QuestPrompt {
  _id: string;
  text: string;
  category: string;
}

interface QuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const QuestModal = ({ isOpen, onClose, onSuccess }: QuestModalProps) => {
  const [selectedQuest, setSelectedQuest] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Fetch quest categories
  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ['questCategories'],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get('/prompts/');
        return response.data.data.categories;
      } catch (error) {
        console.error('Error fetching quest categories:', error);
        return [];
      }
    },
    enabled: isOpen,
  });

  // Fetch prompts for the expanded category
  const { data: promptsData } = useQuery({
    queryKey: ['questPrompts', expandedCategory],
    queryFn: async () => {
      if (!expandedCategory) return null;
      try {
        const response = await axiosInstance.get(`/prompts/prompt/${expandedCategory}`);
        return response.data.data.prompts;
      } catch (error) {
        console.error('Error fetching prompts:', error);
        return [];
      }
    },
    enabled: !!expandedCategory,
  });

  // Mutation to set the quest
  const setQuestMutation = useMutation({
    mutationFn: async (questId: string) => {
      return await axiosInstance.post('/users/quest', { quest: questId });
    },
    onSuccess: () => {
      setShowSuccess(true);
    },
    onError: (error) => {
      console.error('Error setting quest:', error);
      toast.error('Failed to set quest. Please try again.');
    },
  });

  // Handle category expansion
  const toggleCategory = (categoryId: string) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
    }
  };

  // Handle quest selection
  const handleSelectQuest = (questId: string) => {
    setSelectedQuest(questId);
  };

  // Handle submit
  const handleSubmit = () => {
    if (selectedQuest) {
      setQuestMutation.mutate(selectedQuest);
    } else {
      toast.error('Please select a quest category');
    }
  };

  // Handle success confirmation
  const handleSuccessDone = () => {
    setShowSuccess(false);
    onSuccess();
  };

  // If the modal is not open, don't render anything
  if (!isOpen) return null;

  // Render success screen
  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <div className="max-w-md w-full flex flex-col items-center px-6">
          {/* Success icon with gradient background */}
          <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-b from-[#f83e67] to-[#a50976] p-[6px] mb-6">
            <div className="w-full h-full rounded-full bg-[#ec3e6a] flex items-center justify-center">
              {/* Double checkmark */}
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12L8.5 16.5L20 5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 18L8.5 22.5L20 11" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          
          {/* Success text */}
          <h2 className="text-2xl font-semibold mb-2 text-center">
            Quest Set <span className="text-[#f83e67]">Successful!</span>
          </h2>
          
          <p className="text-center text-gray-600 mb-8">
            You Have Successfully Set Your Quest
          </p>
          
          {/* Done button */}
          <Button 
            onClick={handleSuccessDone}
            className="w-full h-[50px] rounded-xl bg-gradient-to-r from-[#f83e67] to-[#a50976] text-white font-medium"
          >
            Done
          </Button>
        </div>
      </div>
    );
  }

  // Render main modal
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full relative max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
        
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Setting Up <span className="text-[#f83e67]">your Quest</span>
          </h2>
          <p className="text-gray-600 text-sm">
            People have to answer your quest to connect with you. What category do you want your quest to come from?
          </p>
        </div>
        
        {/* Categories */}
        {categoriesLoading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#f83e67]"></div>
          </div>
        ) : (
          <div className="space-y-3 mb-6">
            {categoriesData?.map((category: QuestCategory) => (
              <div key={category._id} className="rounded-xl overflow-hidden">
                <div 
                  className={`p-4 flex items-center justify-between cursor-pointer ${
                    selectedQuest === category._id 
                      ? 'bg-[#f3f4f6] border border-[#f83e67] rounded-xl' 
                      : 'bg-[#f3f4f6] rounded-xl'
                  }`}
                  onClick={() => toggleCategory(category._id)}
                >
                  <div className="flex items-center">
                    <div 
                      className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
                        selectedQuest === category._id 
                          ? 'border-[#f83e67] bg-[#f83e67]' 
                          : 'border-gray-300'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectQuest(category._id);
                      }}
                    >
                      {selectedQuest === category._id && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                    <span className="text-gray-700 capitalize">
                      {category.title}
                    </span>
                  </div>
                  {expandedCategory === category._id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                
                {/* Expanded content */}
                {expandedCategory === category._id && (
                  <div className="bg-[#f3f4f6] p-4 rounded-b-xl border-t border-gray-200">
                    <div className="space-y-3">
                      {promptsData?.map((prompt: QuestPrompt) => (
                        <div key={prompt._id} className="text-sm text-gray-700">
                          {prompt.title}...
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Submit button */}
        <Button 
          onClick={handleSubmit}
          disabled={!selectedQuest || setQuestMutation.isPending}
          className="w-full h-[50px] rounded-xl bg-gradient-to-r from-[#f83e67] to-[#a50976] text-white"
        >
          {setQuestMutation.isPending ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Submitting...
            </div>
          ) : (
            'Submit'
          )}
        </Button>
      </div>

      {/* Success Modal */}
      <QuestSuccessModal 
        isOpen={showSuccess} 
        onClose={handleSuccessDone} 
      />
    </div>
  );
};

export default QuestModal;