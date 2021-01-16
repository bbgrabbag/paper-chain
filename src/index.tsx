import React from "react";
import ReactDOM from "react-dom";
import "./global.css";
import { BrowserRouter } from "react-router-dom";
import { EventsProvider } from "./EventsProvider";
import { CustomThemeProvider } from "./theme/";
import { ConfigProvider, TimeFormatOptions } from "./ConfigProvider";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <CustomThemeProvider defaultTheme='polaris'>
        <EventsProvider>
          <ConfigProvider defaultTimeFormat={TimeFormatOptions.DayView}>
            <App />
          </ConfigProvider>
        </EventsProvider>
      </CustomThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
