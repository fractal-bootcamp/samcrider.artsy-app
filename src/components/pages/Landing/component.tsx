import Navbar from "@/components/base/NavBar/component";
import Feed from "@/components/compound/Feed/component";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import React from "react";

const LandingPage = () => {
  return (
    <div className="flex flex-col h-full w-full p-6">
      <Navbar />
      <div className="flex flex-row h-full justify-evenly items-center">
        <Feed />
        <SignedIn>
          <div>
            create your own art: a modal will pop up in the center of the screen
          </div>
        </SignedIn>
        <SignedOut>
          <div>sign in to create your own art</div>
        </SignedOut>
      </div>
    </div>
  );
};

export default LandingPage;
