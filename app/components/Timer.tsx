import React from "react";
import useTime from "../utils/hooks/useTime";

const Timer = () => {
  const time = useTime();
  return <p>{time}</p>;
};

export default Timer;
