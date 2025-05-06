import React from "react";

const Loader = ({ value }) => {
  if (!value) return ;

  return (
    <div className="h-full w-full flex items-center justify-center  bg-opacity-30 z-1">
      <div className="animate-spin rounded-full h-15 w-15 border-t-3 border-b-3 border-purple-500"></div>
    </div>
  );
};

export default Loader;