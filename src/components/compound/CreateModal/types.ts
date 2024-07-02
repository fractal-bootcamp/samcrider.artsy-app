export type Choice =
  | "Ping Pong"
  | "Cup Pong"
  | "Box Clicker"
  | "GeoTrees"
  | "Gravity Shapes"
  | "none";

export type Mode = {
  selected: boolean;
  choice: Choice;
};
