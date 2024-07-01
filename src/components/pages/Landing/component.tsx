import Feed from "@/components/compound/Feed/component";
import React from "react";

const LandingPage = () => {
  return (
    <div className="h-full w-full flex flex-row justify-evenly items-center">
      <Feed />
      <div>
        create your own art: a modal will pop up in the center of the screen
      </div>
    </div>
  );
};

export default LandingPage;
