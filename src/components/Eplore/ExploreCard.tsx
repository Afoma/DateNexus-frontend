import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useCountdown from "@/hooks/useCountdown";
import {useNavigate} from "react-router-dom"

interface ExploreCardProps {
  title: string;
  imageSrc: string;
  memberCount: number;
  memberAvatars?: string[];
  onJoin: () => void;
  isJoined?: boolean;
  endDate?: Date | string;
}

const ExploreCard: React.FC<ExploreCardProps> = ({
  title,
  imageSrc,
  memberAvatars = [],
  onJoin,
  isJoined = false,
  endDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
}) => {
  const { days, hours, minutes, seconds } = useCountdown(endDate);
  const navigate = useNavigate()
  return (
    <Card className="relative group overflow-hidden w-full max-w-md rounded-xl bg-[#F5F6F8] shadow-sm transform transition-all duration-300 hover:scale-[1.02] hover:shadow-md" onClick={() => navigate("/app/explore/chat")}>
      <div className="h-44 relative overflow-hidden rounded-t-xl">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="absolute top-1/2 left-0 right-0 text-center transform -translate-y-1/2">
          <h3 className="text-2xl font-bold text-white drop-shadow-md">
            {title}
          </h3>
          <div className="flex justify-center items-center mt-3">
            <div
              className="flex items-center gap-1 px-3 py-2 text-xs rounded-md backdrop-blur-sm bg-[#FFFFFF36] text-white font-medium shadow-md"
              style={{ backdropFilter: "blur(14.299009323120117px)" }}
            >
              <span className="text-[#F83E67]">
                <span className=" font-semibold">
                  {days.toString().padStart(2, "0")}{" "}
                </span>
                <span className="">days</span>
              </span>
              <span className="text-white">|</span>
              <span className="text-[#F83E67]">
                <span className=" font-semibold">
                  {hours.toString().padStart(2, "0")}{" "}
                </span>
                <span className="">hours</span>
              </span>
              <span className="text-white">|</span>
              <span className="text-[#F83E67]">
                <span className=" font-semibold">
                  {minutes.toString().padStart(2, "0")}{" "}
                </span>
                <span className="">mins</span>
              </span>
              <span className="text-white">|</span>
              <span className="text-[#F83E67]">
                <span className=" font-semibold">
                  {seconds.toString().padStart(2, "0")}{" "}
                </span>
                <span className="">sec</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Content with Members */}
      <CardContent className="p-3">
        <div className="flex flex-col space-y-2">
          <h4 className="text-sm font-medium text-gray-600">Members</h4>

          <div className="flex -space-x-2 overflow-hidden py-3">
            {memberAvatars.slice(0, 7).map((avatar, index) => (
              <img
                key={index}
                src={avatar}
                alt="Member avatar"
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
              />
            ))}
            {memberAvatars.length > 7 && (
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-pink-500 text-white text-xs font-medium ring-2 ring-white">
                +{memberAvatars.length - 7}
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-3 pb-3 pt-0">
        <Button
          onClick={onJoin}
          className={`w-full h-10 rounded-lg transition-all duration-300 font-medium text-sm
            ${
              isJoined
                ? "bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-none"
                : "bg-gradient-to-r from-[#F83E67] to-[#A50976] text-white hover:shadow-md hover:from-[#F83E67] hover:to-[#8A075F]"
            }`}
          disabled={isJoined}
        >
          {isJoined ? "Already Joined" : "Join Now"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExploreCard;
