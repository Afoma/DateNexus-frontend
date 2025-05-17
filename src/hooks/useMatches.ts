import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/services/api-client";
import toast from "react-hot-toast";

// Define the Match interface based on the API response
export interface Match {
  _id: string;
  email: string;
  interests: string[];
  role: string;
  avatar: string;
  createdAt: string;
  age: number;
  name: string;
  gender: string;
  about: string;
  profession: string;
  quest: string;
  preferences: {
    interestDistance: number;
  };
}

interface MatchResponse {
  status: string;
  data: {
    matches: Match[];
  };
}

// Query key for matches
export const MATCHES_QUERY_KEY = ["matches"];

/**
 * Function to fetch matches from the API
 */
const fetchMatches = async (): Promise<Match[]> => {
  try {
    const response = await axiosInstance.get<MatchResponse>("/users/match");
    return response.data.data.matches;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch matches";
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

/**
 * Custom hook to fetch user matches from the API using TanStack Query
 * @param {Object} options - Query options
 * @param {boolean} options.enabled - Whether the query should run automatically
 */
export const useMatches = (options = { enabled: true }) => {
  return useQuery({
    queryKey: MATCHES_QUERY_KEY,
    queryFn: fetchMatches,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    retry: 2, // Retry failed requests twice
    ...options,
  });
};
