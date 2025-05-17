import Header from "@/components/global/Header";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layouts/AuthLayout";
import useUserProfile from "@/hooks/useUserProfile";
import { PuffLoader } from "react-spinners";
import toast from "react-hot-toast";
import ConnectButton from "@/components/ConnectionButton";


const ProfileDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Fetch profile data using the custom hook
  const { 
    data: profileData, 
    isLoading, 
    error, 
    refetch 
  } = useUserProfile(id);

  // Extract profile from the nested data structure
  const profile = profileData?.data?.user;
  
  // Ensure profile data is fetched on mount and when id changes
  useEffect(() => {
    if (id) {
      console.log("Forcing profile refetch for ID:", id);
      refetch();
    }
  }, [id, refetch]);

  // Handle loading state
  if (isLoading) {
    return (
      <Layout>
        <div className="z-10 relative mt-10">
          <Header />
        </div>
        <div className="flex flex-col items-center justify-center min-h-[500px]">
          <PuffLoader color="#f83e67" size={60} />
          <p className="mt-4 text-gray-500">Loading profile...</p>
        </div>
      </Layout>
    );
  }

  // Handle error state
  if (error || !profile) {
    return (
      <Layout>
        <div className="z-10 relative mt-10">
          <Header />
        </div>
        <div className="flex flex-col items-center justify-center min-h-[500px] px-4">
          <div className="text-center">
            <img
              src="/assets/error-icon.svg"
              alt="Error"
              className="w-20 h-20 mx-auto mb-4"
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/80?text=!";
              }}
            />
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              Profile Not Found
            </h3>
            <p className="text-gray-500 mb-4">
              We couldn't find this profile. It may have been removed or you
              don't have permission to view it.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => refetch()}
                variant="outline" 
                className="border-[#f83e67] text-[#f83e67]"
              >
                Try Again
              </Button>
              <Button
                onClick={() => navigate("/app/discover")}
                className="bg-gradient-to-r from-[#F83E67] to-[#A50976] text-white"
              >
                Back to Discover
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Get location display name from coordinates
  const getLocationDisplay = () => {
    try {
      if (profile.location && profile.location.coordinates && profile.location.coordinates.length === 2) {
        return `${profile.location.coordinates[0]}, ${profile.location.coordinates[1]}`;
      }
    } catch (e) {
      console.error("Error parsing location:", e);
    }
    return "Not specified";
  };

  // Create essentials array from profile data
  const essentials = [
    {
      icon: "/assets/birthday.svg",
      text: profile.age ? `${profile.age} years old` : "Age not specified",
    },
    {
      icon: "/assets/location.svg",
      text: getLocationDisplay(),
    },
    {
      icon: "/assets/gender.svg",
      text: profile.gender
        ? profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1)
        : "Not specified",
    },
  ];

  // Display name or email if name is missing
  const displayName = profile.name || profile.email.split("@")[0];

  return (
    <Layout>
      <div className="z-10 relative mt-10">
        <Header />
      </div>
      <div>
        <div className="bg-white p-5">
          {/* Main Profile Card */}
          <div className="bg-[#f5f6f8] rounded-[20.72px] p-6">
            <div className="relative max-w-[223px]">
              <div className="relative rounded-[9.55px] overflow-hidden">
                <img
                  src={profile.avatar}
                  alt={displayName}
                  className="h-[250px] w-full object-cover bg-no-repeat bg-center"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
                  }}
                />

                <button className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-[22px] h-[29px] text-center">
                  <div className="w-[19px] h-[19px] mx-auto bg-[#d9d9d98a] rounded-[9.67px] border-[0.81px] border-solid border-white backdrop-blur-[1.61px]">
                    <img
                      className="w-2 h-[5px] mx-auto mt-1.5"
                      alt="Swipe up"
                      src="/assets/swipeup.svg"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/10x5?text=^";
                      }}
                    />
                  </div>
                  <div className="font-semibold text-white text-[4.1px] mt-1">
                    View Profile
                  </div>
                </button>
              </div>

              <div className="flex justify-center items-center mt-4">
                <div className="font-medium text-[#f83e67] text-sm">
                  {displayName}, {profile.age}
                </div>
                {profile.role === "admin" && (
                  <img
                    className="w-4 h-4 ml-2"
                    alt="Verified"
                    src="/material-symbols-verified-2.svg"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/16?text=V";
                    }}
                  />
                )}
              </div>

              <div className="text-center font-normal text-[#383838] text-[10.4px] mt-2 mx-auto max-w-[155px]">
                {profile.profession || "No profession specified"}
              </div>

              {/* Using the reusable ConnectButton component */}
              <div className="mt-3">
                <ConnectButton 
                  userId={profile._id} 
                  questId={profile.quest} 
                  onSuccess={() => {
                    toast.success(`Connection initiated with ${displayName}`);
                    refetch();
                  }}
                />
              </div>
            </div>

            <div className="space-y-6 mt-6">
              {/* Photos Section */}
              <div className="bg-gradient-to-r from-[#F83E67] to-[#A50976] text-transparent bg-clip-text font-medium text-xl">
                Photos
              </div>

              {/* Photo gallery */}
              <div className="flex gap-[15px] flex-wrap">
                {/* Avatar is always shown */}
                <div
                  className="w-[136px] h-[147px] rounded-[17.1px]"
                  style={{
                    backgroundImage: `url(${profile.avatar})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                
                {/* Additional photos if available */}
                {profile.photos && profile.photos.length > 0 && 
                  profile.photos.map((photo, index) => (
                    <div
                      key={index}
                      className="w-[136px] h-[147px] rounded-[17.1px]"
                      style={{
                        backgroundImage: `url(${photo})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                      onError={(e) => {
                        // @ts-ignore - setting style directly on error
                        e.currentTarget.style.backgroundImage = 'url(https://via.placeholder.com/136x147?text=Photo)';
                      }}
                    />
                  ))
                }
              </div>

              {/* About Section */}
              {profile.about && (
                <>
                  <div className="bg-gradient-to-r from-[#F83E67] to-[#A50976] text-transparent bg-clip-text font-medium text-xl">
                    About
                  </div>

                  <div className="font-normal text-[#383838] text-base tracking-[0] leading-[normal]">
                    {profile.about}
                  </div>
                </>
              )}

              {/* Profession Section */}
              {profile.profession && (
                <>
                  <div className="bg-gradient-to-r from-[#F83E67] to-[#A50976] text-transparent bg-clip-text font-medium text-xl">
                    Profession
                  </div>

                  <div className="font-normal text-[#383838] text-base tracking-[0] leading-[normal]">
                    {profile.profession}
                  </div>
                </>
              )}

              {/* Interests Section */}
              {profile.interests && profile.interests.length > 0 && (
                <>
                  <div className="bg-gradient-to-r from-[#F83E67] to-[#A50976] text-transparent bg-clip-text font-medium text-xl">
                    Interests
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="bg-white px-3 py-1 rounded-full text-sm text-gray-700"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </>
              )}

              {/* User's Essentials Section */}
              <div className="bg-gradient-to-r from-[#F83E67] to-[#A50976] text-transparent bg-clip-text font-medium text-xl">
                User's Essentials
              </div>

              {/* Essentials List */}
              <div className="flex flex-col gap-6">
                {essentials.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <img
                      className="w-5 h-5"
                      alt={item.text}
                      src={item.icon}
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/20?text=E";
                      }}
                    />

                    <div className="font-normal text-[#383838] text-base tracking-[0] leading-[normal]">
                      {item.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Match Distance (from preferences) */}
              {profile.preferences?.interestDistance && (
                <>
                  <div className="bg-gradient-to-r from-[#F83E67] to-[#A50976] text-transparent bg-clip-text font-medium text-xl">
                    Match Distance
                  </div>

                  <div className="font-normal text-[#383838] text-base tracking-[0] leading-[normal]">
                    Within {profile.preferences.interestDistance} km
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileDetails;