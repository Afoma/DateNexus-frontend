import { Match } from '@/types/match';
import { getProfileImages } from '@/utils/imageUtils';
import PhotoCarousel from './PhotoCarousel';
import React from 'react';

interface MatchCardProps {
  match: Match;
  actionButtons?: React.ReactNode; // To allow passing in ConnectButton
}

const MatchCard = ({ match, actionButtons }: MatchCardProps) => {
  // Get all available profile images
  const profileImages = getProfileImages(match.photos || [], match.avatar);
  
  return (
    <div className="h-full w-full overflow-hidden rounded-2xl bg-white shadow-lg">
      {/* Photo carousel - 70% of the card height */}
      <div className="h-[70%]">
        <PhotoCarousel 
          photos={profileImages} 
          name={match.name || 'User'} 
        />
      </div>
      
      {/* Profile info - 30% of the card height */}
      <div className="h-[30%] p-4 relative">
        <div className="mb-1 flex items-baseline gap-2">
          <h3 className="text-xl font-semibold">
            {match.name || 'Anonymous'}
            {match.age && <span className="ml-2 text-gray-600">{match.age}</span>}
          </h3>
        </div>
        
        {match.profession && (
          <p className="text-sm text-gray-600">{match.profession}</p>
        )}
        
        {match.about && (
          <p className="mt-1 line-clamp-2 text-sm text-gray-700">{match.about}</p>
        )}
        
        {/* Interests tags */}
        {match.interests && match.interests.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {match.interests.slice(0, 3).map((interest, index) => (
              <span 
                key={index} 
                className="inline-block rounded-full bg-[#f5f6f8] px-2 py-0.5 text-xs text-gray-600"
              >
                {interest}
              </span>
            ))}
            {match.interests.length > 3 && (
              <span className="inline-block rounded-full bg-[#f5f6f8] px-2 py-0.5 text-xs text-gray-600">
                +{match.interests.length - 3} more
              </span>
            )}
          </div>
        )}
        
        {/* Action buttons (ConnectButton will be passed here) */}
        <div className="absolute bottom-4 left-0 flex w-full justify-center">
          {actionButtons}
        </div>
      </div>
    </div>
  );
};

export default MatchCard;