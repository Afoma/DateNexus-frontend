import React from "react";
import Location from "@/assets/discover/location.svg";
import Age from "@/assets/discover/age.svg";
import Gender from "@/assets/discover/gender.svg";

export default function MoreInfo({ data, onClose }) {
  return (
    <div className="w-full">
      <div className="relative h-full overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6 space-y-8">
          <section>
            <h2 className="bg-gradient-to-r from-[#F83E67] to-[#A50976] text-transparent bg-clip-text text-2xl  mb-4">
              Photos
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {data.images.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-2xl overflow-hidden group relative"
                >
                  <img
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Occupation Section */}
          <h2 className="bg-gradient-to-r from-[#F83E67] to-[#A50976] text-transparent bg-clip-text text-2xl mb-4">
            Occupation
          </h2>
          <section className="bg-white rounded-2xl p-6">
            <p className="text-[#383838] text-lg">{data.occupation}</p>
          </section>

          {/* Essentials Section */}
          <h2 className="bg-gradient-to-r from-[#F83E67] to-[#A50976] text-transparent bg-clip-text text-2xl mb-4">
            Essentials
          </h2>
          <section className="bg-white rounded-2xl p-6">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-[#383838] text-md">
              <div className="flex items-center space-x-3">
                <img src={Age} className="h-5 w-5" alt="age" />
                <div>
                  <p className="">{data.essentials.age} years</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <img src={Gender} className="h-5 w-5" alt="gender" />
                <div>
                  <p className="">{data.essentials.gender}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 ">
                <img src={Location} className="h-5 w-5" alt="location" />
                <div className="text-nowrap">
                  <p className="">{data.essentials.location}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
