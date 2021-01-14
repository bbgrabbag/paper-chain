import { Theme } from "theme-ui";
import polaris from "./json/polaris.json";
import base from "./json/base.json";

export interface ThemeMap {
  default: Theme;
  polaris: Theme;
}

const baseButtons = {
  color: "background",
  bg: "primary",
  "&:hover": {
    color: "highlight",
    backgroundColor: "muted",
    cursor: "pointer",
  },
  ":disabled": {
    color: "grey",
    backgroundColor: "muted",
    cursor: "not-allowed",
  },
};

const baseIconButtons = {
  ...baseButtons,
  color: "accent",
  backgroundColor: "background",
  borderRadius: "50%",
  width: "4rem",
  height: "4rem",
  fontSize: "1.2rem",
};

const baseCards = {
  padding: 2,
  borderRadius: 4,
  boxShadow: "3px 4px 12px -9px rgba(0, 0, 0, 3.125)",
};

export const defaultVariants = {
  cards: {
    primary: {
      ...baseCards
    },
    until: {
      ...baseCards,
      backgroundColor: 'secondaryFade',
    },
    since: {
      ...baseCards,
      backgroundColor: 'primaryFade',
    },
  },
  buttons: {
    primary: {
      ...baseButtons,
    },
    icon: {
      ...baseIconButtons,
    },
    iconSm: {
      ...baseIconButtons,
      width: "3rem",
      height: "3rem",
      fontSize: ".8rem",
    },
  },
  links: {
    bold: {
      fontWeight: "bold",
    },
    nav: {
      fontWeight: "bold",
      color: "inherit",
      textDecoration: "none",
    },
  },
};

export const themeMap: ThemeMap = {
  default: { ...base, ...defaultVariants } as Theme,
  polaris: { ...polaris, ...defaultVariants } as Theme,
};
