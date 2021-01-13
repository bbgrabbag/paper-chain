import React from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";

import { Dashboard } from "./Dashboard";
import { EventDetailView } from "./EventDetailView";
import { EventDetailEdit } from "./EventDetailEdit";

const App: React.FunctionComponent = (): React.ReactElement => {
  return (
    <div>
      <header>
        <Link to="/dashboard">Paper Chain</Link>
      </header>
      <section>
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
      </section>
    </div>
  );
};

export default App;
