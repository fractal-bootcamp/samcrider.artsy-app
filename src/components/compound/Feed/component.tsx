import Art from "@/components/base/Art/component";
import { ArtProps } from "@/components/base/Art/types";
import React, { useEffect, useState } from "react";

const Feed = () => {
  const [arts, setArts] = useState<ArtProps[]>([]);

  useEffect(() => {
    setArts([
      {
        creator: "username",
        creatorAvatar:
          "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
        description:
          "description descriptiondescriptiondescription iptiondescriptiondescriptio iptiondescriptiondescriptio",
        likes: 10203,
        liked: false,
      },
      {
        creator: "username",
        creatorAvatar:
          "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
        description:
          "description descriptiondescriptiondescription iptiondescriptiondescriptio iptiondescriptiondescriptio",
        likes: 10203,
        liked: false,
      },
    ]);
  }, []);

  return (
    <div className="carousel carousel-vertical rounded-box h-[50rem]">
      {arts.map((art) => (
        <div className="relative carousel-item h-full">
          <img src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg" />
          <Art art={art} />
        </div>
      ))}
    </div>
  );
};

export default Feed;
