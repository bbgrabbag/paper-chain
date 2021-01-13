import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { CustomRouteParams, PaperChainEvent } from "./entities";
import { EventDetailForm, EventDetailFormProps } from "./EventDetailForm";
import { EventsContext } from "./EventsProvider";
import { Loading } from "./lib";

export const EventDetailEdit: React.FC = () => {
  const eventAPI = React.useContext(EventsContext);
  const historyRouter = useHistory();
  const route = useRouteMatch<CustomRouteParams>();
  const event = eventAPI.getEventById(route.params.id);

  if (!event)
    return (
      <Loading>
        <p>There was a problem loading the event</p>
      </Loading>
    );

  const handleCancel = () => {
    historyRouter.goBack();
  };

  const handleSubmit: EventDetailFormProps["onSubmit"] = (e, updatedEvent) => {
    e.preventDefault();
    eventAPI.edit(route.params.id, updatedEvent);
    historyRouter.goBack();
  };

  return (
    <div>
      <EventDetailForm
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        event={event as PaperChainEvent}
      />
    </div>
  );
};
