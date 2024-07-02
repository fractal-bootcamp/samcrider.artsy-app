import Heart from "@/components/icons/Heart";
import React from "react";
import { ArtObject } from "./types";

const Art = ({ art }: ArtObject) => {
  return (
    <div className="absolute bg-gray-300 h-full w-full flex flex-col justify-end">
      <div className="h-full w-full carousel bg-slate-500">
        <img src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg" />
      </div>
      <div style={{ position: "absolute" }}>
        <div className=" z-10 flex flex-col justify-end gap-6 p-4 h-[50%]">
          <div className="flex flex-col w-fit items-center gap-4">
            <div className="avatar">
              <div className="mask mask-squircle w-20">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <div className="flex flex-col items-center hover:cursor-pointer">
              {art.liked ? <Heart color="red" /> : <Heart color="black" />}
              <div>{art.likes}</div>
            </div>
          </div>
          <div className="flex flex-col max-w-[50%]">
            <div className="font-bold text-xl">{art.creator}</div>
            <div className="text-lg">{art.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Art;
