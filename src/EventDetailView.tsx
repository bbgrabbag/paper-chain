import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { CustomRouteParams, PaperChainEventType } from "./entities";
import { EventsContext } from "./EventsProvider";
import { ButtonLink, Loading } from "./lib";
import { formatTimestamp, formatTimestampMetrics } from "./util";

export const EventDetailView: React.FC = () => {
  const route = useRouteMatch<CustomRouteParams>();
  const historyRouter = useHistory();
  const eventAPI = React.useContext(EventsContext);
  const event = eventAPI.getEventById(route.params.id);

  if (event == null)
    return (
      <Loading>
        <p>There was a problem loading the event</p>
      </Loading>
    );

  const handleDelete = () => {
    eventAPI.remove(event?.id as string);
    historyRouter.push("/dashboard");
  };

  const fragments = formatTimestampMetrics(
    formatTimestamp(
      event?.type as PaperChainEventType,
      event?.name as string,
      event?.timestamp as Date
    ),
    event?.type as PaperChainEventType,
    event?.name as string
  );

  return (
    <div>
      <header>
        {/* <button>Y</button>
        <button>M</button>
        <button>D</button> */}
        <ButtonLink to={`/event/${event?.id}/edit`}>Edit</ButtonLink>
      </header>
      <section>
        <h1>{fragments.metrics}</h1>
        <h5>{fragments.type}</h5>
        <h3>{fragments.eventName}</h3>
      </section>
      <footer>
        <button onClick={handleDelete}>X</button>
      </footer>
    </div>
  );
};
