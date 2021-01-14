import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { EventsProvider } from "./EventsProvider";
import { CustomThemeProvider } from "./theme/";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <CustomThemeProvider>
        <EventsProvider>
          <App />
        </EventsProvider>
      </CustomThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
