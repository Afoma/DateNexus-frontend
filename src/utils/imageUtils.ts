// src/utils/imageUtils.ts
import defaultAvatar from '/assets/ens.svg'; // Make sure to add this asset

/**
 * Helper function to handle image loading errors by providing fallback images
 */
export const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
  // Set to a local fallback image
  event.currentTarget.src = defaultAvatar;
  
  // Remove onerror after it's been used to prevent potential loops
  event.currentTarget.onerror = null;
};

/**
 * Safely get a usable image URL with fallback
 */
export const getSafeImageUrl = (url?: string): string => {
  if (!url) return defaultAvatar;
  
  // Check if URL starts with http:// or https://
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return defaultAvatar;
  }
  
  return url;
};

/**
 * Get profile image(s) from a match prioritizing photos array over avatar
 */
export const getProfileImages = (photos: string[] = [], avatar?: string): string[] => {
  // If there are photos, use them
  if (photos && photos.length > 0) {
    return photos;
  }
  
  // Otherwise, use avatar as a fallback if available
  if (avatar) {
    return [avatar];
  }
  
  // Last resort: use default avatar
  return [defaultAvatar];
};