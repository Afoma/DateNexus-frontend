export interface Profile {
  id: string | number;
  profileImage: string;
  name: string;
  age?: number;
  bio?: string;
  distance?: string;
  interests?: string[];
  images: string[];
  [key: string]: any;
}

export interface MenuItemType {
  id: string;
  icon: string;
  activeIcon: string;
  label: string;
  path: string;
}
