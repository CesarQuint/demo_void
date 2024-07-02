import { useEffect, useState } from "react";
import { format } from "date-fns";

type Props = {};

const useTime = (): string => {
  const [time, setTime] = useState(format(new Date(), "HH:mm:ss"));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(format(new Date(), "HH:mm:ss"));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return time;
};

export default useTime;
