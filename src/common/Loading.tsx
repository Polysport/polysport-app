import React from "react";

export const Loading: React.FC = () => (
  <div className="fixed top-0 right-0 h-full w-full z-50 flex justify-center items-center">
    <div className="loader rounded-full h-8 w-8 border-4 border-primary-300" />
  </div>
);
