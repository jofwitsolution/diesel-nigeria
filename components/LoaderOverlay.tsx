import React from "react";
import { ClipLoader, RingLoader } from "react-spinners";

interface Props {
  type?: string;
  color?: string;
  size?: number;
  text?: string;
}

const LoaderType = ({ type, color, size }: Props) => {
  if (type === "ringloader") {
    return <RingLoader color={color} size={size} />;
  }
  if (type === "cliploader") {
    return <ClipLoader color={color} size={size} />;
  }

  return <RingLoader color={color} size={size} />;
};

const LoaderOverlay = ({
  type,
  color = "green",
  size = 35,
  text = "Loading...",
}: Props) => {
  return (
    <div className="fixed inset-0 z-[9500] h-screen w-full">
      <div className="flex size-full flex-col items-center justify-center gap-6 bg-[rgba(0,0,0,0.8)]">
        <LoaderType type={type} color={color} size={size} />
        <span className="text-[1.2rem] font-[600] text-light-900">{text}</span>
      </div>
    </div>
  );
};

export default LoaderOverlay;
