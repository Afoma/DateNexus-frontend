import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInYears } from "date-fns";
import { ChevronDownIcon, X, Wallet } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDisconnect, useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"; 
import { Input } from "@/components/ui/input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { onboardingSchema, type OnboardingFormData } from "@/lib/schema";
import { SelectValue } from "@radix-ui/react-select";
import axiosInstance from "@/services/api-client";
import toast from "react-hot-toast";
import { PuffLoader } from "react-spinners";
import SocialPlatformSection from "./SocialPlatformSection";

// Warning modal for when user tries to disable worldwide matching
const WorldwideWarningModal = ({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal content */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-[#f83e67] to-[#a50976] rounded-full flex items-center justify-center mb-4">
            <span className="text-white text-2xl font-bold">!</span>
          </div>

          <h3 className="text-xl font-semibold mb-2">Limited Matching</h3>

          <p className="text-[#6d6d6d] mb-6">
            Turning off worldwide discovery may significantly reduce your matches. Most users prefer worldwide discovery for the best experience.
          </p>

          <div className="flex gap-4 w-full">
            <Button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-xl"
            >
              Keep Worldwide
            </Button>
            <Button
              type="button"
              onClick={onConfirm}
              className="flex-1 bg-gradient-to-r from-[#f83e67] to-[#a50976] text-white rounded-xl"
            >
              Turn Off Anyway
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Define the coordinates type to fix TypeScript errors
interface Coordinates {
  lat: number | null;
  lng: number | null;
}

const Onboarding = (): JSX.Element => {
  const navigate = useNavigate();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const [locationInfo, setLocationInfo] = useState<string | null>(null);
  const [distance, setDistance] = useState(200);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coordinates, setCoordinates] = useState<Coordinates>({
    lat: null,
    lng: null,
  });
  
  // State for worldwide warning modal
  const [showWorldwideWarning, setShowWorldwideWarning] = useState(false);
  const [pendingWorldwideValue, setPendingWorldwideValue] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      distance: 200,
      worldwide: true, // Start with worldwide enabled by default
    },
  });

  const birthday = watch("birthday");
  const worldwide = watch("worldwide");

  // Set worldwide to true by default when component mounts
  useEffect(() => {
    setValue("worldwide", true);
  }, [setValue]);

  useEffect(() => {
    const storedLocation = localStorage.getItem("selectedLocation");
    if (storedLocation) {
      try {
        const location = JSON.parse(storedLocation) as {
          lat: number;
          lng: number;
          address?: string;
        };
        if (location.address) {
          setLocationInfo(location.address);
        } else {
          getLocationInfo(location.lat, location.lng);
        }
        setCoordinates({ lat: location.lat, lng: location.lng });
      } catch (error) {
        console.error("Error parsing stored location:", error);
      }
    }
  }, []);

  const getLocationInfo = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      if (data.display_name) {
        setLocationInfo(data.display_name);
      }
    } catch (error) {
      console.error("Error getting location info:", error);
      toast.error("Failed to get location information");
    }
  };

  // Calculate age from birthdate
  const calculateAge = (birthdate: Date): number => {
    return differenceInYears(new Date(), birthdate);
  };

  // Convert miles to kilometers
  const milesToKilometers = (miles: number): number => {
    return Math.round(miles * 1.60934);
  };

  // Handle worldwide toggle change
  const handleWorldwideToggle = (checked: boolean) => {
    if (checked) {
      // Turning ON worldwide - no warning needed
      setValue("worldwide", true);
    } else {
      // Trying to turn OFF worldwide - show warning
      setShowWorldwideWarning(true);
      setPendingWorldwideValue(false);
      // Don't change the state yet - wait for user confirmation
    }
  };

  // Handle confirmation from modal to turn off worldwide
  const handleConfirmDisableWorldwide = () => {
    setValue("worldwide", false);
    setShowWorldwideWarning(false);
  };

  // Submit handler that makes three separate API calls
  const onSubmit = async (data: OnboardingFormData) => {
    // Check if location is provided
    if (!coordinates.lat || !coordinates.lng) {
      toast.error("Please select your location");
      return;
    }

    // Start submitting
    setIsSubmitting(true);

    try {
      // Step 1: Calculate age from birthday
      const age = calculateAge(data.birthday);

      // Step 2: Submit profile data (age, gender, profession)
      const profilePayload = {
        age,
        gender: data.gender,
        profession: data.occupation, // Map occupation to profession
      };

      // Toast loading notification
      const loadingToast = toast.loading("Saving your profile...");

      try {
        // First API call - POST to /users/profile
        await axiosInstance.post("/users/profile", profilePayload);

        // Second API call - POST to /users/profile/location for coordinates
        const locationPayload = {
          latitude: coordinates.lat,
          longitude: coordinates.lng,
        };

        await axiosInstance.post("/users/profile/location", locationPayload);

        // Third API call - PATCH to /users/profile/location for distance
        // Modified to send 0 instead of null when worldwide is true
        const distancePayload = {
          distance: data.worldwide ? 0 : milesToKilometers(data.distance),
        };

        await axiosInstance.patch("/users/profile/location", distancePayload);

        // If all API calls succeed, show success toast and navigate
        toast.dismiss(loadingToast);
        toast.success("Profile saved successfully!");

        // Navigate to next page
        navigate("/app/upload-photos");
      } catch (error: any) {
        // Dismiss loading toast and show error
        toast.dismiss(loadingToast);

        if (error.response?.data?.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Failed to save profile. Please try again.");
        }
        console.error("API Error:", error);
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Submission Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      const loadingToast = toast.loading("Getting your location...");

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          localStorage.setItem("selectedLocation", JSON.stringify(location));
          setCoordinates(location);
          await getLocationInfo(location.lat, location.lng);
          toast.dismiss(loadingToast);
          toast.success("Location detected successfully!");
        },
        (error) => {
          toast.dismiss(loadingToast);
          toast.error(
            "Failed to get your location. Please try again or select manually."
          );
          console.error("Error getting location:", error);
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser");
    }
  };

  const handleChooseLocation = () => {
    navigate("/app/map-selection");
  };

  const handleDistanceChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const newDistance = Math.round((percentage / 100) * 500);
    const clampedDistance = Math.min(Math.max(newDistance, 1), 500);
    setDistance(clampedDistance);
    setValue("distance", clampedDistance);
  };

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-full max-w-[1440px] relative">
        {/* Decorative gradient elements */}
        <div className="absolute w-[432px] h-[145px] top-[-34px] left-[-138px] z-0">
          <div className="absolute w-[429px] h-[55px] top-[23px] left-0.5 rounded-[0px_0px_119.06px_35.72px] rotate-[-6.07deg] [background:linear-gradient(252deg,rgba(248,62,103,1)_0%,rgba(165,9,118,1)_100%)]" />
          <div className="absolute w-[292px] h-[37px] top-[93px] left-[5px] rounded-[0px_0px_81.03px_24.31px] rotate-[-6.07deg] [background:linear-gradient(252deg,rgba(248,62,103,1)_0%,rgba(165,9,118,1)_100%)]" />
        </div>

        {/* Main content container */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative flex flex-col items-center pt-[171px] pb-[227px] px-4"
        >
          <div className="w-full max-w-[648px] flex flex-col gap-8">
            {/* Header section */}
            <div>
              <div className="text-center lg:text-center gap-2 text-2xl lg:text-4xl font-semibold mt-24 md:mt-2 p-2 pb-10">
                <h1 className="text-[#000000] text-center text-nowrap">
                  Create your DateN
                  <span className="bg-gradient-to-r from-[#F83E67] to-[#A50976] text-transparent bg-clip-text">
                    exus profile
                  </span>
                </h1>
                {isConnected && address && (
                  <div className="mt-4 flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
                      <Wallet className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {`${address.slice(0, 6)}...${address.slice(-4)}`}
                      </span>
                    </div>
                    <Button
                      onClick={() => disconnect()}
                      variant="outline"
                      className="text-sm text-gray-600 hover:text-red-500 border-gray-200 hover:border-red-200"
                    >
                      Disconnect Wallet
                    </Button>
                  </div>
                )}
              </div>

              <h2 className="font-medium text-[#6d6d6d] text-center mb-4 text-xl">
                Building Your Unique Digital Identity.
              </h2>
            </div>

            {/* Social accounts section */}
            <SocialPlatformSection />

            {/* Birthday section */}
            <div className="mt-4">
              <h3 className="font-medium text-[#2f3438] text-xl mb-4">
                What is your Birthday?
              </h3>
              <DatePicker
                selected={birthday}
                onChange={(date: Date | null) =>
                  setValue("birthday", date as Date)
                }
                dateFormat="MMMM d, yyyy"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="MM - DD - YY"
                className="h-[70px] w-full bg-[#f5f6f8] rounded-2xl border-none pl-8 text-xl font-medium"
                wrapperClassName="w-full"
              />
              {errors.birthday && (
                <p className="mt-2 text-red-500">{errors.birthday.message}</p>
              )}
            </div>

            {/* Gender preference section */}
            <div className="mt-4">
              <h3 className="font-medium text-[#2f3438] text-xl mb-4">
                What is the gender of your preferred choice?
              </h3>
              <Select onValueChange={(value) => setValue("gender", value)}>
                <SelectTrigger className="h-[70px] bg-[#f5f6f8] rounded-2xl border-none pl-8 text-xl font-medium placeholder:text-[#cfcfcf]">
                  <SelectValue placeholder="Select" />
                  <ChevronDownIcon className="w-6 h-6 text-gray-400 ml-auto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="mt-2 text-red-500">{errors.gender.message}</p>
              )}
            </div>

            {/* Occupation section */}
            <div className="mt-4">
              <h3 className="font-medium text-[#2f3438] text-xl mb-4">
                What do you do for a living?
              </h3>
              <Input
                {...register("occupation")}
                className="h-[70px] bg-[#f5f6f8] rounded-2xl border-none pl-8 text-xl font-medium placeholder:text-[#cfcfcf]"
                placeholder="Enter your occupation"
              />
              {errors.occupation && (
                <p className="mt-2 text-red-500">{errors.occupation.message}</p>
              )}
            </div>

            {/* Geolocation section */}
            <div className="mt-4">
              <h3 className="font-medium text-[#2f3438] text-xl mb-4">
                Geolocation
              </h3>
              <Card className="bg-[#f5f6f8] rounded-2xl border-none">
                <CardContent className="flex flex-col items-center justify-center py-12 px-6">
                  <button
                    type="button"
                    onClick={handleGetCurrentLocation}
                    className="font-medium text-xl mb-6 bg-gradient-to-r from-[#f83e67] to-[#a50976] bg-clip-text text-transparent underline"
                  >
                    Use my current location
                  </button>
                  <button
                    type="button"
                    onClick={handleChooseLocation}
                    className="font-medium text-[#a2a2a2] text-sm underline"
                  >
                    Choose by yourself instead
                  </button>
                  {locationInfo && (
                    <div className="mt-4 text-sm text-gray-600 bg-gray-50 p-3 rounded w-full text-center">
                      <strong>Selected Location:</strong> {locationInfo}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Distance preference section */}
            <div className="mt-4">
              <h3 className="font-medium text-[#2f3438] text-xl mb-4">
                How far are you willing to connect with someone? Think of your
                ideal match&apos;s location
              </h3>
              <Card className="bg-[#f5f6f8] rounded-2xl border-none">
                <CardContent className="p-10">
                  <div className="mb-12">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-medium text-[#383838] text-[16.4px]">
                        Distance
                      </span>
                      <span className="font-medium text-[16.4px] bg-gradient-to-r from-[#f83e67] to-[#a50976] bg-clip-text text-transparent">
                        {distance} Miles ({milesToKilometers(distance)} km)
                      </span>
                    </div>

                    <div className="relative" onClick={handleDistanceChange}>
                      <div className="w-full h-2.5 bg-white rounded-[7.79px]"></div>
                      <div
                        className="absolute top-0 left-0 h-2.5 rounded-[7.79px] bg-gradient-to-r from-[#f83e67] to-[#a50976]"
                        style={{ width: `${(distance / 500) * 100}%` }}
                      ></div>
                      <div
                        className="absolute top-[-10px] w-[33px] h-[33px] rounded-[16.55px] border-[1.95px] border-solid border-white bg-gradient-to-b from-[#f83e67] to-[#a50976] cursor-grab"
                        style={{
                          left: `calc(${(distance / 500) * 100}% - 16.5px)`,
                        }}
                      ></div>

                      <div className="flex justify-between mt-2">
                        <span className="text-[#a2a2a2] text-[11.7px] font-medium">
                          1 mile
                        </span>
                        <span className="text-[#a2a2a2] text-[11.7px] font-medium">
                          500 miles
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="flex items-center mb-3">
                      <div className="h-[34px] bg-white rounded-[76.11px] flex items-center p-1">
                        <Switch
                          checked={worldwide}
                          onCheckedChange={handleWorldwideToggle}
                          className="data-[state=unchecked]:bg-neutral-300 data-[state=checked]:bg-gradient-to-r from-[#f83e67] to-[#a50976]"
                        />
                      </div>
                    </div>
                    <span className="font-medium text-[15.2px] bg-gradient-to-r from-[#f83e67] to-[#a50976] bg-clip-text text-transparent">
                      Anywhere in the world
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Done button */}
            <div className="mt-8 flex justify-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-[463px] h-[60px] rounded-[13.31px] bg-gradient-to-r from-[#f83e67] to-[#a50976] text-white font-medium text-[15px] disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <PuffLoader color="#ffffff" size={24} />
                    <span>Saving...</span>
                  </>
                ) : (
                  "Done"
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* Worldwide Warning Modal */}
      <WorldwideWarningModal
        isOpen={showWorldwideWarning}
        onClose={() => setShowWorldwideWarning(false)}
        onConfirm={handleConfirmDisableWorldwide}
      />
    </div>
  );
};

export default Onboarding;
