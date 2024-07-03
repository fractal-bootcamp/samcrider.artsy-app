import React, { useEffect, useState } from "react";
import { ContentSelectorProps, Content } from "./types";
import { Choice, Mode } from "../CreateModal/types";

const ContentSelector = ({ setMode }: ContentSelectorProps) => {
  const [games, setGames] = useState<Content[]>([]);
  const [arts, setArts] = useState<Content[]>([]);

  useEffect(() => {
    setGames([
      {
        title: "Ping Pong",
      },
      {
        title: "Cup Pong",
      },
      {
        title: "Box Clicker",
      },
    ]);
    setArts([
      {
        title: "Gravity Shapes",
      },
      {
        title: "GeoTrees",
      },
    ]);
  }, []);

  const handleClick = (choice: string) => {
    setMode({
      selected: true,
      choice: choice as Choice,
    });
  };

  return (
    <div className="join join-vertical w-full">
      <div className="collapse collapse-plus join-item border-base-300 border">
        <input type="radio" name="content-accordion" />
        <div className="collapse-title text-xl text-left font-medium">
          Games
        </div>
        <div className="collapse-content">
          {games.map((game, i) => (
            <button
              key={i}
              className="btn m-2"
              onClick={() => handleClick(game.title)}
              disabled={i > 0}
            >
              {game.title}
            </button>
          ))}
        </div>
      </div>
      <div className="collapse collapse-plus join-item border-base-300 border">
        <input type="radio" name="content-accordion" />
        <div className="collapse-title text-xl text-left font-medium">Art</div>
        <div className="collapse-content">
          {arts.map((art, i) => (
            <button
              key={i}
              className="btn m-2"
              onClick={() => handleClick(art.title)}
            >
              {art.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentSelector;
