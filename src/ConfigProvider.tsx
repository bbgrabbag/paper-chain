import React from "react";
import { PaperChainTimeFormatKey } from "./config";

export enum TimeFormatOptions {
  DayView = "DAY_VIEW",
  TimeView = "TIME_VIEW",
}

export interface ConfigAPI {
  timeFormat: TimeFormatOptions;
  toggleTimeFormat: () => void;
}

export const ConfigContext = React.createContext({} as ConfigAPI);

export interface ConfigProviderProps {
  defaultTimeFormat: TimeFormatOptions;
}

export const useConfig = (defaultTimeFormat: TimeFormatOptions): ConfigAPI => {
  const storedFormatSetting = localStorage.getItem(
    PaperChainTimeFormatKey
  ) as TimeFormatOptions | null;
  const [timeFormat, setTimeFormat] = React.useState(
    storedFormatSetting || defaultTimeFormat
  );

  const toggleTimeFormat = () =>
    setTimeFormat(
      timeFormat === TimeFormatOptions.DayView
        ? TimeFormatOptions.TimeView
        : TimeFormatOptions.DayView
    );

  return {
    timeFormat,
    toggleTimeFormat,
  };
};

export const useConfigEffects = (configAPI: ConfigAPI): ConfigAPI => {
  React.useEffect(() => {
    localStorage.setItem(PaperChainTimeFormatKey, configAPI.timeFormat);
  }, [configAPI.timeFormat]);

  return configAPI;
};

export const ConfigProvider: React.FC<
  React.PropsWithChildren<ConfigProviderProps>
> = (props) => {
  const configAPI = useConfigEffects(useConfig(props.defaultTimeFormat));
  const value = React.useMemo(() => configAPI, [configAPI.timeFormat]);

  return (
    <ConfigContext.Provider value={value}>
      {props.children}
    </ConfigContext.Provider>
  );
};
