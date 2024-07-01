import Search from "@/components/icons/Search";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import React from "react";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 p-2">
      <div className="navbar-start">
        <div className="dropdown">
          <SignedOut>
            <div className="btn btn-secondary">
              <SignInButton />
            </div>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">Artzy</a>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <Search />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
