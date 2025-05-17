import { useState } from "react";
import Layout from "@/components/layouts/AuthLayout";
import ExploreCard from "@/components/Eplore/ExploreCard";
import Header from "@/components/global/Header";

interface Community {
  id: number;
  title: string;
  imageSrc: string; 
  memberCount: number;
  isJoined: boolean;
  endDate: Date;
  memberAvatars: string[];
}

const communities: Community[] = [
  {
    id: 1,
    title: "Ui/Ux Designers",
    imageSrc: "/assets/community-1.jpeg",
    memberCount: 1234,
    isJoined: false,
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
    memberAvatars: Array(9).fill("/assets/members.png"),
  },
  {
    id: 2,
    title: "Content Creators",
    imageSrc: "/assets/community-2.jpeg",
    memberCount: 856,
    isJoined: true,
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
    memberAvatars: Array(9).fill("/assets/members.png"),
  },
  {
    id: 3,
    title: "Developers Hub",
    imageSrc: "/assets/community-3.jpeg",
    memberCount: 856,
    isJoined: true,
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
    memberAvatars: Array(9).fill("/assets/members.png"),
  },
  {
    id: 4,
    title: "Ui/Ux Designers",
    imageSrc: "/assets/community-1.jpeg",
    memberCount: 1234,
    isJoined: false,
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
    memberAvatars: Array(9).fill("/assets/members.png"),
  },
  {
    id: 5,
    title: "Developers Hub",
    imageSrc: "/assets/community-3.jpeg",
    memberCount: 856,
    isJoined: true,
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
    memberAvatars: Array(9).fill("/assets/members.png"),
  },
  {
    id: 6,
    title: "Content Creators",
    imageSrc: "/assets/community-2.jpeg",
    memberCount: 856,
    isJoined: false,
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
    memberAvatars: Array(9).fill("/assets/members.png"),
  },
];

const Explore = () => {
  const [joinedCommunities, setJoinedCommunities] = useState<{
    [id: number]: boolean;
  }>(
    communities.reduce((acc, community) => {
      acc[community.id] = community.isJoined;
      return acc;
    }, {} as { [id: number]: boolean })
  );

  const handleJoin = (id: number) => {
    setJoinedCommunities((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Layout>
      <div className="z-10 relative mt-10">
        <Header />
      </div>
      <div className="w-full flex justify-center items-center">
        <div className="max-w-5xl w-full px-4 ">
          <div className="flex justify-center items-center text-center gap-2 text-2xl lg:text-4xl font-semibold mt-24 md:mt-2">
            <h1 className="text-[#000000] text-nowrap">Embark On</h1>
            <span className="bg-gradient-to-r from-[#F83E67] to-[#A50976] text-transparent bg-clip-text">
              Exploration
            </span>
          </div>

          <p className="text-[#6E6E6E] text-center text-xl lg:text-2xl py-0 lg:py-4">
            Find what moves you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-10 w-full lg:w-[80%] mx-auto">
            {communities.map((community) => (
              <ExploreCard
                key={community.id}
                title={community.title}
                imageSrc={community.imageSrc}
                memberCount={community.memberCount}
                memberAvatars={community.memberAvatars}
                isJoined={joinedCommunities[community.id]}
                endDate={community.endDate}
                onJoin={() => handleJoin(community.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Explore;
