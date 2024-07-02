import React, { useEffect, useState } from "react";

type Content = {
  title: string;
};

const ContentSelector = () => {
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

  return (
    <div className="join join-vertical w-full">
      <div className="collapse collapse-plus join-item border-base-300 border">
        <input type="radio" name="content-accordion" />
        <div className="collapse-title text-xl text-left font-medium">
          Games
        </div>
        <div className="collapse-content">
          {games.map((game, i) => (
            <button key={i} className="btn m-2">
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
            <button key={i} className="btn m-2">
              {art.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentSelector;
