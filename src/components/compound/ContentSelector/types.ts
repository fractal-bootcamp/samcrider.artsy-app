import { Mode } from "../CreateModal/types";

export type Content = {
  title: string;
};

export type ContentSelectorProps = {
  setMode: (mode: Mode) => void;
};
