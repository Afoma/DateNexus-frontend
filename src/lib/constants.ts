import { MenuItemType } from "types";

export const menuItems: MenuItemType[] = [
  {
    id: "discover",
    icon: "/assets/nav/nav-home.svg",
    activeIcon: "/assets/nav/nav-home_active.svg",
    label: "Discover",
    path: "/app/discover",
  },
  {
    id: "chat",
    icon: "/assets/nav/chat.svg",
    activeIcon: "/assets/nav/chat_active.svg",
    label: "Chat",
    path: "/app/chat",
  },
  {
    id: "match",
    icon: "/assets/nav/match.svg",
    activeIcon: "/assets/nav/match_active.svg",
    label: "Match",
    path: "/app/match",
  },
  {
    id: "explore",
    icon: "/assets/nav/explore.svg",
    activeIcon: "/assets/nav/explore_active.svg",
    label: "Explore",
    path: "/app/explore",
  },
  {
    id: "account",
    icon: "/assets/nav/account.svg",
    activeIcon: "/assets/nav/account_active.svg",
    label: "Account",
    path: "/app/account",
  },
];
