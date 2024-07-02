import Navbar from "@/components/base/NavBar/component";
import CreateModal from "@/components/compound/CreateModal/component";
import Feed from "@/components/compound/Feed/component";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import React from "react";

const LandingPage = () => {
  const user = {
    username: "username",
  };
  return (
    <div className="flex flex-col h-full w-full p-6">
      <Navbar />
      <div className="flex flex-row h-full justify-around items-center">
        <Feed />
        <SignedIn>
          <div className="card bg-base-100 w-96 shadow-xl">
            <figure className="px-10 pt-10">
              <img src="favicon.ico" alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Hey, {user.username}</h2>
              <p>Want to join the fun?</p>
              <div className="card-actions">
                <CreateModal />
              </div>
            </div>
          </div>
        </SignedIn>
        <SignedOut>
          <div className="card bg-base-100 w-96 shadow-xl">
            <figure className="px-10 pt-10">
              <img src="favicon.ico" alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">You aren't signed in</h2>
              <p>Want to join the fun?</p>
              <div className="card-actions">
                <div className="btn btn-secondary">
                  <SignInButton />
                </div>
              </div>
            </div>
          </div>
        </SignedOut>
      </div>
    </div>
  );
};

export default LandingPage;
