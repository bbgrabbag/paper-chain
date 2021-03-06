import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Flex, Box } from "theme-ui";
import { Dashboard } from "./Dashboard";
import { EventDetailView } from "./EventDetailView";
import { EventDetailEdit } from "./EventDetailEdit";
import { Navbar } from "./Navbar";

const App: React.FunctionComponent = (): React.ReactElement => {
  return (
    <Flex
      id="app"
      sx={{
        flexDirection: "column",
        padding:'1rem',
      }}
    >
      <Box>
        <Navbar />
      </Box>
      <Box id="app-view">
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
