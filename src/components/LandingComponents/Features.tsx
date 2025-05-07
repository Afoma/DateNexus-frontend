import { Card, CardContent, CardHeader } from "../ui/card";
import SignUpImage from "@/assets/Signup.svg";
import ProfileCreation from "@/assets/profileCreation.svg";
import Discover from "@/assets/dicover.svg";
import Text from "./Text";

const Features = () => {
  const features = [
    {
      id: 1,
      img: SignUpImage,
      heading: "Smooth, and Fast Onboarding Process.",
      text: "Sign up with an option of email or with a smart wallet that doesn’t require app downloads, passwords or seed phrases.",
    },
    {
      id: 2,
      img: ProfileCreation,
      heading: "Personalized and Interactive Profile Creation.",
      text: "Advanced AI technology will give you a personalized, interactive experience while creating your profile.",
    },
    {
      id: 3,
      img: Discover,
      heading: "Network with Intelligent People of Value",
      text: "This app exposes you to an exclusive array of like-minded people, providing a unique opportunity to connect and collaborate.",
    },
  ];
  return (
    <div className="flex flex-col gap-6 items-center font-sans">
      <Text heading="Features Of DateNexus" size="text-4xl lg:text-5xl">
        Introducing DateNexus- the best onchain dating app created to offer a
        refined dating experience for people that value intellectual
        compatibility.
      </Text>
      <div className="mt-10 flex flex-col lg:flex-row gap-8">
        {features.map((feature) => (
          <Card
            key={feature.id}
            className="bg-transparent p-0 m-0 border-none shadow-none rounded-none w-[280px] md:w-[300px] lg:w-auto"
          >
            <CardHeader className="bg-pattern flex justify-center p-0 lg:h-[400px] rounded-[24px]">
              <div className="flex justify-center items-end h-full">
                <img className="w-[186px] pt-14 lg:pt-0" src={feature.img} alt="" />
              </div>
            </CardHeader>
            <CardContent className="px-0 py-6 m-0 flex flex-col gap-4">
              <h3 className="text-gradient-custom text-xl lg:w-[300px]">
                {feature.heading}
              </h3>
              <p className="text-custom-text-secondary lg:w-[300px] xl:w-[380px] text-base">
                {feature.text}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Features;
