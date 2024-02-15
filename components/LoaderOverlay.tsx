import React from "react";
import { ClipLoader, RingLoader } from "react-spinners";

interface Props {
  type?: string;
  color?: string;
  size?: number;
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

const LoaderOverlay = ({ type, color = "green", size = 35 }: Props) => {
  return (
    <div className="fixed inset-0 z-[8000] h-screen w-full">
      <div className="flex size-full items-center justify-center bg-[rgba(0,0,0,0.8)]">
        <LoaderType type={type} color={color} size={size} />
      </div>
    </div>
  );
};

export default LoaderOverlay;
