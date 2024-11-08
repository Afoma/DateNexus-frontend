import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";

export default function SwipeIndicator({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce 
               bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors
               cursor-pointer z-20"
    >
      <div className="flex flex-col items-center text-white">
        <ChevronUp className="w-6 h-6" />
        <span className="text-sm">Swipe up</span>
      </div>
    </button>
  );
}
