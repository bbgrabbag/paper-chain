import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ButtonLink } from "./lib/";
import { Flex, Box } from "theme-ui";
import { Dashboard } from "./Dashboard";
import { EventDetailView } from "./EventDetailView";
import { EventDetailEdit } from "./EventDetailEdit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScroll } from "@fortawesome/free-solid-svg-icons";

const App: React.FunctionComponent = (): React.ReactElement => {
  return (
    <Flex className="app" sx={{ flexDirection: "column", height: "100%" }}>
      <Box className="app-header" sx={{ flex: 0.1 }}>
        <ButtonLink variant="icon" to="/dashboard" sx={{ color: "primary" }}>
          <FontAwesomeIcon icon={faScroll} />
        </ButtonLink>
      </Box>
      <Box className="app-view" sx={{ flex: 0.9, overflow: "hidden" }}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/event/:id/view">
            <EventDetailView />
          </Route>
          <Route path="/event/:id/edit">
            <EventDetailEdit />
          </Route>
        </Switch>
      </Box>
    </Flex>
  );
};

export default App;
