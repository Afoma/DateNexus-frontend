export interface Match {
  _id: string;
  email: string;
  interests: string[];
  role: string;
  avatar: string;
  createdAt: string;
  age?: number;
  name?: string;
  gender?: string;
  about?: string;
  profession?: string;
  quest?: string;
  photos?: string[];
  preferences: {
    interestDistance: number;
  };
}