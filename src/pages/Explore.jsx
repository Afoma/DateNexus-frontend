import React from "react";
import Layout from "@/components/Eplore/Layout";
import ExploreCard from "@/components/Eplore/ExploreCard";
import image1 from "@/assets/community-1.jpeg";
import image2 from "@/assets/community-2.jpeg";
import image3 from "@/assets/community-3.jpeg";

const communities = [
  {
    id: 1,
    title: "Ui/Ux Designers",
    imageSrc: image1,
    memberCount: 1234,
    isJoined: false,
  },
  {
    id: 2,
    title: "Content Creators",
    imageSrc: image2,
    memberCount: 856,
    isJoined: true,
  },
  {
    id: 3,
    title: "Developers Hub",
    imageSrc: image3,
    memberCount: 856,
    isJoined: true,
  },
  {
    id: 4,
    title: "Ui/Ux Designers",
    imageSrc: image1,
    memberCount: 1234,
    isJoined: false,
  },
  {
    id: 5,
    title: "Developers Hub",
    imageSrc: image3,
    memberCount: 856,
    isJoined: true,
  },
  {
    id: 6,
    title: "Content Creators",
    imageSrc: image2,
    memberCount: 856,
    isJoined: false,
  },
];

const Explore = () => {
  return (
    <Layout>
      <div className="w-full">
        <div className="flex flex-start gap-2 text-2xl lg:text-4xl font-semibold mt-24 md:mt-2 p-2">
          <h1 className="text-[#000000] text-nowrap ">Embark On </h1>
          <span className="bg-gradient-to-r from-[#F83E67] to-[#A50976] text-transparent bg-clip-text">
            Exploration
          </span>
        </div>
        <p className="text-[#6E6E6E] text-xl lg:text-2xl py-0 lg:py-4 p-2">
          Find what moves you.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  w-full">
          {communities.map((community) => (
            <ExploreCard
              key={community.id}
              title={community.title}
              imageSrc={community.imageSrc}
              memberCount={community.memberCount}
              isJoined={community.isJoined}
              onJoin={() => console.log(`Joined ${community.title}`)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Explore;
