import React from "react";
import { ContentCreatorProps } from "./types";

const ContentCreator = ({ mode }: ContentCreatorProps) => {
  switch (mode.choice) {
    case "Ping Pong":
      return <div>Ping Pong</div>;
    case "Cup Pong":
      return <div>Cup Pong</div>;
    case "Box Clicker":
      return <div>Box Clicker</div>;
    case "GeoTrees":
      return <div>GeoTrees</div>;
    case "Gravity Shapes":
      return <div>Gravity Shapes</div>;
    default:
      return <div>None</div>;
  }
};

export default ContentCreator;
