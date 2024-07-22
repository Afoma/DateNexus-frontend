/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Brand from "./Brand";

const AppLoader = () => {
  const [currentText, setCurrentText] = useState(0);
  const texts = ["Find Love", "Connect with like mind", "Find Peace"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prevText) => (prevText + 1) % texts.length);
    }, 2000); // Change text every 2 seconds

    return () => clearInterval(interval);
  }, []); 

  return (
    <div className="h-screen flex gap-4 flex-col justify-center overflow-hidden bg-custom-gradient">
      <div className="flex justify-center">
        <Brand />
      </div>
      <div className="flex justify-center relative">
        {texts.map((text, index) => (
          <h3
            key={text}
            className={`
              absolute text-sm font-bold text-whitish
              transition-all duration-500 ease-in-out
              ${
                index === currentText
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }
            `}
          >
            {text}
          </h3>
        ))}
      </div>
    </div>
  );
};

export default AppLoader;
