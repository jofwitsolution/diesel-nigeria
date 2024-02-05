import React from "react";

const Overlay = () => {
  return (
    <div className="absolute inset-0 z-[6000] h-[64rem] w-full">
      <div className="size-full bg-[rgba(0,0,0,0.8)]"></div>
    </div>
  );
};

export default Overlay;
