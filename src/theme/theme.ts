import { Theme } from "theme-ui";
import base from "./json/base.json";
import dark from "./json/dark.json";
import polaris from "./json/polaris.json";
import { colorAPI } from "./theme-utils";

/******************************
 * Define available themes here*
 *****************************/

const themes = {
  base,
  polaris,
  dark,
};

/*****************************/

const buildVariants = (baseTheme: Theme): Theme => {
  const baseButtons = {
    color: "background",
    bg: "primary",
    "&:hover": {
      color: "background",
      backgroundColor: "accent",
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "accent",
    backgroundColor: "background",
    borderRadius: "50%",
    width: "2.8rem",
    height: "2.8rem",
    fontSize: "1.2rem",
  };

  const baseCards = {
    padding: 2,
    borderRadius: 4,
    boxShadow: "3px 4px 12px -9px rgba(0, 0, 0, 3.125)",
  };

  return {
    ...baseTheme,
    cards: {
      primary: {
        ...baseCards,
      },
      until: {
        ...baseCards,
        backgroundColor: "secondaryFade",
      },
      since: {
        ...baseCards,
        backgroundColor: "primaryFade",
      },
      elapsed: {
        ...baseCards,
        backgroundColor: "errorFade",
      },
    },
    forms: {
      radio: {
        "&:hover": { cursor: "pointer" },
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
        width: "2.5rem",
        height: "2.5rem",
        fontSize: ".9rem",
      },
      iconLg:{
        ...baseIconButtons,
        width:'3.5rem',
        height: '3.5rem',
        fontSize: '1.4rem'
        
      }
    },
  };
};

const buildStyles = (base: Theme["styles"]): Theme["styles"] => {
  return {
    ...base,
    root: {
      ...base?.root,
      height: "100vh",
    },
    a: {
      ...base?.a,
      textDecoration: "none",
    },
  };
};

const buildColors = (baseColors: Theme["colors"]): Theme["colors"] => {
  return {
    ...baseColors,
    primaryFade: colorAPI.hexTransform(colorAPI.lighten(0.9))(
      baseColors?.primary
    ) /*"#C9CDEB"*/,
    secondaryFade: colorAPI.hexTransform(colorAPI.lighten(0.9))(
      baseColors?.secondary
    ) /*"#AACFE8"*/,
    error: '#ff0000',
    errorFade: colorAPI.hexTransform(colorAPI.lighten(.9))('#ff0000'),
  } as Theme["colors"];
};

const buildTheme = <T>(theme: T): Theme => {
  const baseTheme = theme as Theme;
  return {
    ...baseTheme,
    ...buildVariants(baseTheme),
    colors: buildColors(baseTheme.colors),
    styles: buildStyles(baseTheme.styles),
    textStyles: baseTheme.textStyles,
  };
};

export type ThemeMap = {
  [K in keyof typeof themes]: () => Theme;
};

export const themeMap = (Object.keys(themes) as (keyof typeof themes)[]).reduce(
  (m, t) => {
    return { ...m, [t]: () => buildTheme(themes[t]) };
  },
  {} as ThemeMap
);
