export type ArtProps = {
  creator: string;
  creatorAvatar: string;
  description: string;
  likes: number;
  liked: boolean;
};

export type ArtObject = {
  art: ArtProps;
};
