import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { handleImageError } from '@/utils/imageUtils';
import DefaultAvatar from './DefaultAvatar';

interface PhotoCarouselProps {
  photos: string[];
  name?: string;
}

const PhotoCarousel = ({ photos, name = 'User' }: PhotoCarouselProps) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Show arrows only if we have multiple photos
  const showControls = photos.length > 1;

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering parent clicks
    setCurrentPhotoIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering parent clicks
    setCurrentPhotoIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  // If no photos, render default avatar
  if (!photos || photos.length === 0) {
    return <DefaultAvatar />;
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-t-2xl">
      {/* Current photo */}
      <img
        src={photos[currentPhotoIndex]}
        alt={`${name}'s photo ${currentPhotoIndex + 1}`}
        className="h-full w-full object-cover transition-opacity duration-300"
        onError={handleImageError}
      />

      {/* Photo navigation controls */}
      {showControls && (
        <>
          {/* Left arrow */}
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-1.5 text-white hover:bg-black/50 focus:outline-none"
            onClick={handlePrevPhoto}
            aria-label="Previous photo"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Right arrow */}
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-1.5 text-white hover:bg-black/50 focus:outline-none"
            onClick={handleNextPhoto}
            aria-label="Next photo"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Photo indicators */}
      {showControls && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {photos.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 w-8 rounded-full transition-all ${
                index === currentPhotoIndex
                  ? 'bg-white'
                  : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoCarousel;