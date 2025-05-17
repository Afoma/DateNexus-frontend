import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/services/api-client";

// Define the UserProfile interface based on the API response
export interface UserProfile {
  subscription: {
    plan: string;
  };
  location: {
    coordinates: [number, number];
    type: string;
  };
  preferences: {
    interestDistance: number;
  };
  _id: string;
  email: string;
  interests: string[];
  role: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  age: number;
  name?: string;
  gender: string;
  about?: string;
  profession: string;
  quest: string;
  photos?: string[];
}

interface ProfileResponse {
  status: string;
  data: {
    user: UserProfile; // Profile data is nested inside 'user' object
  };
}

/**
 * Custom hook to fetch a user's profile by ID
 * @param id The ID of the user to fetch
 */
const useUserProfile = (id: string | undefined) => {
  return useQuery<ProfileResponse, Error>({
    queryKey: ["userProfile", id],
    queryFn: async () => {
      console.log(`Fetching profile for userId: ${id}`);
      const response = await axiosInstance.get<ProfileResponse>(`/users/profile/${id}`);
      return response.data;
    },
    enabled: !!id, // Only run the query if id is provided
    refetchOnMount: true, // Refetch when component mounts
    retry: 2 // Retry twice in case of network issues
  });
};

export default useUserProfile;