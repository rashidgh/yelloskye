import React from "react";
import { ClipLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="h-[15px]w-[15px]">
      <ClipLoader
      
        color="blue"
        loading={true}
        size={80}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Spinner;
