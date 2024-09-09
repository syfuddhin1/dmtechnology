import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-16 h-16">
        <div className="absolute w-full h-full bg-blue-500 rounded-md animate-pulse"></div>
        <div className="absolute w-full h-full bg-blue-500 rounded-md animate-ping"></div>
        <div className="absolute w-full h-full bg-blue-500 rounded-md animate-spin"></div>
      </div>
    </div>
  );
};

export default Spinner;
