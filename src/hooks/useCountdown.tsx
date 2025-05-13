import { useState, useEffect } from "react";

const useCountdown = (targetDate: any) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;
      setCountDown(distance);

      if (distance <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  // Calculate time units
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  const isComplete = countDown <= 0;

  return {
    days: isComplete ? 0 : days,
    hours: isComplete ? 0 : hours,
    minutes: isComplete ? 0 : minutes,
    seconds: isComplete ? 0 : seconds,
    isComplete,
  };
};

export default useCountdown;
