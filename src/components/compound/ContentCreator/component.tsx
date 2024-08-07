import React from "react";
import { ContentCreatorProps } from "./types";
import PingPong from "@/components/content/games/PingPong/component";
import GravityShapes from "@/components/content/art/GravityShapes/component";
import GeoTree from "@/components/content/art/GeoTree/component";

const ContentCreator = ({ mode }: ContentCreatorProps) => {
  switch (mode.choice) {
    case "Ping Pong":
      return (
        <div className="h-full w-full">
          <PingPong />
        </div>
      );
    case "Cup Pong":
      return <div>Cup Pong</div>;
    case "Box Clicker":
      return <div>Box Clicker</div>;
    case "GeoTrees":
      return (
        <div className="h-full w-full">
          <GeoTree />
        </div>
      );
    case "Gravity Shapes":
      return (
        <div className="h-full w-full">
          <GravityShapes />
        </div>
      );
    default:
      return <div>None</div>;
  }
};

export default ContentCreator;
