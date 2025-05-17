import { useState, useEffect, useRef } from 'react';
import { useMatches } from '@/hooks/useMatches';
import { Match } from '@/types/match';
import MatchCard from './MatchCard';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import ConnectButton from '@/components/ConnectionButton';


// Number of matches to show at once for buffering
const BUFFER_SIZE = 20;

const Carousel = () => {
  const [visibleMatches, setVisibleMatches] = useState<Match[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bufferStartIndex, setBufferStartIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  
  // Fetch matches using the existing hook
  const { data: matches, isLoading, error } = useMatches();
  
  console.log('Matches data:', matches); // Debug log
  
  // Update buffer of visible matches whenever matches data changes or we navigate
  useEffect(() => {
    if (!matches || matches.length === 0) return;
    
    // Calculate the start index for buffer, ensuring it wraps around
    const normalizedStartIndex = ((bufferStartIndex % matches.length) + matches.length) % matches.length;
    
    // Create buffer of matches
    const buffer = [];
    for (let i = 0; i < Math.min(BUFFER_SIZE, matches.length); i++) {
      const index = (normalizedStartIndex + i) % matches.length;
      buffer.push(matches[index]);
    }
    
    setVisibleMatches(buffer);
    
    // Debug log
    console.log('Buffer updated:', {
      totalMatches: matches.length,
      bufferStartIndex,
      normalizedStartIndex,
      bufferSize: buffer.length,
      currentIndex
    });
  }, [matches, bufferStartIndex, currentIndex]);

  // Handle next match
  const handleNext = () => {
    if (!matches || matches.length === 0) return;
    
    // Debug log
    console.log('Before Next:', { currentIndex, bufferStartIndex });
    
    // Move to next match
    setCurrentIndex((prevIndex) => {
      // If at the end of the buffer and we have more than BUFFER_SIZE matches, shift the buffer
      if (prevIndex >= Math.min(BUFFER_SIZE, matches.length) - 1) {
        setBufferStartIndex((prev) => (prev + 1) % matches.length);
        return prevIndex; // Keep same index but buffer shifted
      }
      // Otherwise, just increment the index
      return (prevIndex + 1) % Math.min(BUFFER_SIZE, matches.length);
    });
    
    // Debug log after update
    setTimeout(() => {
      console.log('After Next:', { currentIndex, bufferStartIndex });
    }, 0);
  };

  // Handle previous match
  const handlePrevious = () => {
    if (!matches || matches.length === 0) return;
    
    // Debug log
    console.log('Before Previous:', { currentIndex, bufferStartIndex });
    
    // Move to previous match
    setCurrentIndex((prevIndex) => {
      // If at the beginning of the buffer, shift the buffer backward
      if (prevIndex === 0) {
        setBufferStartIndex((prev) => {
          const newIndex = ((prev - 1) % matches.length + matches.length) % matches.length;
          return newIndex;
        });
        return 0; // Keep same index but buffer shifted
      }
      // Otherwise, just decrement the index
      return prevIndex - 1;
    });
    
    // Debug log after update
    setTimeout(() => {
      console.log('After Previous:', { currentIndex, bufferStartIndex });
    }, 0);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex h-[500px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-10 w-10 animate-spin text-[#f83e67]" />
          <p className="text-gray-500">Finding matches for you...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !matches) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="mb-2 text-lg font-semibold text-gray-700">No matches available</p>
          <p className="text-gray-500">We couldn't find matches for you at the moment.</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (matches.length === 0) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="mb-2 text-lg font-semibold text-gray-700">No matches yet</p>
          <p className="text-gray-500">Check back soon for new connections!</p>
        </div>
      </div>
    );
  }

  // Get the current displayed match
  const currentMatch = visibleMatches[currentIndex];
  
  // Debug - log current match details
  console.log('Current match details:', {
    name: currentMatch?.name,
    id: currentMatch?._id,
    index: currentIndex + bufferStartIndex,
    totalMatches: matches.length
  });

  return (
    <div className="relative mx-auto flex h-[600px] max-w-md flex-col items-center px-4">
      {/* Cards container */}
      <div 
        ref={containerRef}
        className="relative h-[500px] w-full"
      >
        {currentMatch && (
          <div className="h-full w-full">
            <MatchCard
              match={currentMatch}
              actionButtons={
                <ConnectButton 
                  userId={currentMatch._id}
                  questId={currentMatch.quest || ''}
                  onSuccess={handleNext}
                />
              }
            />
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="mt-6 flex w-full items-center justify-between px-6">
        <button
          onClick={handlePrevious}
          className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
          aria-label="Previous match"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Progress indicators */}
        <div className="flex items-center gap-1.5">
          {matches.length <= 10 ? (
            // Show all indicators if 10 or fewer matches
            matches.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 w-6 rounded-full transition-all ${
                  ((bufferStartIndex + currentIndex) % matches.length) === idx
                    ? 'bg-[#f83e67]'
                    : 'bg-gray-200'
                }`}
              />
            ))
          ) : (
            // Show just 5 indicators for more than 10 matches
            Array.from({ length: 5 }).map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 w-6 rounded-full transition-all ${
                  idx === Math.floor(((bufferStartIndex + currentIndex) % matches.length) / (matches.length / 5))
                    ? 'bg-[#f83e67]'
                    : 'bg-gray-200'
                }`}
              />
            ))
          )}
        </div>

        <button
          onClick={handleNext}
          className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
          aria-label="Next match"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      
      {/* Debug info (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute bottom-0 left-0 bg-black/70 text-white text-xs p-1 rounded">
          Match {(bufferStartIndex + currentIndex) % matches.length + 1} of {matches.length}
        </div>
      )}
    </div>
  );
};

export default Carousel;