import { Button } from "@/components/ui/button";

interface QuestSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuestSuccessModal = ({ isOpen, onClose }: QuestSuccessModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="max-w-md w-full flex flex-col items-center px-6">
        {/* Success icon with gradient background */}
        <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-b from-[#f83e67] to-[#a50976] p-[6px] mb-6">
          <div className="w-full h-full rounded-full bg-[#ec3e6a] flex items-center justify-center">
            {/* Double checkmark */}
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 12L8.5 16.5L20 5"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 18L8.5 22.5L20 11"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
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
          onClick={onClose}
          className="w-full h-[50px] rounded-xl bg-gradient-to-r from-[#f83e67] to-[#a50976] text-white font-medium"
        >
          Done
        </Button>
      </div>
    </div>
  );
};

export default QuestSuccessModal;
