import React from 'react';

import { ThemeProvider as ThemeUIProvider, Theme } from 'theme-ui';

export interface ThemeProviderProps{
    theme: Theme;
}

export const ThemeProvider:React.FC<React.PropsWithChildren<ThemeProviderProps>> =  props => (
  <ThemeUIProvider theme={props.theme}>{props.children}</ThemeUIProvider>
)