import React, { SetStateAction } from "react";
import { Theme } from "theme-ui";
import { themeMap, ThemeMap } from "./theme";
import { ThemeProvider } from "../lib/";

export interface ThemeAPI {
  theme: Theme;
  themeName: keyof typeof themeMap;
  setTheme: React.Dispatch<SetStateAction<keyof typeof themeMap>>;
}

export const ThemeContext = React.createContext<ThemeAPI>({} as ThemeAPI);

const useTheme = (
  themeMap: ThemeMap,
  initialTheme: keyof ThemeMap
): ThemeAPI => {
  const [themeName, setTheme] = React.useState<keyof ThemeMap>(initialTheme);
  
  return {
    theme: themeMap[themeName](),
    themeName,
    setTheme,
  };
};

export const CustomThemeProvider: React.FC<
  React.PropsWithChildren<{ defaultTheme: keyof typeof themeMap}>
> = (props) => {
  const themeAPI = useTheme(themeMap, props.defaultTheme);

  return (
    <ThemeContext.Provider value={themeAPI}>
      <ThemeProvider theme={themeAPI.theme}>{props.children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
