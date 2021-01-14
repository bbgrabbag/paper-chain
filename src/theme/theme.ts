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
      '&:hover':{
        color: 'highlight',
        backgroundColor: 'muted',
        cursor: 'pointer'
      },
      ':disabled':{
        color: 'grey',
        backgroundColor: 'muted',
        cursor: 'not-allowed'
      }
      
}

const baseIconButtons = {
  ...baseButtons,
  borderRadius: '50%',
      width: '4rem',
      height: '4rem',
}

export const defaultVariants = {
  cards: {
    primary: {
      padding: 2,
      borderRadius: 4,
      boxShadow: "0 0 8px rgba(0, 0, 0, 0.125)",
    },
  },
  buttons: {
    primary: {
      ...baseButtons
    },
    icon:{
      ...baseButtons,
      borderRadius: '50%',
      width: '4rem',
      height: '4rem',
    },
    iconSm:{
      ...baseIconButtons,
      color: 'accent',
      backgroundColor: 'background',
      width:'3rem',
      height:'3rem'
    }
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
