import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

const ExploreCard = ({
  title,
  imageSrc,
  memberCount,
  onJoin,
  isJoined = false,
}) => {
  return (
    <Card className="relative group overflow-hidden w-[380px] lg:w-[420px] h-[320px]">
      <div className="absolute inset-0">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors" />
      </div>

      <div className="absolute top-6 right-6 z-10">
        <Badge className="bg-[#FFFFFF36]/20 text-white hover:bg-white/75 flex items-center gap-1.5 px-3 py-1.5">
          <Users color="white" className="w-4 h-4" />
          <span className="text-sm">{memberCount}</span>
        </Badge>
      </div>

      <CardContent className="relative z-10 flex flex-col items-center justify-center h-full p-6">
        <h3 className="text-2xl font-semibold bg-gradient-to-r from-[#F83E67] to-[#A50976] text-transparent bg-clip-text text-center mb-4">
          {title}
        </h3>
      </CardContent>

      <CardFooter className=" z-10 absolute bottom-0 left-0 right-0 flex justify-center p-6">
        <Button
          onClick={onJoin}
          variant={isJoined ? "secondary" : "default"}
          className={`w-full max-w-[240px] h-11 text-base ${
            isJoined
              ? "bg-white/20 hover:bg-white/30"
              : "bg-gradient-to-r from-[#F83E67] to-[#A50976]"
          }`}
        >
          {isJoined ? "Joined" : "Join Community"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExploreCard;
