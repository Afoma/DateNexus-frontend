/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import Layouts from "./layouts/NoAuthLayout";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import Cancel from "@/assets/cancel.svg";
import Share from "@/assets/share.svg";
import Add from "@/assets/add.svg";
import Dots from "@/assets/dots.svg";
import Phone from "@/assets/phone.svg";

const InstallationStep = ({ number, children }) => (
  <div className="flex items-start space-x-2 mb-2">
    <div className="flex items-center justify-center text-custom-black">
      {number}.
    </div>
    <p className="text-custom-black">{children}</p>
  </div>
);

const InstallationGuide = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/app/installation");
  };

  return (
    <Layouts>
      <div className="flex flex-col items-center gap-6 justify-center">
        <Logo />
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-4xl text-gradient-custom font-semibold">
            <span className="text-black">DateN</span>exus
          </h3>
          <p className="text-custom-text-secondary text-sm text-center">
            Find Love Onchain
          </p>
        </div>
        <div className="flex flex-col items-center justify-center p-4">
          <Card className="w-full max-w-md relative rounded-[24px] bg-whitish">
            <Button
              onClick={handleClose}
              className="absolute top-2 right-2 p-2"
              variant="ghost"
            >
              <img src={Cancel} alt="Icon" />
            </Button>
            <CardHeader>
              <CardTitle className="text-center text-sm font-medium text-custom-black">
                Add To Home Screen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs
                defaultValue="safari"
                className="flex flex-col items-center"
              >
                <TabsList className="grid w-full justify-center grid-cols-2 mb-4 bg-white rounded-[8px]">
                  <TabsTrigger
                    className="data-[state=active]:bg-whitish w-auto data-[state=active]:rounded-[6px]"
                    value="safari"
                  >
                    Safari
                  </TabsTrigger>
                  <TabsTrigger
                    className="data-[state=active]:bg-whitish data-[state=active]:rounded-[6px]"
                    value="chrome"
                  >
                    Chrome
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="safari" className="flex flex-col gap-2">
                  <InstallationStep number={1}>
                    Tap the <img className="inline" src={Share} alt="Icon" />{" "}
                    Share icon at the bottom of the screen
                  </InstallationStep>
                  <InstallationStep number={2}>
                    Select Add to Home Screen{" "}
                    <img className="inline" src={Add} alt="Icon" />
                  </InstallationStep>
                </TabsContent>
                <TabsContent value="chrome" className="flex flex-col gap-2">
                  <InstallationStep number={1}>
                    Tap the <img className="inline" src={Dots} alt="Icon" />{" "}
                    Share icon at the top-right corner of the screen
                  </InstallationStep>
                  <InstallationStep number={2}>
                    Select <img className="inline" src={Phone} alt="" /> Add to
                    Home Screen
                  </InstallationStep>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layouts>
  );
};

export default InstallationGuide;
